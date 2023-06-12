namespace BaseDataServer.Models.Profiles
{
    public record ProfileResultDto
    {
        public Guid Id { get; set; }
        
        public string Name { get; set; }
        
        public string Description { get; set; }

        public Guid? PictureId { get; set; }
    }
}
