using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RegistryApi.Db;
using RegistryApi.Dtos;
using RegistryApi.Models;

namespace RegistryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly RegistryDbContext db;

        public LocationController(RegistryDbContext db)
        {
            this.db = db;
        }
        [HttpGet("get-locations")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> GetLocations()
        {
            try
            {
                var locations = await db.Locations.ToListAsync();
                return Ok(locations);

            }
            catch(Exception ex)
            {
                return StatusCode(500, new { message = "An error occured while fetching locations", error = ex.Message });
            }
        }
        [HttpPost("add-location")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> AddLocation(LocationDto data)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var location = new Location
                {
                    Id = Guid.NewGuid().ToString(),
                    Name = data.Name,
                    Latitude = data.Latitude,
                    Longitude = data.Longitude,
                    GeofenceRadius = data.GeofenceRadius,

                };

                db.Locations.Add(location);
              await  db.SaveChangesAsync();

                return Ok(new { message = "location added succesfully", location });
            }
            catch(Exception err)
            {
                return StatusCode(500, new { message = "an errorr occured", err.Message });
            }
        }

        
    }
}
