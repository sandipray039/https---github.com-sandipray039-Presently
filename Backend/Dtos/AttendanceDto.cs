// Dtos/AttendanceDto.cs
namespace RegistryApi.Dtos
{
    public class AttendanceDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public DateTime? CheckInTime { get; set; }
        public DateTime? CheckOutTime { get; set; }
        public double? TotalHours { get; set; }
        public DateTime? BreakStart { get; set; }
        public DateTime? BreakEnd { get; set; }

        public string? LocationId { get; set; }
        public string? LocationName { get; set; }

        public int? UserId { get; set; }
        public string? UserName { get; set; }
    }
}
