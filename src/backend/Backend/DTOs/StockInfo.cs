namespace Backend.DTOs
{
    public class StockInfo
    {
        public string Token { get; set; } = string.Empty;
        public string Currency { get; set; } = string.Empty;
        public float RegularMarketPrice { get; set; }
        public string Name { get; set; } = string.Empty;

        public List<float> HistoricPrices { get; set; } = [];
    }
}
