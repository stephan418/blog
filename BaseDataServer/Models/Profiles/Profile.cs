using BaseDataServer.Models.Pictures;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaseDataServer.Models.Profiles
{
    public class Profile
    {
        [ForeignKey("Id")]
        public Users.User User { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public Picture? Picture { get; set; }
    }
}
