using Microsoft.AspNetCore.Mvc;

namespace MyApplication.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult CheckHealth()
        {
            return Ok("Application is healthy");
        }
    }
}