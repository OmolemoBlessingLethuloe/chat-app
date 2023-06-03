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
    public class Participant: FullAuditedEntity<Guid>
    {
        public virtual string FirstName { get; set; }
        public virtual string LastName { get; set; }
        public virtual int Age { get; set; }
        public virtual RefListGender Gender { get; set; }
        public virtual string EmailAddress { get; set; }
        public virtual string Password { get; set; }
        public virtual string PhoneNumber { get; set; }
        public virtual string Username { get; set; }
        public virtual string AboutMe { get; set; }
        public virtual bool Status { get; set; }
        public virtual string AvatarURL { get; set; }
        [NotMapped]
        public virtual IFormFile Avatar { get; set; }
        public virtual string AvatarFilename { get; set; }
        [NotMapped]
        public IFormFile Chatbackground { get; set; }
        public string ChatbackgroundPath { get; set; }
    }
}
