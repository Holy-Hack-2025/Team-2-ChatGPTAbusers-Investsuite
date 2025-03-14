using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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

        [HttpPost]
        public async Task<IActionResult> SetStock(string token, int amount)
        {
            var userId = GetUserIdFromToken();

            if (userId == null)
                return Unauthorized("User ID not found in token.");

            //if exists
            var stock = await _db.Stocks.FirstOrDefaultAsync(s => s.Token == token);
            if (stock == null)
            {
                //create
                stock = new() { Token = token, UserId = userId.Value, Amount = amount };
                await _db.Stocks.AddAsync(stock);
                _db.SaveChanges();
                return Ok(stock);
            }

            if (amount == 0)
            {
                //delete
                _db.Stocks.Remove(stock);
                _db.SaveChanges();
                return Ok();
            }

            //update
            stock.Amount = amount;
            _db.SaveChanges();
            return Ok(stock);

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
                return BadRequest();
            }
        }

        private int? GetUserIdFromToken()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return null;

            if (int.TryParse(userIdClaim.Value, out var userId))
                return userId;

            return null;
        }
    }
}
