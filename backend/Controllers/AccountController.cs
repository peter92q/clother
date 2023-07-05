using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

    [ApiController]
    [Route("api/[controller]")]

    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly TokenService _tokenService;
        private readonly MyDbContext _context;
        public AccountController(UserManager<User> userManager, TokenService tokenService, MyDbContext context)
        {
            _context = context;
            
            _userManager = userManager;

            _tokenService = tokenService;

        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if(string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            return await _context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }


    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
    var user = await _userManager.FindByNameAsync(loginDto.Username);
    if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
        return Unauthorized();

    // check if there's a user or anonymous basket
    var userBasket = await RetrieveBasket(loginDto.Username);
    var anonymousBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

    if (anonymousBasket != null && userBasket != null)
    {
        // append anonymous basket items to user basket
        foreach (var item in anonymousBasket.Items)
        {
            // check if product already exists in user basket
            var existingItem = userBasket.Items.FirstOrDefault(x => x.ProductId == item.ProductId && x.Size == item.Size);
            if (existingItem != null)
            {
                // if product already exists, increment the quantity
                existingItem.Quantity += item.Quantity;
            }
            else
            {
                // if product does not exist, add it to user basket
                userBasket.Items.Add(new BasketItem
                {
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Size = item.Size
                });
            }
        }
        _context.Baskets.Remove(anonymousBasket);
        await _context.SaveChangesAsync();
        }
        else if (anonymousBasket != null)
        {
        // assign anonymous basket to user
        anonymousBasket.BuyerId = user.UserName;
        Response.Cookies.Delete("buyerId");
        }

        return new UserDto
        {
            Id = user.Id,
            Email = user.Email,
            Token = await _tokenService.GenerateToken(user),
            Basket = userBasket?.MapBasketToDto() ?? anonymousBasket?.MapBasketToDto()
        };
    }


    [HttpPost("register")]
    public async Task<ActionResult> Register(RegisterDto registerDto)
    {
        var user = new User { UserName = registerDto.Username, Email = registerDto.Email };
        var result = await _userManager.CreateAsync(user, registerDto.Password);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Code, error.Description);
            }

            return ValidationProblem();
        }

        // Create a new empty basket for the user
        var basket = new Basket { BuyerId = user.UserName };
        _context.Baskets.Add(basket);
        await _context.SaveChangesAsync();

        await _userManager.AddToRoleAsync(user, "Member");

        return StatusCode(201);
    }

        [Authorize]
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);

            var userBasket = await RetrieveBasket(User.Identity.Name);

            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Token = await _tokenService.GenerateToken(user),
                Basket = userBasket?.MapBasketToDto()
            };
        }
    }
