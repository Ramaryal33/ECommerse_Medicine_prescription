using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce_Medicine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]  // Only Admins can access this controller
    public class AdminDashboardController : ControllerBase
    {
        // Endpoint to get admin-specific data
        [HttpGet]
        public IActionResult GetAdminData()
        {
            return Ok(new { Message = "Welcome Admin!", Data = "Admin data goes here..." });
        }
    }
}
