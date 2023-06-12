using AutoMapper;
using BaseDataServer.Models.Pictures;
using BaseDataServer.Models.Posts;
using BaseDataServer.Models.Profiles;
using BaseDataServer.Models.Users;

using Profile = BaseDataServer.Models.Profiles.Profile;

namespace BaseDataServer
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<User, CreateUserResultDto>();
            CreateMap<Post, PostDto>();

            var profileMap = CreateMap<Profile, ProfileDto>();
            profileMap.ForMember(_ => _.PictureId, opt => opt.MapFrom(_ => _.Picture.Id));

            var profileResultMap = CreateMap<Profile, ProfileResultDto>();
            profileResultMap.ForMember(_ => _.Name, opt => opt.MapFrom(_ => _.Name));
            profileResultMap.ForMember(_ => _.Description, opt => opt.MapFrom(_ => _.Description));
            profileResultMap.ForMember(_ => _.Id, opt => opt.MapFrom(_ => _.User.Id));
            profileResultMap.ForMember(_ => _.PictureId, opt => opt.MapFrom(_ => _.Picture.Id));

            var postResultMap = CreateMap<Post, PostResultDto>();
            postResultMap.ForMember(_ => _.Id, opt => opt.MapFrom(_ => _.Id));
            postResultMap.ForMember(_ => _.Title, opt => opt.MapFrom(_ => _.Title));
            postResultMap.ForMember(_ => _.Text, opt => opt.MapFrom(_ => _.Text));
            postResultMap.ForMember(_ => _.Author, opt => opt.MapFrom(_ => _.User.Id));
            postResultMap.ForMember(_ => _.AuthorName, opt => opt.MapFrom(_ => _.User.Profile!.Name));

            var pictureMetaMap = CreateMap<Picture, PictureMetaDto>();
            pictureMetaMap.ForMember(_ => _.AuthorName, opt => opt.MapFrom(_ => _.Author.Id));
        }
    }
}
