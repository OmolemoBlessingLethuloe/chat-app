using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ChatApp.EntityFrameworkCore;
using ChatApp.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace ChatApp.Web.Tests
{
    [DependsOn(
        typeof(ChatAppWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class ChatAppWebTestModule : AbpModule
    {
        public ChatAppWebTestModule(ChatAppEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ChatAppWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(ChatAppWebMvcModule).Assembly);
        }
    }
}