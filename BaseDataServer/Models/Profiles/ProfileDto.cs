namespace BaseDataServer.Models.Profiles
{
    public record ProfileDto
    {
        public string Name { get; set; }

        public string? Description { get; set; }

        public Guid? PictureId { get; set; }
    }
}
