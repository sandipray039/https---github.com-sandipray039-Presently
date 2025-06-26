using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using RegistryApi.Models;

public class Notification
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }
    [ForeignKey("UserId")]
    public ApplicationUser User { get; set; }

    [Required]
    public string Message { get; set; }

    public DateTime Date { get; set; } = DateTime.UtcNow;
    public bool IsRead { get; set; } = false;
}
