using System.Threading.Tasks;
using ChatApp.Configuration.Dto;

namespace ChatApp.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
