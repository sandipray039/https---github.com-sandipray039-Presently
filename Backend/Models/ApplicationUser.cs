using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RegistryApi.Models
{
    public class ApplicationUser
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public string Role { get; set; } = "Employee";
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MaxLength(256)]  // To store hashed passwords
        public string Password { get; set; }

        public string? LocationId { get; set; } // Nullable (Admin may not have a location)

        [ForeignKey("LocationId")]
        public Location? Location { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public ICollection<Attendence>? Attendences { get; set; }
        public ICollection<Notification>? Notifications { get; set; }
        public ICollection<Break>? Breaks { get; set; }
        public ICollection<Report>? Reports { get; set; }
    }
}
