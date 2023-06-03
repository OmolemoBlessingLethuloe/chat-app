using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ChatApp.Authorization;

namespace ChatApp
{
    [DependsOn(
        typeof(ChatAppCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class ChatAppApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<ChatAppAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(ChatAppApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
