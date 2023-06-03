using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using AutoMapper;
using ChatApp.Domains;
using ChatApp.Services.Participants.Dto;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace ChatApp.Services.Participants
{
    public class ParticipantAppService: ControllerBase, IApplicationService
    {
        private readonly IRepository<Participant, Guid> _participantRepository;
        private readonly IMapper _mapper;

        public ParticipantAppService(IMapper mapper, IRepository<Participant, Guid> participantRepository)
        {
            _participantRepository = participantRepository;
            _mapper = mapper;
        }

        [Consumes("multipart/form-data")]
        /// Creating participant
        public async Task<ParticipantDto> CreateAsync([FromForm] ParticipantDto input)
        {
            var phoneNumber = await _participantRepository.GetAll().FirstOrDefaultAsync(n => n.PhoneNumber == input.PhoneNumber);
            if (phoneNumber != null) throw new UserFriendlyException("Phone Number already exists.");
            var participant = _mapper.Map<Participant>(input);
            if (input.Avatar != null)
            {
                participant.AvatarFilename = input.Avatar.FileName;
                string BASE_FILE_PATH = "App_Data/Files";
                var filePath = $"{ BASE_FILE_PATH }/{ input.Avatar.FileName}";
                using var fileStream = input.Avatar.OpenReadStream();
                await SaveFile(filePath, fileStream);
            }
            var addParticipant = await _participantRepository.InsertAsync(participant);
            return _mapper.Map<ParticipantDto>(addParticipant);
        }

        private async Task SaveFile(string filePath, Stream stream)
        {
            using var fs = new FileStream(filePath, FileMode.Create);
            await stream.CopyToAsync(fs);
        }

        [Consumes("multipart/form-data")]
        public async Task<ChangeBackgroundDto> ChangeBackground([FromForm] ChangeBackgroundDto input, string phoneNumber)
        {
            var participant = await _participantRepository.GetAll().FirstOrDefaultAsync(n => n.PhoneNumber == phoneNumber);
            if (participant == null) throw new UserFriendlyException("Participant does not exist");
            var background = _mapper.Map(input,participant);
            background.ChatbackgroundPath = input.ChatBackground.FileName;
            string BASE_FILE_PATH = "App_Data/Files"; 
            var filePath = $"{ BASE_FILE_PATH }/{ input.ChatBackground.FileName}";
            using (var fileStream = input.ChatBackground.OpenReadStream())
            {
                await SaveFile(filePath, fileStream);
            }
            var addBackground = await _participantRepository.UpdateAsync(background);
            return _mapper.Map<ChangeBackgroundDto>(addBackground);

        }

        public async Task<IActionResult> DownloadAvatar(string phoneNumber)
        {

            var participant = await _participantRepository.FirstOrDefaultAsync(x => x.PhoneNumber == phoneNumber);
            if (participant == null)
                throw new UserFriendlyException("participant was not found.");
            var path = Path.Combine(
                           Directory.GetCurrentDirectory(),
                           "App_Data/Files", participant.AvatarFilename);
            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(path), Path.GetFileName(path));

        }

        public async Task<IActionResult> DownloadChatBackground(string phoneNumber)
        {

            var participant = await _participantRepository.FirstOrDefaultAsync(x => x.PhoneNumber == phoneNumber);
            if (participant == null)
                throw new UserFriendlyException("participant was not found.");

            var path = Path.Combine(
                           Directory.GetCurrentDirectory(),
                           "App_Data/Files", participant.ChatbackgroundPath);

            var memory = new MemoryStream();
            using (var stream = new FileStream(path, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }
            memory.Position = 0;
            return File(memory, GetContentType(path), Path.GetFileName(path));
        }

        private string GetContentType(string path)
        {
        var types = GetMimeTypes();
        var ext = Path.GetExtension(path).ToLowerInvariant();
        return types[ext];
        }

    private Dictionary<string, string> GetMimeTypes()
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

        public async Task<List<ParticipantDto>> GetBySearch(string term)
        {
            var searchResult = _participantRepository.GetAll().Where(e => e.Username.ToLower().Contains(term.ToLower())
           || e.PhoneNumber.Contains(term.ToLower()));
            return _mapper.Map<List<ParticipantDto>>(searchResult);
        }


        // login 
        public async Task<ParticipantDto> LoginAsync (LoginDto input)
        {
            var participant = await _participantRepository.GetAll().FirstOrDefaultAsync(n => n.PhoneNumber == input.PhoneNumber && n.Password == input.Password);
            if (participant == null) throw new UserFriendlyException("Invalid login credentials");
            return _mapper.Map<ParticipantDto>(participant);   
        }

        /// Deleting Entries
        public async Task DeleteAsync(Guid id)
        {
            await _participantRepository.DeleteAsync(id);
        }

        /// Getting all entities
        public async Task<List<ParticipantDto>> GetAllAsync()
        {
            var entries = await _participantRepository.GetAll().ToListAsync();
            return _mapper.Map<List<ParticipantDto>>(entries);
        }

        /// Filtering entity
        public async Task<List<ParticipantDto>> GetParticipantsAsync(string phoneNumber, string username, Guid id)
        {
            var entityFilter = await _participantRepository.GetAll()
                                                       .Where(x => x.PhoneNumber == phoneNumber
                                                       || x.Username == username
                                                       || x.Id == id)
                                                       .ToListAsync();
            return _mapper.Map<List<ParticipantDto>>(entityFilter);
        }

        public async Task<ParticipantDto> UpdatePhoneNumberAsync(ChangePhoneNumberDto input)
        {
            var entity = await _participantRepository.FirstOrDefaultAsync(n => n.PhoneNumber == input.OldPhoneNumber);
            if (entity == null) throw new UserFriendlyException("Phone number not found.");
            var participant = _mapper.Map(input, entity);
            participant.PhoneNumber = input.NewPhoneNumber;
            await _participantRepository.UpdateAsync(participant);
            return _mapper.Map<ParticipantDto>(participant);
        }

        public async Task<ParticipantDto> UpdateUsernameAsync(ChangeUsernameDto input, string phoneNumber)
        {
            var entity = await _participantRepository.FirstOrDefaultAsync(n => n.PhoneNumber == phoneNumber);
            if (entity == null) throw new UserFriendlyException("Phone number not found.");
            var participant = _mapper.Map(input, entity);
            participant.Username = input.Username;
            await _participantRepository.UpdateAsync(participant);
            return _mapper.Map<ParticipantDto>(participant);
        }

        public async Task<ParticipantDto> UpdateAboutMeAsync(ChangeAboutMeDto input, string phoneNumber)
        {
            var entity = await _participantRepository.FirstOrDefaultAsync(n => n.PhoneNumber == phoneNumber);
            if (entity == null) throw new UserFriendlyException("Phone number not found.");
            var participant = _mapper.Map(input, entity);
            participant.AboutMe = input.AboutMe;
            await _participantRepository.UpdateAsync(participant);
            return _mapper.Map<ParticipantDto>(participant);
        }

        public async Task<ParticipantDto> UpdateStatus(UpdateStatusDto input, string phoneNumber)
        {
            var entity = await _participantRepository.FirstOrDefaultAsync(n => n.PhoneNumber == phoneNumber);
            if (entity == null) throw new UserFriendlyException("Phone number not found.");
            var participant = _mapper.Map(input, entity);
            participant.Status = input.Status;
            await _participantRepository.UpdateAsync(participant);
            return _mapper.Map<ParticipantDto>(participant);
        }

        [Consumes("multipart/form-data")]
        public async Task<ParticipantDto> UpdateAvatarAsync([FromForm] UpdateFileDto input, string phoneNumber)
        {
            var entity = await _participantRepository.FirstOrDefaultAsync(n => n.PhoneNumber == phoneNumber);
            if (entity == null) throw new UserFriendlyException("Phone number not found.");
            var participant = _mapper.Map(input, entity);
            participant.AvatarFilename = input.Avatar.FileName;
            participant.AvatarURL = null;
            string BASE_FILE_PATH = "App_Data/Files";
            var filePath = $"{ BASE_FILE_PATH }/{ input.Avatar.FileName}";
            using (var fileStream = input.Avatar.OpenReadStream())
            {
                await SaveFile(filePath, fileStream);
            }
            await _participantRepository.UpdateAsync(participant);
            return _mapper.Map<ParticipantDto>(participant);
        }

    }
}
