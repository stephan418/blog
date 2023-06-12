using BaseDataServer.Models.Users;
using System.ComponentModel.DataAnnotations;

namespace BaseDataServer.Models.Pictures
{
    public class Picture
    {
        [Key]
        public Guid Id { get; set; }

        public string Description { get; set; }

        public string OriginalName { get; set; }

        public string ContentType { get; set; }

        public User Author { get; set; }

        public byte[] Content { get; set; }
    }
}
