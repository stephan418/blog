using BaseDataServer.Models.Pictures;
using BaseDataServer.Models.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BaseDataServer.Models.Profiles
{
    public class ProfileRepository : IProfileRepository
    {
        private readonly QuizDbContext _context;

        public ProfileRepository(QuizDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Profile>> GetAllAsync()
        {
            return _context.Profiles.Include(p => p.User).Include(p => p.Picture);
        }

        public async Task<Profile?> CreateProfileAsync(Guid userId, ProfileDto dto)
        {
            Users.User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            Picture? picture = null;

            if (dto.PictureId is not null)
            {
                picture = await _context.Pictures.FirstOrDefaultAsync(p => p.Id == dto.PictureId);

                if (picture is null)
                {
                    return null;
                }
            }

            if (user is null)
            {
                return null;
            }
           
            if (user.Profile is not null)
            {
                return null;
            }

            Profile profile = new Profile()
            {
                User = user,
                Name = dto.Name,
                Description = dto.Description,
                Picture = picture,
            };

            _context.Profiles.Add(profile);

            await _context.SaveChangesAsync();

            return profile;
        }

        public async Task DeleteProfileAsync(Guid userId)
        {
            Profile profile = await _context.Profiles.FirstAsync(p => p.User.Id == userId);

            _context.Profiles.Remove(profile);

            await _context.SaveChangesAsync();
        }

        public async Task<Profile?> GetByIdAsync(Guid userId)
        {
            return await _context.Profiles.Include(p => p.User).Include(p => p.Picture).FirstOrDefaultAsync(p => p.User.Id == userId);
        }

        public async Task<Profile?> UpdateProfileAsync(Guid userId, ProfileDto dto)
        {
            Profile? profile = await _context.Profiles.FirstOrDefaultAsync(p => p.User.Id == userId);

            if (profile is null)
            {
                return null;
            }

            Picture? picture = null;

            if (dto.PictureId is not null)
            {
                picture = await _context.Pictures.FirstOrDefaultAsync(p => p.Id == dto.PictureId);

                if (picture is null)
                {
                    return null;
                }
            }

            profile.Name = dto.Name;
            profile.Description = dto.Description;
            profile.Picture = picture;

            await _context.SaveChangesAsync();

            return profile;
        }
    }
}
