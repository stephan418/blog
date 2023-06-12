namespace BaseDataServer.Models.Pictures
{
    public record PictureMetaDto
    {
        public Guid Id { get; set; }

        public string AuthorName { get; set; }

        public string Description { get; set; }

        public string ContentType { get; set; }
    }
}
