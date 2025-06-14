using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce_Medicine.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "User,Admin")]  // Both Admin and User can access this controller
    public class UserDashboardController : ControllerBase
    {
        // Endpoint to get user-specific data
        [HttpGet]
        public IActionResult GetUserData()
        {
            return Ok(new { Message = "Welcome User or Admin!", Data = "User data goes here..." });
        }
    }
}
