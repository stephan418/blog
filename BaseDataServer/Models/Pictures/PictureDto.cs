namespace BaseDataServer.Models.Pictures
{
    public record PictureDto
    {
        public string Description { get; set; }

        public IFormFile Picture { get; set; }
    }
}
