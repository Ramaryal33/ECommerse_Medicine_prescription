// Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using ECommerse_Medicine.Model;
using ECommerce_Medicine.AuthServices;
using Microsoft.AspNetCore.Authorization;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }
   
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto registerDto)
    {
        return await _authService.Register(registerDto);
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        return await _authService.Login(loginDto);
    }
}
