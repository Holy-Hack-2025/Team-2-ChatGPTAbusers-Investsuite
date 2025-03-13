namespace Backend.model
{
    public enum Role
    {
        User,
        Admin
    }

    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public DateTime TimestampCreated { get; set; }

        public ICollection<Stock> Stocks { get; set; } = new List<Stock>();
    }
}
