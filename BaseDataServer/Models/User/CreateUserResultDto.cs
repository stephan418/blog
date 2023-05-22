namespace BaseDataServer.Models.Users
{
    public record CreateUserResultDto
    {
        public Guid Id { get; set; }

        public string Username { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
