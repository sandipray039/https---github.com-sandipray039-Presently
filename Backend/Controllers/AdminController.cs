using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistryApi.Db;
using RegistryApi.Dtos;

namespace RegistryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly RegistryDbContext db;

        public AdminController(RegistryDbContext db)
        {
            this.db = db;
        }
        [HttpGet("get-all-employees")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetAllEmployees()
        {
            try
            {
                var employees = await db.ApplicationUsers
                    .Where(u => u.Role == "Employee")
                    .Include(u => u.Location)
                    .Select(u => new
                    {
                        u.Id,
                        u.Name,
                        u.Email,
                        LocationName = u.Location != null ? u.Location.Name : null
                    }).ToListAsync();
                return Ok(employees);

            }
            catch (Exception ex) {
                return StatusCode(500, new { message = "Error fetching employees", error = ex.Message });
            }
        }
        [HttpDelete("remove-employee")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult>DeleteEmployee(int id)
        {
            try
            {
                var user= await db.ApplicationUsers.FindAsync(id);
                if (user == null)
                {
                    return NotFound(new {message="Employee not found"});
                }
                db.ApplicationUsers.Remove(user);
                await db.SaveChangesAsync();

                return Ok(new { message = "Employee removed succesfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting employee", error = ex.Message });
            }
        }
        [HttpPut("update-employee")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> UpdateEmployee([FromBody]UpdateEmployeeDto data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid model data passed" });
            }
            var employee = await db.ApplicationUsers.FindAsync(data.Id);
            if (employee == null)
            {
                return NotFound("Employee not found");
            }

            if (employee.Role == "Admin")
            {
                return BadRequest("only emplyees can be updated");
            }
            var existingEmailUser = await db.ApplicationUsers.FirstOrDefaultAsync(u => u.Email == data.Email && u.Id != data.Id);
            if (existingEmailUser != null)
            {
                return BadRequest("Email is already used for another employee");

            }
            employee.Name = data.Name;
            employee.Email = data.Email;
            employee.LocationId = data.LocationId;
            employee.CreatedAt = DateTime.UtcNow;

            await db.SaveChangesAsync();
            return Ok("Employee updated successfully..");

        }

        [HttpGet("get-employee-by-id/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee = await db.ApplicationUsers
                .Include(e => e.Location)
                .FirstOrDefaultAsync(e => e.Id == id && e.Role == "Employee");

            if (employee == null)
                return NotFound("Employee not found");

            var result = new
            {
                employee.Id,
                employee.Name,
                employee.Email,
                employee.LocationId,
                LocationName = employee.Location?.Name
            };

            return Ok(result);
        }


    }
}
