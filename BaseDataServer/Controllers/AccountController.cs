using AutoMapper;
using BaseDataServer.Models.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace BaseDataServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IUserRepository _userRepository;
        private IMapper _mapper;

        public AccountController(IUserRepository userRepository, IMapper mapper) {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult<CreateUserResultDto>> CreateAccount([FromBody] CreateUserDto dto)
        {
            try
            {
                User user = _userRepository.CreateUser(dto);

                return Ok(_mapper.Map<CreateUserResultDto>(user));
            }
            catch (DbUpdateException e)
            {
                if (e.InnerException is PostgresException exception)
                {
                    if (exception.SqlState == PostgresErrorCodes.UniqueViolation)
                    {
                        return Conflict();
                    }
                }

                throw e;
            }

        }
    }
}
