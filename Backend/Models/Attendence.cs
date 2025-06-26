using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RegistryApi.Models
{
    public class Attendence
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public ApplicationUser ApplicationUser { get; set; }
        public DateTime? CheckInTime { get; set; }
        public DateTime? CheckOutTime { get; set; }
        public DateTime? BreakStart { get; set; }
        public DateTime? BreakEnd { get; set; }
        public double TotalHours { get; set; } // Computed at checkout
        public DateTime Date { get; set; } = DateTime.UtcNow;

        public string LocationId { get; set; }
        [ForeignKey("LocationId")]
        public Location Location { get; set; }


    }
}
