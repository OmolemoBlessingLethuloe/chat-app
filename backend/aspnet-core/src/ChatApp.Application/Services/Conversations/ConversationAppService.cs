using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using AutoMapper;
using ChatApp.Domains;
using ChatApp.Services.Conversations.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Services.Conversations
{
    public class ConversationAppService : ControllerBase, IApplicationService
    {
        private readonly IRepository<Conversation, Guid> _conversationRepository;
        private readonly IRepository<Participant, Guid> _participantRepository;
        private readonly IRepository<ConversationParticipant, Guid> _conversationParticipantsRepository;
        private readonly IRepository<Message, Guid> _messageRepository;
        private readonly IMapper _mapper;



        public ConversationAppService(IMapper mapper, IRepository<ConversationParticipant, Guid> conversationParticipantsRepository, IRepository<Message, Guid> messageRepository, IRepository<Conversation, Guid> conversationRepository, IRepository<Participant, Guid> participantRepository)
        {
            _conversationRepository = conversationRepository;
            _participantRepository = participantRepository;
            _conversationParticipantsRepository = conversationParticipantsRepository;
            _messageRepository = messageRepository;
            _mapper = mapper;
        }


        public async Task<ConversationDto> CreateAsync(ConversationDto input)
        {
            var participants = _participantRepository.GetAll();
            var groupName = await _conversationRepository.GetAll().FirstOrDefaultAsync(n => n.GroupName == input.GroupName && n.GroupName != "");
            if (groupName != null) throw new UserFriendlyException("Groupname already exists. Try a more unique name.");
            var conversation = _mapper.Map<Conversation>(input);
            var addConversation = await _conversationRepository.InsertAsync(conversation);
            foreach (var participant in input.Participants)
            {
                var conversationParticipant = new ConversationParticipant()
                {
                    Conversation = addConversation,
                    Participant = await participants.Where(n => n.PhoneNumber == participant).FirstOrDefaultAsync()
                };
                await _conversationParticipantsRepository.InsertAsync(conversationParticipant);
            }
            return _mapper.Map<ConversationDto>(addConversation);
        }

        public async Task<List<ConversationInfoDto>> GetAllNewConversations()
        {
            var conversationParticipants = await _conversationParticipantsRepository.GetAllIncluding(e => e.Participant, c => c.Conversation).ToListAsync();
           
            var results = conversationParticipants.Select(e =>
            {
                var lastMessage = _messageRepository.GetAll().Where(m => m.Conversation == e.Conversation).OrderByDescending(e => e.CreationTime).FirstOrDefault();
                return new ConversationInfoDto
                {
                    GroupName = e.Conversation.GroupName,
                    Username = e.Participant.Username,
                    IsPrivate = e.Conversation.ConversationType,
                    DisplayText = lastMessage?.Text,
                    LastTextTime = lastMessage?.CreationTime,
                    GroupAvatarURL = e.Conversation.GroupAvatarURL
                };
            }).ToList();

            return results;
        }
        public async Task<List<ConversationWithParticipantsDto>> GetAllConversations()
        {
            var conversation = _conversationRepository.GetAll().Select(n => new ConversationWithParticipantsDto
            {
                ConversationId = n.Id,
                ConversationType = n.ConversationType,
                GroupName = n.GroupName,
                GroupAvatarURL = n.GroupAvatarURL,
                Archived = n.Archived,
                About = n.About,
                ParticipantsOfConversation = _conversationParticipantsRepository.GetAll().Where(x => x.Conversation.Id == n.Id)
                                                                                         .Select(m => new ParticipantsOfConversationDto
                                                                                         {
                                                                                             ParticipantName = m.Participant.Username,
                                                                                             PhoneNumber = m.Participant.PhoneNumber,
                                                                                             AvatarURL = m.Participant.AvatarURL,
                                                                                             AvatarFilename = m.Participant.AvatarFilename,
                                                                                             AboutMe = m.Participant.AboutMe
                                                                                         }).ToList()
            });
            return _mapper.Map<List<ConversationWithParticipantsDto>>(conversation);
        }

        /// Deleting Entries
        public async Task DeleteAsync(Guid id)
        {
            await _conversationRepository.DeleteAsync(id);
        }

        public async Task<ConversationDto> UpdateAboutMeAsync(ChangeGroupAboutDto input, Guid conversationId)
        {
            var entity = await _conversationRepository.FirstOrDefaultAsync(n => n.Id == conversationId);
            if (entity == null) throw new UserFriendlyException("Conversation not found.");
            var conversation = _mapper.Map(input, entity);
            conversation.About = input.About;
            await _conversationRepository.UpdateAsync(conversation);
            return _mapper.Map<ConversationDto>(conversation);
        }


        public async Task<ConversationDto> UpdateArchiveAsync(ArchiveDto input, Guid conversationId)
        {
            var entity = await _conversationRepository.FirstOrDefaultAsync(n => n.Id == conversationId);
            if (entity == null) throw new UserFriendlyException("Conversation not found.");
            var conversation = _mapper.Map(input, entity);
            conversation.Archived = input.Archived;
            await _conversationRepository.UpdateAsync(conversation);
            return _mapper.Map<ConversationDto>(conversation);
        }
        public async Task<List<ConversationInfoDto>> GetByNewSearch(string term)
        {
            var query = _conversationParticipantsRepository.GetAllIncluding(e => e.Participant, c => c.Conversation);
                //.Where();

            var conversationParticipants = await query.ToListAsync();
            var results = conversationParticipants.Select(e =>
            {
                var lastMessage = _messageRepository.GetAll().Where(m => m.Conversation == e.Conversation).OrderByDescending(e => e.CreationTime).FirstOrDefault();
                return new ConversationInfoDto
                {
                    GroupName = e.Conversation.GroupName,
                    Username = e.Participant.Username,
                    IsPrivate = e.Conversation.ConversationType,
                    DisplayText = lastMessage?.Text,
                    LastTextTime = lastMessage?.CreationTime,
                    GroupAvatarURL = e.Conversation.GroupAvatarURL
                };
            }).ToList();

          return results;
        }

        public async Task<List<ConversationWithParticipantsDto>> GetBySearch(string term)
        {
        

            var searchResult = _conversationParticipantsRepository.GetAllIncluding(c => c.Conversation, n => n.Participant)
                                                                  .Where(e => e.Conversation.GroupName.ToLower().Contains(term.ToLower())
           || e.Participant.Username.ToLower().Contains(term.ToLower())).Select(n => new ConversationWithParticipantsDto()
           {
               ConversationId = n.Conversation.Id,
               ConversationType = n.Conversation.ConversationType,
               GroupName = n.Conversation.GroupName,
               GroupAvatarURL = n.Conversation.GroupAvatarURL,
               Archived = n.Conversation.Archived,
               About = n.Conversation.About,

           }).ToList();
            foreach (var item in searchResult)
            {
                item.ParticipantsOfConversation = _conversationParticipantsRepository.GetAll()
                                                                                     .Where(e => e.Conversation.GroupName.ToLower().Contains(term.ToLower()))
                                                                                     .Select(m => new ParticipantsOfConversationDto
                                                                                     {
                                                                                         ParticipantName = m.Participant.Username,
                                                                                         PhoneNumber = m.Participant.PhoneNumber,
                                                                                         AvatarURL = m.Participant.AvatarURL,
                                                                                         AvatarFilename = m.Participant.AvatarFilename,
                                                                                         AboutMe = m.Participant.AboutMe

                                                                                     }).ToList();
            }
            return _mapper.Map<List<ConversationWithParticipantsDto>>(searchResult);
        }
    }
}
