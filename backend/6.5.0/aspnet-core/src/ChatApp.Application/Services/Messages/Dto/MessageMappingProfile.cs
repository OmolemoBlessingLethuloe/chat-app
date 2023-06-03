using AutoMapper;
using ChatApp.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Services.Messages.Dto
{
    public class MessageMappingProfile: Profile
    {
        public MessageMappingProfile()
        {
            CreateMap<Message, MessageDto>()
                .ForMember(e => e.ConversationId, m => m.MapFrom(e => e.Conversation.Id))
                .ForMember(e => e.ParticipantId, m => m.MapFrom(e => e.Participant.Id));

            CreateMap<MessageDto, Message>()
                .ForMember(e => e.Id, d => d.Ignore());
        }
    }
}
