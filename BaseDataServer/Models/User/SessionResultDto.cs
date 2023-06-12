namespace BaseDataServer.Models.Users
{
    public record SessionResultDto
    {
        public string Token { get; set; }

        public Guid Id { get; set; }
    }
}
