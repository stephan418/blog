using BaseDataServer.Errors;
using BaseDataServer.Models.Users;
using DotNext;
using Microsoft.EntityFrameworkCore;
using System.Net.Mime;

namespace BaseDataServer.Models.Posts
{
    public class PostRepository : IPostRepository
    {
        QuizDbContext _context;

        public PostRepository(QuizDbContext context)
        {
            _context = context;
        }

        public async Task<Result<Post, ErrorType>> CreatePostAsync(Guid userId, PostDto dto)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user is null)
            {
                return new(ErrorType.DependentObjectNotFound);
            }

            Post post = new()
            {
                Title = dto.Title,
                Text = dto.Text,
                User = user,
            };

            await _context.Posts.AddAsync(post);

            await _context.SaveChangesAsync();

            return post;
        }

        public async Task<Result<object, ErrorType>> DeletePostAsync(Guid id)
        {
            Post? post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);

            if (post is null)
            {
                return new(ErrorType.TargetObjectNotFound);
            }

            _context.Posts.Remove(post);

            await _context.SaveChangesAsync();

            return post;
        }

        public async Task<Result<IEnumerable<Post>>> GetAllAsync()
        {
            return new(_context.Posts.Include(p => p.User));
        }

        public async Task<Result<Post?>> GetByIdAsync(Guid id)
        {
            return await _context.Posts.Include(p => p.User).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Result<Post, ErrorType>> UpdatePostAsync(Guid id, PostDto dto)
        {
            Post? post = _context.Posts.FirstOrDefault(p => p.Id == id);

            if (post is null)
            {
                return new(ErrorType.TargetObjectNotFound);
            }

            post.Title = dto.Title;
            post.Text = dto.Text;

            await _context.SaveChangesAsync();

            return post;
        }
    }
}
