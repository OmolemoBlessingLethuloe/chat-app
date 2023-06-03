using AutoMapper;
using ChatApp.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Services.Participants.Dto
{
    public class ParticipantMappingProfile: Profile
    {
        public ParticipantMappingProfile()
        {
            CreateMap<Participant, ChangePhoneNumberDto>()
                .ForMember(e => e.NewPhoneNumber, m => m.MapFrom(n => n.PhoneNumber))
                .ForMember(e => e.OldPhoneNumber, m => m.MapFrom(n => n.PhoneNumber));
        }
    }
}
