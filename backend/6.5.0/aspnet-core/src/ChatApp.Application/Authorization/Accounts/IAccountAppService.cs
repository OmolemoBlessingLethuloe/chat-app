using System.Threading.Tasks;
using Abp.Application.Services;
using ChatApp.Authorization.Accounts.Dto;

namespace ChatApp.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
