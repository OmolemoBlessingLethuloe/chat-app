using System.Threading.Tasks;
using Abp.Application.Services;
using ChatApp.Sessions.Dto;

namespace ChatApp.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
