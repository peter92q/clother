using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
[Authorize]
public class OrderController : Controller
{
    private readonly MyDbContext _context;
    private readonly UserManager<User> _userManager;

    public OrderController(MyDbContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }
    private async Task<Basket> RetrieveBasket(string buyerId)
    {
    if (string.IsNullOrEmpty(buyerId))
    {
        Response.Cookies.Delete("buyerId");
        return null;
    }

    return await _context.Baskets
        .Include(i => i.Items)
        .ThenInclude(p => p.Product)
        .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
    }

    private string GetBuyerId()
    {
        return User.Identity?.Name ?? Request.Cookies["buyerId"];
    }


    [HttpPost]
    public async Task<IActionResult> SubmitOrder([FromBody] SubmitOrderRequest request)
    {
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    var user = await _userManager.FindByNameAsync(User.Identity.Name);

    var basket = await RetrieveBasket(GetBuyerId());

    if (basket == null || basket.Items.Count == 0)
    {
        return BadRequest("Your basket is empty.");
    }

    var address = new Address
    {
        FullName = request.FullName,
        Address1 = request.Address1,
        Address2 = request.Address2,
        City = request.City,
        Country = request.Country,
        Zip = request.Zip
    };

    _context.Addresses.Add(address);

    var order = new Order
    {
        User = user,
        Address = address,
        CreatedAt = DateTime.UtcNow,
        UserName = user.UserName,
        Items = basket.Items.Select(item => new OrderItem
        {
            ProductId = item.ProductId,
            Name = item.Product.Name,
            Mainpic = item.Product.Mainpic,
            Quantity = item.Quantity,
            Size = item.Size,
            Price = item.Product.Price
        }).ToList()
    };
    
    order.Items.ForEach(item => item.Order = order);

    _context.Orders.Add(order);

    basket.Items.Clear();
    _context.Baskets.Update(basket);

    await _context.SaveChangesAsync();

    var orderDetails = new OrderDetailsDto
    {
        OrderId = order.Id,
        CreatedAt = order.CreatedAt.ToString("MMMM dd, yyyy h:mm tt"),
        Username = user.UserName,
        FullName = user.Email,
        Address = address,
        Items = order.Items.Select(item => new OrderItemDto
        {
            ProductId = item.ProductId,
            ProductName = item.Name,
            Price = item.Price,
            Quantity = item.Quantity,
            Size = item.Size
        }).ToList(),
        TotalAmount = order.TotalAmount
    };

    return Ok(orderDetails);
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetOrdersByUserId(string userId)
    {
    if (string.IsNullOrEmpty(userId))
    {
        return BadRequest("User ID is required.");
    }

    var ordersByUser = await _context.Orders
        .Include(o => o.Items)
        .Include(o => o.Address)
        .Where(o => o.UserId == userId)
        .OrderByDescending(o => o.CreatedAt)
        .Select(o => new
        {
            o.Id,
            CreatedAt = o.CreatedAt.ToString("MMMM dd, yyyy h:mm tt"),
            o.Address,
            Items = o.Items.Select(oi => new
            {
                oi.Id,
                oi.Name,
                oi.Mainpic,
                oi.Quantity,
                oi.Size,
                oi.Price
            }).ToList(),
            o.TotalAmount,
        })
        .ToListAsync();

    if (ordersByUser.Count == 0)
    {
        return NotFound($"No orders found for user with ID {userId}.");
    }

    return Ok(ordersByUser);
    }
}