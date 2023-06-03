using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace ChatApp.Controllers
{
    public abstract class ChatAppControllerBase: AbpController
    {
        protected ChatAppControllerBase()
        {
            LocalizationSourceName = ChatAppConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
