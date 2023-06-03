using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using AutoMapper;
using ChatApp.Domains;
using ChatApp.Services.Messages.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChatApp.Services.Messages
{
    public class MessageAppService : ControllerBase, IMessageAppService
    {
        private readonly IRepository<Message, Guid> _messageRepository;
        private readonly IRepository<Conversation, Guid> _conversationRepository;
        private readonly IRepository<Participant, Guid> _participantRepository;
        private readonly IRepository<ConversationParticipant, Guid> _conversationParticipantsRepository;
        private readonly IMapper _mapper;

        public MessageAppService(IMapper mapper, IRepository<ConversationParticipant, Guid> conversationParticipantsRepository, IRepository<Message, Guid> messageRepository, IRepository<Conversation, Guid> conversationRepository, IRepository<Participant, Guid> participantRepository)
        {
            _messageRepository = messageRepository;
            _conversationRepository = conversationRepository;
            _participantRepository = participantRepository;
            _conversationParticipantsRepository = conversationParticipantsRepository;
            _mapper = mapper;
        }

        [Consumes("multipart/form-data")]
        public async Task<MessageDto> CreateAsync([FromForm] MessageDto input)
        {
            if (input.Text == null) throw new UserFriendlyException("Please enter a text or media to be sent");
            var sender = await _participantRepository.GetAll().FirstOrDefaultAsync(n => n.Id == input.ParticipantId);
            var conversation = await _conversationRepository.GetAll().FirstOrDefaultAsync(n => n.Id == input.ConversationId);
            if (sender == null || conversation == null) throw new UserFriendlyException("Sender or conversation is not found");
            var message = _mapper.Map<Message>(input);
            if (input.Media != null)
            {
                message.MediaPath = input.Media.FileName;
                string BASE_FILE_PATH = "App_Data/Files";
                var filePath = $"{ BASE_FILE_PATH }/{ input.Media.FileName}";
                using var fileStream = input.Media.OpenReadStream();
                await SaveFile(filePath, fileStream);
            }
            message.Participant = sender;
            message.Conversation = conversation;
            var addMessage = await _messageRepository.InsertAsync(message);
            return _mapper.Map<MessageDto>(addMessage);
        }


        private static async Task SaveFile(string filePath, Stream stream)
        {
            using var fs = new FileStream(filePath, FileMode.Create);
            await stream.CopyToAsync(fs);
        }


        public async Task<IActionResult> Download(Guid id)
        {

            var message = await _messageRepository.FirstOrDefaultAsync(x => x.Id == id);
            if (message == null)
                throw new UserFriendlyException("message not found");

            var path = Path.Combine(
                           Directory.GetCurrentDirectory(),
                           "App_Data/Files", message.MediaPath);

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(path), Path.GetFileName(path));

        }


        private static string GetContentType(string path)
        {
            var types = GetMimeTypes();
            var ext = Path.GetExtension(path).ToLowerInvariant();
            return types[ext];
        }

        private static Dictionary<string, string> GetMimeTypes()
        {
            return new Dictionary<string, string>
            {
                {".txt", "text/plain"},
                {".pdf", "application/pdf"},
                {".doc", "application/vnd.ms-word"},
                {".docx", "application/vnd.ms-word"},
                {".xls", "application/vnd.ms-excel"},
                {".png", "image/png"},
                {".jpg", "image/jpeg"},
                {".jpeg", "image/jpeg"},
                {".gif", "image/gif"},
                {".csv", "text/csv"}
            };
        }


        public async Task<List<ConversationMessagesDto>> GetConversationMessages()
        {
            var messages = _conversationRepository.GetAll().Select(n => new ConversationMessagesDto()
            {
                ConversationId = n.Id,
                ConversationType = n.ConversationType,
                Messages = _messageRepository.GetAll().Where(p => p.Conversation.Id == n.Id).Select(y => new MessagesHistoryDto()
                {
                    MessageId = y.Id,
                    ParticipantId = y.Participant.Id,
                    SenderName = y.Participant.Username,
                    Text = y.Text,
                    MediaPath = y.MediaPath,
                    Time = y.CreationTime.ToShortTimeString(),
                    Recipients = _conversationParticipantsRepository.GetAll().Where(x => x.Conversation.Id == n.Id).Select(m => new RecipientsDto()
                    {
                        RecipientName = m.Participant.Username,
                        PhoneNumber = m.Participant.PhoneNumber
                    }).ToList()
                }).ToList()
            });
            return _mapper.Map<List<ConversationMessagesDto>>(messages);
        }


  
    }
}
