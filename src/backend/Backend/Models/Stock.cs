namespace Backend.model
{        
    public class Stock
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string ApiID { get; set; } = string.Empty;
        public DateTime TimestampCreated { get; set; }

        public int UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
