using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using ChatApp.MultiTenancy;

namespace ChatApp.Sessions.Dto
{
    [AutoMapFrom(typeof(Tenant))]
    public class TenantLoginInfoDto : EntityDto
    {
        public string TenancyName { get; set; }

        public string Name { get; set; }
    }
}
