using Microsoft.AspNetCore.Identity;

namespace BaseDataServer.Models.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly QuizDbContext _context;

        public UserRepository(QuizDbContext context)
        {
            _context = context;
        }

        public IEnumerable<User> All => _context.Users;

        public User CreateUser(CreateUserDto dto)
        {
            PasswordHasher<string> hasher = new PasswordHasher<string>();

            string hash = hasher.HashPassword(dto.Username, dto.Password);

            User user = new User()
            {
                Username = dto.Username,
                Password = hash,
                CreatedDate = DateTime.UtcNow,
            };

            _context.Users.Add(user);

            _context.SaveChanges();

            return user;
        }

        public User? GetById(Guid id)
        {
            return _context.Users.Where(x => x.Id == id).First();
        }

        public User? GetByUsername(string username)
        {
            return _context.Users.Where(x => x.Username == username).FirstOrDefault();
        }

        public User? QueryAndVerifyUser(string username, string password)
        {
            User? user = GetByUsername(username);

            if (user is null)
            {
                return null;
            }

            PasswordHasher<string> hasher = new PasswordHasher<string>();

            PasswordVerificationResult result = hasher.VerifyHashedPassword(user.Username, user.Password, password);

            return result switch
            {
                PasswordVerificationResult.Success => user,
                _ => null
            };
        }
    }
}
