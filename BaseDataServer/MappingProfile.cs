using AutoMapper;
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
            CreateMap<Profile, ProfileDto>();
            CreateMap<Post, PostDto>();

            var profileResultMap = CreateMap<Profile, ProfileResultDto>();
            profileResultMap.ForMember(_ => _.Name, opt => opt.MapFrom(_ => _.Name));
            profileResultMap.ForMember(_ => _.Description, opt => opt.MapFrom(_ => _.Description));
            profileResultMap.ForMember(_ => _.Id, opt => opt.MapFrom(_ => _.User.Id));

            var postResultMap = CreateMap<Post, PostResultDto>();
            postResultMap.ForMember(_ => _.Id, opt => opt.MapFrom(_ => _.Id));
            postResultMap.ForMember(_ => _.Title, opt => opt.MapFrom(_ => _.Title));
            postResultMap.ForMember(_ => _.Text, opt => opt.MapFrom(_ => _.Text));
            postResultMap.ForMember(_ => _.Author, opt => opt.MapFrom(_ => _.User.Id));
        }
    }
}
