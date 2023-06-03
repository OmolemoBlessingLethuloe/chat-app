using AutoMapper;
using ChatApp.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Services.Conversations.Dto
{
    public class ConversationMappingProfile: Profile
    {
        public ConversationMappingProfile()
        {
            CreateMap<ConversationParticipant, ParticipantsConversationsDto>()
                .ForMember(e => e.ConversationId, m => m.MapFrom(e =>  e.Conversation.Id))
                .ForMember(e => e.ParticipantId, m => m.MapFrom(e =>  e.Participant.Id));

            CreateMap<ParticipantsConversationsDto, ConversationParticipant>()
                .ForMember(e => e.Id, d => d.Ignore());


            CreateMap<ConversationParticipant, ConversationWithParticipantsDto>()
                .ForMember(e => e.GroupName, m => m.MapFrom(e => e.Conversation.GroupName))
                .ForMember(e => e.ConversationType, m => m.MapFrom(e => e.Conversation.ConversationType))
                .ForMember(e => e.About, m => m.MapFrom(e => e.Conversation.About))
                .ForMember(e => e.Archived, m => m.MapFrom(e => e.Conversation.Archived))
                .ForMember(e => e.GroupAvatarURL, m => m.MapFrom(e => e.Conversation.GroupAvatarURL));



            CreateMap<ConversationParticipant, ParticipantsOfConversationDto>()
                .ForMember(e => e.ParticipantName, m => m.MapFrom(e => e.Participant.Username))
                .ForMember(e => e.PhoneNumber, m => m.MapFrom(e => e.Participant.PhoneNumber))
                .ForMember(e => e.AvatarURL, m => m.MapFrom(e => e.Participant.AvatarURL))
                .ForMember(e => e.AvatarFilename, m => m.MapFrom(e => e.Participant.AvatarFilename))
                .ForMember(e => e.AboutMe, m => m.MapFrom(e => e.Participant.AboutMe));
        }

    }
}
