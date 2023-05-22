namespace BaseDataServer.Models.Profiles
{
    public interface IProfileRepository
   {
        public Task<IEnumerable<Profile>> GetAllAsync();

        public Task<Profile?> GetByIdAsync(Guid userId);

        public Task<Profile> CreateProfileAsync(Guid userId, ProfileDto dto);

        public Task<Profile?> UpdateProfileAsync(Guid userId, ProfileDto dto);

        public Task DeleteProfileAsync(Guid userId);
    }
}
