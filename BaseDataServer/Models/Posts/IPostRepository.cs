using BaseDataServer.Errors;
using DotNext;
using System.Runtime.CompilerServices;

namespace BaseDataServer.Models.Posts
{
    public interface IPostRepository
    {
        public Task<Result<IEnumerable<Post>>> GetAllAsync();

        public Task<Result<Post?>> GetByIdAsync(Guid id);

        public Task<Result<Post, ErrorType>> CreatePostAsync(Guid userId, PostDto dto);

        public Task<Result<Post, ErrorType>> UpdatePostAsync(Guid userId, PostDto dto);

        public Task<Result<object, ErrorType>> DeletePostAsync(Guid userId);
    }
}
