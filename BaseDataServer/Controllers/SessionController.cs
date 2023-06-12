using BaseDataServer.Models.Session;
using BaseDataServer.Models.Users;
using BaseDataServer.Signing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BaseDataServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private IConfiguration _config;
        private IUserRepository _userRepository;
        private JwtService _jwtService;

        public SessionController(IConfiguration config, IUserRepository userRepository, JwtService jwtService)
        {
            _config = config;
            _userRepository = userRepository;
            _jwtService = jwtService;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateSession([FromBody] CreateSessionDto dto)
        {
            User? user = _userRepository.QueryAndVerifyUser(dto.Username, dto.Password);
            
            if (user is null)
            {
                return Forbid();
            }

            return Ok(new SessionResultDto()
            {
                Id = user.Id,
                Token = CreateSessionToken(user) 
            });
        }

        [Authorize]
        [HttpGet]
        public IActionResult TestSession()
        {
            return Ok(User.FindFirstValue(ClaimTypes.NameIdentifier));
        }

        private string CreateSessionToken(User user)
        {
            return _jwtService.ConstructToken(user);
        }
    }
}
