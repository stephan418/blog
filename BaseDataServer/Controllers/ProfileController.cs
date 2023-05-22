using AutoMapper;
using BaseDataServer.Models.Profiles;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Security.Claims;

using Profile = BaseDataServer.Models.Profiles.Profile;

namespace BaseDataServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private IProfileRepository _profileRepository;
        private IMapper _mapper;

        public ProfileController(IProfileRepository profileRepository, IMapper mapper)
        {
            _profileRepository = profileRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProfileResultDto>>> GetAllProfiles()
        {
            return _mapper.Map<List<ProfileResultDto>>(await this._profileRepository.GetAllAsync());
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ProfileResultDto>> CreateProfile([FromBody] ProfileDto dto)
        {
            Guid id = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            try
            {
                Profile profile = await _profileRepository.CreateProfileAsync(id, dto);

                return _mapper.Map<ProfileResultDto>(profile);
            } catch (DbUpdateException e)
            {
                if (e.InnerException is PostgresException)
                {
                    PostgresException inner = (PostgresException) e.InnerException;
                    
                    if (inner.SqlState == "23505")
                    {
                        return Conflict();
                    }
                }

                throw e;
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProfileResultDto>> GetProfile([FromRoute] Guid id)
        {
            Profile? profile = await _profileRepository.GetByIdAsync(id);

            if (profile is null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ProfileResultDto>(profile));
        }

        [HttpPatch("{id}")]
        [Authorize]
        public async Task<ActionResult<ProfileResultDto>> UpdateProfile([FromRoute] Guid id, [FromBody] JsonPatchDocument<ProfileDto> dto)
        {
            Guid claimsId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (id != claimsId)
            {
                return Forbid();
            }

            Profile? profile = await _profileRepository.GetByIdAsync(id);

            if (profile is null)
            {
                return NotFound();
            }

            ProfileDto profileDto = _mapper.Map<ProfileDto>(profile);

            dto.ApplyTo(profileDto);

            Profile updatedProfile = await _profileRepository.UpdateProfileAsync(id, profileDto);

            return _mapper.Map<ProfileResultDto>(updatedProfile);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteProfile([FromRoute] Guid id)
        {
            await _profileRepository.DeleteProfileAsync(id);

            return NoContent();
        }
    }
}
