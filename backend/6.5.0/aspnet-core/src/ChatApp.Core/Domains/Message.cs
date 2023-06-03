using Abp.Domain.Entities.Auditing;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Domains
{
    public class Message: FullAuditedEntity<Guid>
    {
        public Conversation Conversation { get; set; }
        public Participant Participant { get; set; }
        public string Text { get; set; }
        [NotMapped]
        public IFormFile Media { get; set; }
        public string MediaPath { get; set; }

    }
}
