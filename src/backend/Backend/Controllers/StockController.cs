using Backend.Data;
using Backend.model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using YahooFinanceApi;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StockController : Controller
    {
        private readonly BackendDbContext _db;
        private readonly HttpClient _httpClient;

        public StockController(BackendDbContext db, IConfiguration configuration)
        {
            _db = db;
            _httpClient = new HttpClient();
        }

        [HttpGet("{symbol}")]
        public async Task<IActionResult> GetStockHistory(string symbol)
        {
            string url = $"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?interval=1d&range=30d";

            try
            {
                _httpClient.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0");

                HttpResponseMessage response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode(); // Throw exception if not 200 OK

                string jsonResponse = await response.Content.ReadAsStringAsync();


                return Ok(jsonResponse);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(500, $"Error fetching data: {ex.Message}");
            }
        }

    }
}
