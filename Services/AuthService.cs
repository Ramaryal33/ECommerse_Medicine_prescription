using ECommerce_Medicine.Data;
using ECommerce_Medicine.Entities;
using ECommerse_Medicine.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public interface IAuthService
{
    Task<IActionResult> Register(RegisterDto registerDto);
    Task<IActionResult> Login(LoginDto loginDto);
}



namespace ECommerce_Medicine.AuthServices
{
    public class AuthService : IAuthService
    {
        private readonly ECommerceDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AuthService(ECommerceDbContext context, IConfiguration configuration, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _configuration = configuration;
            _passwordHasher = passwordHasher;
        }

        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
                return new BadRequestObjectResult("Email already exists.");

            var user = new User
            {
                Email = registerDto.Email,
                UserName = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                Role = registerDto.Email == "admin@gmail.com" ? "Admin" : "User",
                Type = registerDto.Email == "admin@gmail.com" ? "Admin" : "User",
                Phone = 0,
                DOB = DateTime.MinValue,
                Address = null,
                Fund = 0,
                Status = "Active"
            };

            user.PasswordHash = _passwordHasher.HashPassword(user, registerDto.Password);

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return new OkObjectResult(new { user.Id, user.Email, user.FirstName, user.Role, user.Type });
        }

        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginDto.Email);
            if (user == null)
                return new BadRequestObjectResult("User not found.");

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, loginDto.Password);
            if (result == PasswordVerificationResult.Failed)
                return new BadRequestObjectResult("Wrong password.");

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, loginDto.Email),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new OkObjectResult(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
        }
    }
}