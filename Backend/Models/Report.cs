using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RegistryApi.Models
{
    public class Report
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public ApplicationUser User { get; set; }

        [Required]
        public string Period { get; set; } // Daily, Weekly, Monthly

        public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public string FilePath { get; set; }
    }
}
