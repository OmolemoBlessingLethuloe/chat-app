using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using ChatApp.Configuration.Dto;

namespace ChatApp.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : ChatAppAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
