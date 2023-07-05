using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly MyDbContext _context;
    public ProductsController(MyDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts(
        [FromQuery] int skip = 0,
        [FromQuery] int take = 8,
        [FromQuery] string orderBy = "",
        [FromQuery] string searchTerm = "",
        [FromQuery] string brands = "",
        [FromQuery] string types = "")
    {
        var query = _context.Products.Include(p => p.Sizes).AsQueryable();

        // Search
        if (!string.IsNullOrEmpty(searchTerm))
        {
            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();
            query = query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }

        // Filter
        var brandList = new List<string>();
        var typeList = new List<string>();
        if (!string.IsNullOrEmpty(brands))
            brandList.AddRange(brands.ToLower().Split(",").ToList());
        if (!string.IsNullOrEmpty(types))
            typeList.AddRange(types.ToLower().Split(",").ToList());
        query = query.Where(p => brandList.Count == 0 || brandList.Contains(p.Brand.ToLower()));
        query = query.Where(p => typeList.Count == 0 || typeList.Contains(p.Type.ToLower()));
        var filteredTotalCount = await query.CountAsync();

        // Sort
        query = orderBy switch
        {
            "price" => query.OrderBy(p => p.Price),
            "priceDesc" => query.OrderByDescending(p => p.Price),
            _ => query.OrderBy(p => p.Name)
        };

        // Pagination
        var products = await query
            .Skip(skip)
            .Take(take)
            .ToListAsync();

       //metaData
       var availableBrands = _context.Products.Select(p => p.Brand).Distinct().ToList();
       var availableTypes = _context.Products.Select(p => p.Type).Distinct().ToList();
       var totalProducts = _context.Products.Count();

        var result = new {
            products = products,
            totalCount = totalProducts,
            filteredTotalCount = filteredTotalCount,
            types = availableTypes,
            brands = availableBrands
        };
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(int id)
    {
        var product = 
            await _context.Products
                .Include(p => p.Sizes)
                .Include(p=> p.Pictures)
                .FirstOrDefaultAsync(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }
        return product;
    }


}
