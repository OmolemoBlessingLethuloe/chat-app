using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Domains
{
    public class ConversationParticipant: FullAuditedEntity<Guid>
    {
        public Conversation Conversation { get; set; }
        public Participant Participant { get; set; }
    }
}
