using System.ComponentModel.DataAnnotations;

namespace RegistryApi.Models
{
    public class Location
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

        [Required]
        public double GeofenceRadius { get; set; } // In meters

        public ICollection<ApplicationUser> ApplicationUsers { get; set; } = new List<ApplicationUser>();  // ✅ Explicit
        public ICollection<Attendence> Attendances { get; set; } = new List<Attendence>();
    }
}
