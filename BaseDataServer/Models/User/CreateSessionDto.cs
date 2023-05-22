namespace BaseDataServer.Models.Session
{
    public record CreateSessionDto
    {
        public string Username { get; set; }

        public string Password { get; set; }
    }
}
