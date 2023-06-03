using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using ChatApp.Domains;
using ChatApp.Domains.RefLists;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Services.Messages.Dto
{
    [AutoMap(typeof(Message))]
    public class MessageDto: EntityDto<Guid>
    {
        public Guid ConversationId { get; set; }
        public Guid ParticipantId { get; set; }
        public string Text { get; set; }
        public IFormFile Media { get; set; }
        public string MediaPath { get; set; }
    }

    public class ConversationMessagesDto
    {
        public Guid ConversationId { get; set; }
        public RefListConversationType ConversationType { get; set; }
        public List<MessagesHistoryDto> Messages { get; set; }
    }

    public class MessagesHistoryDto
    {
        public Guid MessageId { get; set; }
        public Guid ParticipantId { get; set; }
        public string SenderName { get; set; }
        public string Text { get; set; }
        public string MediaPath { get; set; }
        public string Time { get; set; }
        public List<RecipientsDto> Recipients { get; set; }
    }

    public class RecipientsDto
    {
        public string RecipientName { get; set; }
        public string PhoneNumber { get; set; }

    }
}
