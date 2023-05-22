using System.ComponentModel.DataAnnotations;

namespace BaseDataServer.Models.Users
{
    public record CreateUserDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
