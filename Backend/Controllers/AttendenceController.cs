using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistryApi.Db;
using RegistryApi.Models;
using System.Security.Claims;
using System.Globalization;
using RegistryApi.Dtos;

namespace RegistryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly RegistryDbContext _context;

        public AttendanceController(RegistryDbContext context)
        {
            _context = context;
        }

        // ✅ Employee Check-in (Location-based)
        [HttpPost("checkin")]
        [Authorize(Roles = "Employee")]
        public async Task<IActionResult> CheckIn([FromBody] Checkin request)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var user = await _context.ApplicationUsers
                .Include(u => u.Location)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user?.Location == null)
                return BadRequest("Assigned location not found.");

            double officeLat = user.Location.Latitude;
            double officeLng = user.Location.Longitude;

            // 🔹 Check if the employee is within 500m of their assigned location
            if (!IsWithinRadius(officeLat, officeLng, request.Latitude, request.Longitude, 500))
                return BadRequest("You are too far from your assigned location to check in.");
            var indiaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            var indiaTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, indiaTimeZone);

            var today = indiaTime.Date;

            // 🔹 Prevent multiple check-ins on the same day
            var existingAttendance = await _context.Attendances
                .FirstOrDefaultAsync(a => a.UserId == userId && a.Date.Date == today);

            if (existingAttendance != null)
                return BadRequest("You have already checked in today.");

            //var indiaTimeZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");
            //var indiaTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, indiaTimeZone);

            var attendance = new Attendence
            {
                UserId = userId,
                LocationId = user.LocationId,
                CheckInTime = indiaTime,
                Date = indiaTime.Date
            };

            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();

            return Ok("Check-in successful.");
        }

        // ✅ Employee Check-out
        [HttpPost("checkout")]
        [Authorize(Roles = "Employee")]
        public async Task<IActionResult> CheckOut()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var indiaTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,
                            TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

            var today = indiaTime.Date;

            var attendance = await _context.Attendances
                .FirstOrDefaultAsync(a => a.UserId == userId && a.Date.Date == today);

            if (attendance == null)
                return BadRequest("No check-in record found for today.");

            if (attendance.CheckOutTime != null)
                return BadRequest("You have already checked out.");

            attendance.CheckOutTime = indiaTime;
            attendance.TotalHours = (attendance.CheckOutTime - attendance.CheckInTime)?.TotalHours ?? 0;

            await _context.SaveChangesAsync();
            return Ok("Check-out successful.");
        }


        // ✅ Start Break
        [HttpPost("break/start")]
        [Authorize(Roles = "Employee")]
        public async Task<IActionResult> StartBreak()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var indiaTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,
                            TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

            var today = indiaTime.Date;

            var attendance = await _context.Attendances
                .FirstOrDefaultAsync(a => a.UserId == userId && a.Date.Date == today);

            if (attendance == null)
                return BadRequest("No check-in record found for today.");

            if (attendance.CheckOutTime != null)
                return BadRequest("You are already checked out. Break not allowed.");

            if (attendance.BreakStart != null)
                return BadRequest("Break already started.");

            attendance.BreakStart = indiaTime;
            await _context.SaveChangesAsync();

            return Ok("Break started.");
        }



        // ✅ End Break
        [HttpPost("break/end")]
        [Authorize(Roles = "Employee")]
        public async Task<IActionResult> EndBreak()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

            var indiaTime = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow,
                            TimeZoneInfo.FindSystemTimeZoneById("India Standard Time"));

            var today = indiaTime.Date;

            var attendance = await _context.Attendances
                .FirstOrDefaultAsync(a => a.UserId == userId && a.Date.Date == today);

            if (attendance == null)
                return BadRequest("No check-in record found for today.");

            if (attendance.CheckOutTime != null)
                return BadRequest("You are already checked out. Break end not allowed.");

            if (attendance.BreakStart == null || attendance.BreakEnd != null)
                return BadRequest("Invalid break end request.");

            attendance.BreakEnd = indiaTime;
            await _context.SaveChangesAsync();

            return Ok("Break ended.");
        }





        private bool IsWithinRadius(double officeLat, double officeLng, double userLat, double userLng, double radiusMeters)
        {
            const double EarthRadius = 6371000; // in meters

            double dLat = (userLat - officeLat) * Math.PI / 180.0;
            double dLon = (userLng - officeLng) * Math.PI / 180.0;

            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                       Math.Cos(officeLat * Math.PI / 180.0) * Math.Cos(userLat * Math.PI / 180.0) *
                       Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
            double distance = EarthRadius * c;

            return distance <= radiusMeters;
        }
    }

    // ✅ Model for capturing user location during check-in
    public class LocationRequest
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
