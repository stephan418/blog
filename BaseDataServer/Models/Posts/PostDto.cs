using System.Reflection;

namespace BaseDataServer.Models.Posts
{
    public record PostDto
    {
        public string Title { get; set; }

        public string Text { get; set; }
    }
}
