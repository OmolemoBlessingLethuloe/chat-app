using Abp.Domain.Entities.Auditing;
using ChatApp.Domains.RefLists;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Domains
{
    public class Conversation: FullAuditedEntity<Guid>
    {
        public virtual RefListConversationType ConversationType { get; set; }
        public virtual string GroupName { get; set; }
        public virtual string About { get; set; }
        public virtual string GroupAvatarURL { get; set; }
        public virtual bool Archived { get; set; }

    }
}
