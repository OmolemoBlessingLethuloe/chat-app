using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using ChatApp.Domains;
using ChatApp.Domains.RefLists;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Services.Conversations.Dto
{
    [AutoMap(typeof(Conversation))]
    public class ConversationDto: EntityDto<Guid>
    {
        public RefListConversationType ConversationType { get; set; }
        public bool Archived { get; set; }
        public string GroupName { get; set; }
        public string GroupAvatarURL { get; set; }
        public string About { get; set; }
        public string[] Participants { get; set; }
    }

    [AutoMap(typeof(ConversationParticipant))]
    public class ParticipantsConversationsDto
    {
        public Guid ConversationId { get; set; }
        public Guid ParticipantId { get; set; }
    }

    [AutoMap(typeof(ConversationParticipant))]
    public class ConversationWithParticipantsDto
    {
        public Guid ConversationId { get; set; }
        public RefListConversationType ConversationType { get; set; }
        public string GroupName { get; set; }
        public string GroupAvatarURL { get; set; }
        public string About { get; set; }
        public bool Archived { get; set; }
        public List<ParticipantsOfConversationDto> ParticipantsOfConversation { get; set; }
    }

    [AutoMap(typeof(Participant))]
    public class ParticipantsOfConversationDto
    {
        public string ParticipantName { get; set; }
        public string PhoneNumber { get; set; }
        public string AvatarURL { get; set; }
        public string AvatarFilename { get; set; }
        public string AboutMe { get; set; }

    }

    [AutoMap(typeof(Conversation))]
    public class ChangeGroupAboutDto
    {
        public string About { get; set; }
    }

    [AutoMap(typeof(Conversation))]

    public class ArchiveDto
    {
        public bool Archived { get; set; }
    }

}
