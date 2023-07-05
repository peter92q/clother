using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.DTOs;
using API.Extensions;

namespace API.Controllers;

    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly MyDbContext _context;
        public BasketController(MyDbContext context)
        {
            _context = context;
        }
        //----------------------REUSABLE METHODS-----------------------//
        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            //if no cart items(buyerId)
            if(string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }

            //if there's a buyerId(or username(can server as buyerid))
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        private string GetBuyerId()
        {
            //we retrieve either the anonymous buyerId or the logged in buyerId(username(User.Identity.Name))
            return User.Identity?.Name ?? Request.Cookies["buyerId"];
        }
        
        private Basket CreateBasket()
        {   
            //if user is logged in, associate the anonymous basket with his account
            //otherwise create a new anonymous basket 
            var buyerId = User.Identity?.Name;
            if(string.IsNullOrEmpty(buyerId))
            {
                buyerId = Guid.NewGuid().ToString();
                var cookieOptions = new CookieOptions{IsEssential = true, Expires = DateTime.Now.AddDays(30)};
                Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            }
            var basket = new Basket{BuyerId = buyerId};
            _context.Baskets.Add(basket);
            return basket;
        }


        //-----------------END OF REUSABLE METHODS---------------------//

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket(GetBuyerId());

            if (basket == null) return NotFound();

            return basket.MapBasketToDto();
        }

        [HttpPost]
        public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity, string size)
        {
        var basket = await RetrieveBasket(GetBuyerId());

        if (basket == null) basket = CreateBasket();

        var product = await _context.Products.FindAsync(productId);

        if(product==null) return BadRequest(new ProblemDetails{Title = "Product Not Found"});

        //an instance of an existing basket item is defined not only by id but by size as well
        //if we have an item of id 1 and size L and attempt to add a second item of id 1 and size L
        //we update the quantity, otherwise we add a whole new item to the basket
        var existingBasketItem = basket.Items.FirstOrDefault(i => i.ProductId == productId && i.Size == size);

        if (existingBasketItem == null)
        {
            // If the item does not exist in the basket, add it
            basket.AddItem(product, quantity, size);
        }
        else
        {
            // If the item exists in the basket, update its quantity
            existingBasketItem.Quantity += quantity;
        }

        await _context.SaveChangesAsync();

        return CreatedAtRoute("GetBasket", basket.MapBasketToDto());
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity, string size)
        {
        var basket = await RetrieveBasket(GetBuyerId());

        if(basket == null) return NotFound();

        basket.RemoveItem(productId, quantity, size);

        var result = await _context.SaveChangesAsync()>0;

        if(result) return Ok();

        return BadRequest(new ProblemDetails{Title = "Problem removing item from the basket"});
        }
    }

