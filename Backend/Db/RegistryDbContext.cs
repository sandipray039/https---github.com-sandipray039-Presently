using Microsoft.EntityFrameworkCore;
using RegistryApi.Models;

namespace RegistryApi.Db
{
    public class RegistryDbContext : DbContext
    {
        public RegistryDbContext(DbContextOptions<RegistryDbContext> options) : base(options)
        {
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Attendence> Attendances { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Break> Breaks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ApplicationUser Relationships
            modelBuilder.Entity<ApplicationUser>()
                .HasOne(u => u.Location)
                .WithMany(l => l.ApplicationUsers)
                .HasForeignKey(u => u.LocationId)
                .OnDelete(DeleteBehavior.SetNull);

            // Attendence Relationships
            modelBuilder.Entity<Attendence>()
                .HasOne(a => a.ApplicationUser)
                .WithMany(u => u.Attendences)
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Attendence>()
                .HasOne(a => a.Location)
                .WithMany(l => l.Attendances)
                .HasForeignKey(a => a.LocationId)
                .OnDelete(DeleteBehavior.Cascade);

            // Ensure LocationId is explicitly recognized as a string foreign key
            modelBuilder.Entity<ApplicationUser>()
                .Property(u => u.LocationId)
                .IsRequired(false); // Optional Foreign Key

            modelBuilder.Entity<Attendence>()
                .Property(a => a.LocationId)
                .IsRequired(false); // Optional Foreign Key
        }
    }
}
