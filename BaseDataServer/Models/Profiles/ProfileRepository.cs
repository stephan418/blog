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
            return _context.Profiles.Include(p => p.User);
        }

        public async Task<Profile?> CreateProfileAsync(Guid userId, ProfileDto dto)
        {
            Users.User? user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

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
            return await _context.Profiles.Include(p => p.User).FirstOrDefaultAsync(p => p.User.Id == userId);
        }

        public async Task<Profile?> UpdateProfileAsync(Guid userId, ProfileDto dto)
        {
            Profile? profile = await _context.Profiles.FirstOrDefaultAsync(p => p.User.Id == userId);

            if (profile is null)
            {
                return null;
            }

            profile.Name = dto.Name;
            profile.Description = dto.Description;

            await _context.SaveChangesAsync();

            return profile;
        }
    }
}
