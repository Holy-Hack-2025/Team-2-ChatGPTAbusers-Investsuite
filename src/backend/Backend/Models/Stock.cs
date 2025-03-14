namespace Backend.model
{
    public class Stock
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public int Amount { get; set; }
        public DateTime TimestampCreated { get; set; } = DateTime.UtcNow;

        public int UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
