using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Backend.Data;
using Backend.DTOs;
using Backend.model;
using Swashbuckle.AspNetCore.Annotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly BackendDbContext _db;
        private readonly IPasswordHasher<User> _hasher;
        private readonly IConfiguration _configuration;

        public UserController(BackendDbContext db, IConfiguration configuration)
        {
            _db = db;
            _hasher = new PasswordHasher<User>();
            _configuration = configuration;
        }

        // POST: api/User/register
        [HttpPost("register")]
        [SwaggerOperation(Summary = "Register a new user")]
        public async Task<ActionResult<DTOs.LoginResponse>> Register([FromBody] DTOs.RegisterRequest request)
        {
            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
                return BadRequest("Username and password cannot be empty.");

            if (_db.Users.Any(x => x.Username.ToLower() == request.Username.ToLower()))
                return BadRequest("This username is already in use");

            if (request.Password.Length < 8)
                return BadRequest("Password should be at least 8 characters");

            User user = new User()
            {
                Username = request.Username,
                Password = _hasher.HashPassword(null, request.Password)
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            await AddStockData(user.Id);

            return Ok(new LoginResponse {
                Token = GenerateJwtToken(user),
                Username = user.Username
            });
        }

        // POST: api/User/login
        [HttpPost("login")]
        [SwaggerOperation(Summary = "Login to an an account")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] DTOs.LoginRequest request)
        {
            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
                return BadRequest("Username and password cannot be empty.");

            var user = await _db.Users.FirstOrDefaultAsync(x => x.Username == request.Username);

            if (user == null || _hasher.VerifyHashedPassword(user, user.Password, request.Password) == PasswordVerificationResult.Failed)
                return BadRequest("The username or password is incorrect");

            return Ok(new LoginResponse {
                Token = GenerateJwtToken(user),
                Username = user.Username
            });
        }

        private async Task AddStockData(int userId)
        {
            List<Stock> stocks = new List<Stock>
            {
                new Stock { Token = "AAPL", UserId = userId, Amount = 10 },
                new Stock { Token = "GOOGL", UserId = userId, Amount = 5 },
                new Stock { Token = "MSFT", UserId = userId, Amount = 8 },
                new Stock { Token = "AMZN", UserId = userId, Amount = 8 },
                new Stock { Token = "MSFT", UserId = userId, Amount = 8 },
                new Stock { Token = "META", UserId = userId, Amount = 8 },
                new Stock { Token = "NVDA", UserId = userId, Amount = 8 },
                new Stock { Token = "IBM", UserId = userId, Amount = 8 },
                new Stock { Token = "TSLA", UserId = userId, Amount = 8 },
                new Stock { Token = "NFLX", UserId = userId, Amount = 8 },
                new Stock { Token = "JNJ", UserId = userId, Amount = 8 },
                new Stock { Token = "WMT", UserId = userId, Amount = 8 },
                new Stock { Token = "CO", UserId = userId, Amount = 8 },
                new Stock { Token = "CSCO", UserId = userId, Amount = 8 },
                new Stock { Token = "MCD", UserId = userId, Amount = 8 },
            };

            await _db.Stocks.AddRangeAsync(stocks);
            await _db.SaveChangesAsync();
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Create the JWT token
            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["JwtSettings:ExpirationInMinutes"])),
                signingCredentials: credentials
            );

            // Return the token as a string
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
