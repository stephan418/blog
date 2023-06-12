using BaseDataServer.Errors;
using BaseDataServer.Models.Users;
using DotNext;
using Microsoft.EntityFrameworkCore;
using SixLabors.ImageSharp.Memory;

namespace BaseDataServer.Models.Pictures
{
    public class PictureRepository : IPictureRepository
    {
        QuizDbContext _context;

        public PictureRepository(QuizDbContext context)
        {
            _context = context;
        }

        public async Task<Result<object, ErrorType>> DeleteImageAsync(Guid id)
        {
            Picture? picture = await _context.Pictures.FirstOrDefaultAsync(p => p.Id == id);

            if (picture is null)
            {
                return new(ErrorType.TargetObjectNotFound);
            }

            _context.Pictures.Remove(picture);

            await _context.SaveChangesAsync();

            return null;
        }

        public async Task<Result<IEnumerable<Picture>>> GetAllAsync()
        {
            return _context.Pictures;
        }

        public async Task<Result<Picture?>> GetByIdAsync(Guid id)
        {
            return await _context.Pictures.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Result<Picture, ErrorType>> InsertImageAsync(Guid userId, PictureDto dto)
        {
            BaseDataServer.Models.Users.User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (user is null)
            {
                return new(ErrorType.DependentObjectNotFound);
            }

            // TODO: Add content type check

            using var memoryStream = new MemoryStream();

            Image image = Image.Load(dto.Picture.OpenReadStream());

            if (image.Bounds.Width > 1920)
            {
                image.Mutate(x => x.Resize(1920, 0));
            }

            if (image.Bounds.Height > 1080)
            {
                image.Mutate(x => x.Resize(0, 1080));
            }

            image.Save(memoryStream, image.Metadata.DecodedImageFormat);

            // Only allow < 2 MB
            if (memoryStream.Length < 2097152)
            {
                Picture picture = new Picture()
                {
                    Content = memoryStream.ToArray(),
                    Description = dto.Description,
                    OriginalName = dto.Picture.FileName,
                    ContentType = dto.Picture.ContentType, Author = user
                };

                _context.Pictures.Add(picture);

                await _context.SaveChangesAsync();

                return picture;
            }

            return new(ErrorType.FileTooLarge);
        }
    }
}
