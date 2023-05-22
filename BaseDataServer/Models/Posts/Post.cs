using BaseDataServer.Models.Users;
using System.ComponentModel.DataAnnotations;

using DatabaseUser = BaseDataServer.Models.Users.User;

namespace BaseDataServer.Models.Posts
{
    public class Post
    {
        [Key]
        public Guid Id { get; set; }

        public DatabaseUser User { get; set; }

        public string Title { get; set; }

        public string Text { get; set; }
    }
}
