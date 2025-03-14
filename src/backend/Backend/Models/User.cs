namespace Backend.model
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public DateTime TimestampCreated { get; set; } = DateTime.UtcNow;

        public ICollection<Stock> Stocks { get; set; } = new List<Stock>();
    }
}
