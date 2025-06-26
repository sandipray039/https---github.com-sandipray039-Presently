namespace RegistryApi.Dtos
{
    public class LocationDto
    {
        public string Name { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double GeofenceRadius { get; set; }
    }
}
