using BaseDataServer.Errors;
using BaseDataServer.Models.Users;
using DotNext;

namespace BaseDataServer.Models.Pictures
{
    public interface IPictureRepository
    {
        public Task<Result<Picture, ErrorType>> InsertImageAsync(Guid userId, PictureDto dto);

        public Task<Result<object, ErrorType>> DeleteImageAsync(Guid userId);

        public Task<Result<IEnumerable<Picture>>> GetAllAsync();

        public Task<Result<Picture?>> GetByIdAsync(Guid id);
    }
}
