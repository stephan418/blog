namespace BaseDataServer.Models.Posts
{
    public class PostResultDto
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Text { get; set; }

        public Guid Author { get; set; }
    }
}
