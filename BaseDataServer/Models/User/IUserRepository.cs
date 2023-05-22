namespace BaseDataServer.Models.Users
{
    public interface IUserRepository
    {
        public IEnumerable<User> All { get; }

        User CreateUser(CreateUserDto dto);

        User? GetById(Guid id);

        User? GetByUsername(string username);

        User? QueryAndVerifyUser(string username, string password);
    }
}
