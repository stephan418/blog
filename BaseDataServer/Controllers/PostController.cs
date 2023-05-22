using AutoMapper;
using BaseDataServer.Models.Posts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using DotNext;
using BaseDataServer.Errors;
using BaseDataServer.Models.Profiles;
using Microsoft.AspNetCore.JsonPatch;

namespace BaseDataServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private IPostRepository _postRepository;
        private IMapper _mapper;
        
        public PostController(IPostRepository postRepository, IMapper mapper)
        {
            _postRepository = postRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PostResultDto>>> GetAllPostsAsync()
        {
            Result<IEnumerable<Post>> postResult = await _postRepository.GetAllAsync();

            if (postResult.IsSuccessful)
            {
                return _mapper.Map<List<PostResultDto>>(postResult.Value);
            }

            return StatusCode(500);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PostResultDto?>> GetPostByIdAsync([FromRoute] Guid id)
        {
            Result<Post?> postResult = await _postRepository.GetByIdAsync(id);

            if (postResult.Value is null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<PostResultDto>(postResult.Value));
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PostResultDto>> CreateProfile([FromBody] PostDto dto)
        {
            Guid id = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            Result<Post, ErrorType> postResult = await _postRepository.CreatePostAsync(id, dto);

            if (!postResult.IsSuccessful)
            {
                return postResult.Error switch
                {
                    ErrorType.DependentObjectNotFound => NotFound(),
                    _ => StatusCode(500)
                };
            }

            return _mapper.Map<PostResultDto>(postResult.Value);
        }

        [HttpPatch("{id}")]
        [Authorize]
        public async Task<ActionResult<PostResultDto>> UpdateProfile([FromRoute] Guid id, [FromBody] JsonPatchDocument<PostDto> dto)
        {
            Guid claimsId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            Result<Post?> postResult = await _postRepository.GetByIdAsync(id);

            if (postResult.Value is null)
            {
                return NotFound();
            }

            if (postResult.Value.User.Id != claimsId)
            {
                return Forbid();
            }

            PostDto postDto = _mapper.Map<PostDto>(postResult.Value);

            dto.ApplyTo(postDto);

            Post updatedPost = (await _postRepository.UpdatePostAsync(id, postDto)).Value;

            return _mapper.Map<PostResultDto>(updatedPost);
        }
    }
}
