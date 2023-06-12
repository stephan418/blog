using BaseDataServer.Models.Pictures;
using BaseDataServer.Models.Posts;
using BaseDataServer.Models.Profiles;
using Microsoft.EntityFrameworkCore;

namespace BaseDataServer.Models.Users
{
    public class QuizDbContext : DbContext
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }

        public DbSet<Profile> Profiles { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Picture> Pictures { get; set; }
    }
}
