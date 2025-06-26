namespace RegistryApi.Dtos
{
    public class UpdateEmployeeDto
    {
        
            public int Id { get; set; } 
            public string Name { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string LocationId { get; set; } = string.Empty;
        

    }
}
