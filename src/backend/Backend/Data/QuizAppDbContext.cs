using Backend.model;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class BackendDbContext : DbContext
    {
        public BackendDbContext(DbContextOptions<BackendDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Stock> Stocks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Stock>() // Create relation with User
                .HasOne(q => q.User)
                .WithMany(u => u.Stocks)
                .HasForeignKey(q => q.UserId);
        }
    }
}
