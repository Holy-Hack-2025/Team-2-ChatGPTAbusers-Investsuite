using Microsoft.EntityFrameworkCore;
using Backend.model;

namespace Backend.Data
{
    public class BackendDbContext : DbContext
    {
        public BackendDbContext(DbContextOptions<BackendDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Stock> Stocks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // USER MODEL

            modelBuilder.Entity<User>() // Automatically set TimestampCreated
                .Property(u => u.TimestampCreated)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // QUIZ MODEL

            modelBuilder.Entity<Stock>() // Create relation with User
                .HasOne(q => q.User)
                .WithMany(u => u.Stocks)
                .HasForeignKey(q => q.UserId);

            modelBuilder.Entity<Stock>() // Automatically set TimestampCreated
                .Property(q => q.TimestampCreated)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries<Stock>();

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.TimestampCreated = DateTime.UtcNow;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }

        public override int SaveChanges()
        {
            var entries = ChangeTracker.Entries<Stock>();

            foreach (var entry in entries)
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.TimestampCreated = DateTime.UtcNow;
                }
            }

            return base.SaveChanges();
        }
    }
}
