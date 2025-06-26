using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistryApi.Db;
using RegistryApi.Models;
using RegistryApi.Dtos;
using System.Security.Claims;

namespace RegistryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly RegistryDbContext _context;

        public ReportController(RegistryDbContext context)
        {
            _context = context;
        }

        // ✅ Helper: Map entity to DTO
        private static AttendanceDto ToDto(Attendence a)
        {
            return new AttendanceDto
            {
                Id = a.Id,
                Date = a.Date,
                CheckInTime = a.CheckInTime,
                CheckOutTime = a.CheckOutTime,
                TotalHours = a.TotalHours,
                BreakStart = a.BreakStart,
                BreakEnd = a.BreakEnd,
                LocationId = a.LocationId,
                LocationName = a.Location?.Name,
                UserId = a.UserId,
                UserName = a.ApplicationUser?.Name
            };
        }

        [HttpGet("my/all")]
        [Authorize(Roles = "Employee")]
        public async Task<IActionResult> GetAllMyAttendance()
        {
            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

                var attendances = await _context.Attendances
                    .Where(a => a.UserId == userId)
                    .Include(a => a.Location)
                    .OrderByDescending(a => a.Date)
                    .ToListAsync();

                var result = attendances.Select(a => ToDto(a));

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An error occurred while fetching attendance.", error = ex.Message });
            }
        }

        // ✅ Get own attendance for a specific day
        [HttpGet("my/day")]
        [Authorize(Roles = "Employee")]
        public async Task<IActionResult> GetMyAttendanceByDay([FromQuery] string date)
        {
            if (!DateTime.TryParse(date, out var parsedDate))
                return BadRequest("Invalid date format. Use yyyy-MM-dd.");

            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var attendance = await _context.Attendances
                .Include(a => a.Location)
                .FirstOrDefaultAsync(a => a.UserId == userId && a.Date.Date == parsedDate.Date);

            return attendance != null ? Ok(ToDto(attendance)) : NotFound("No record found for that day.");
        }

        // ✅ Get own attendance for a specific month
        [HttpGet("my/month")]
        [Authorize(Roles = "Employee")]
        public async Task<IActionResult> GetMyAttendanceByMonth([FromQuery] int? year, [FromQuery] int? month)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var today = DateTime.UtcNow;

            int y = year ?? today.Year;
            int m = month ?? today.Month;

            var records = await _context.Attendances
                .Include(a => a.Location)
                .Where(a => a.UserId == userId && a.Date.Year == y && a.Date.Month == m)
                .ToListAsync();

            return Ok(records.Select(ToDto));
        }

        [HttpGet("get-attendance-of-today")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllAttendanceOfToday()
        {
           
            var indiaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            var indiaNow = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, indiaTimeZone);
            var today = indiaNow.Date;

            var records = await _context.Attendances
                .Include(a => a.ApplicationUser)
                .Include(a => a.Location)
                .Where(a => a.Date.Date == today)
                .ToListAsync();

            return Ok(records.Select(ToDto));
        }


       
        [HttpGet("admin/day")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllAttendanceByDay([FromQuery] string date)
        {
            if (!DateTime.TryParse(date, out var parsedDate))
                return BadRequest("Invalid date format. Use yyyy-MM-dd.");

            var records = await _context.Attendances
                .Include(a => a.ApplicationUser)
                .Include(a => a.Location)
                .Where(a => a.Date.Date == parsedDate.Date)
                .ToListAsync();

            return Ok(records.Select(ToDto));
        }

        // ✅ Admin: Get attendance of all users for a specific month
        [HttpGet("admin/month")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllAttendanceByMonth([FromQuery] int? year, [FromQuery] int? month)
        {
            var today = DateTime.UtcNow;
            int y = year ?? today.Year;
            int m = month ?? today.Month;

            var records = await _context.Attendances
                .Include(a => a.ApplicationUser)
                .Include(a => a.Location)
                .Where(a => a.Date.Year == y && a.Date.Month == m)
                .ToListAsync();

            return Ok(records.Select(ToDto));
        }

        // ✅ Admin: Get report for a user by date range
        [HttpGet("admin/user-report")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserReport([FromQuery] int userId, [FromQuery] string start, [FromQuery] string end)
        {
            if (!DateTime.TryParse(start, out var startDate) || !DateTime.TryParse(end, out var endDate))
                return BadRequest("Invalid date format. Use yyyy-MM-dd for both start and end.");

            var records = await _context.Attendances
                .Include(a => a.ApplicationUser)
                .Include(a => a.Location)
                .Where(a => a.UserId == userId && a.Date.Date >= startDate.Date && a.Date.Date <= endDate.Date)
                .ToListAsync();

            return Ok(records.Select(ToDto));
        }
    }
}
