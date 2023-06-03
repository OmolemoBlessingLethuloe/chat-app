using Abp.Authorization;
using ChatApp.Authorization.Roles;
using ChatApp.Authorization.Users;

namespace ChatApp.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
