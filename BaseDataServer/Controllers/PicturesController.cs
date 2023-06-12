using AutoMapper;
using BaseDataServer.Errors;
using BaseDataServer.Models.Pictures;
using BaseDataServer.Models.Posts;
using DotNext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BaseDataServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PicturesController : ControllerBase
    {
        IPictureRepository _pictureRepository;
        IMapper _mapper;

        public PicturesController(IPictureRepository pictureRepository, IMapper mapper)
        {
            _pictureRepository = pictureRepository;
            _mapper = mapper;
        }

        [HttpPost]
        [Authorize]
        [RequestSizeLimit(2 * 1024 * 1024)]
        public async Task<ActionResult<PictureMetaDto>> CreatePostAsync([FromForm] PictureDto dto)
        {
            Guid userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Result<Picture, ErrorType> result = await _pictureRepository.InsertImageAsync(userId, dto);

            if (!result.IsSuccessful)
            {
                return result.Error switch
                {
                    ErrorType.DependentObjectNotFound => Unauthorized(),
                    ErrorType.FileTooLarge => StatusCode(413, "The max file size is 2 MB"),
                    _ => StatusCode(500)
                };
            }

            return _mapper.Map<PictureMetaDto>(result.Value);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetBinaryPicture([FromRoute] Guid id)
        {
            Picture? picture = (await _pictureRepository.GetByIdAsync(id)).Value;

            if (picture is null)
            {
                return NotFound();
            }

            return File(picture.Content, picture.ContentType);
        }
    }
}
