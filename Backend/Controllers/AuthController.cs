using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistryApi.Models;
using RegistryApi.Services;
using System.Linq;
using System.Security.Claims;
using BCrypt.Net;
using RegistryApi.Db;

namespace RegistryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly RegistryDbContext _context;
        private readonly JwtService _jwtService;

        public AuthController(RegistryDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        [Authorize(Roles = "Admin")] // ✅ Only Admin can register employees
        public async Task<IActionResult> Register([FromBody] Register model)
        {
            
            var existingUser = await _context.ApplicationUsers.FirstOrDefaultAsync(u => u.Email == model.Email);
            if (existingUser != null)
                return BadRequest("User already exists.");

            
            var locationExists = await _context.Locations.AnyAsync(l => l.Id == model.LocationId);
            if (!locationExists)
                return BadRequest("Invalid Location ID. Please assign an existing location.");

            
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(model.Password);

            
            var newUser = new ApplicationUser
            {
                Name = model.Name,
                Email = model.Email,
                Password = hashedPassword,
                LocationId = model.LocationId,
                Role = "Employee",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.ApplicationUsers.Add(newUser);
            await _context.SaveChangesAsync(); // 🔹 Async database operation

            return Ok("Employee registered successfully.");
        }


        // ✅ Employee Login with Auto Location Capture
        [HttpPost("login")]
        public IActionResult Login([FromBody] Login model)
        {
            var user = _context.ApplicationUsers.FirstOrDefault(u => u.Email == model.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.Password))
                return Unauthorized("Invalid email or password.");

            var token = _jwtService.GenerateToken(user);

            return Ok(new
            {
                message = "Login successful",
                token,
                user = new
                {
                    user.Id,
                    user.Name,
                    user.Role,
                    user.LocationId
                }
            });
        }
    }
}
