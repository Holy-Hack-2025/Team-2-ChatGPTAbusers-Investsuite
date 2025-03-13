using Backend.Data;
using Backend.model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockController : Controller
    {
        private readonly BackendDbContext _db;

        public StockController(BackendDbContext db, IConfiguration configuration)
        {
            _db = db;
        }

        [HttpGet("{symbol}")]
        public async Task<IActionResult> GetStockData(string symbol)
        {
            if (string.IsNullOrEmpty(_polygonApiKey))
            {
                return BadRequest("Polygon API key is missing.");
            }

            string url = $"https://api.polygon.io/v2/last/trade/{symbol}?apiKey={_polygonApiKey}";

            try
            {
                HttpResponseMessage response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();
                string responseBody = await response.Content.ReadAsStringAsync();
                return Ok(responseBody);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, $"Error fetching stock data: {ex.Message}");
            }
        }
    }
}
