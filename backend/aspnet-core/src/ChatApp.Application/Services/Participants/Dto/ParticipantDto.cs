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

namespace ChatApp.Services.Participants.Dto
{
    [AutoMap(typeof(Participant))]

    public class ParticipantDto: EntityDto<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public RefListGender Gender { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Username { get; set; }
        public string AboutMe { get; set; }
        public bool Status { get; set; }
        public string AvatarURL { get; set; }
        public IFormFile Avatar { get; set; }
        public string AvatarFilename { get; set; }
        public string ChatbackgroundPath { get; set; }

    }

    [AutoMap(typeof(Participant))]

    public class ChangePhoneNumberDto
    {
        public string OldPhoneNumber { get; set; }
        public string NewPhoneNumber { get; set; }
    }

    [AutoMap(typeof(Participant))]

    public class ChangeUsernameDto
    {
        public string Username { get; set; }
    }

    [AutoMap(typeof(Participant))]

    public class ChangeAboutMeDto
    {
        public string AboutMe { get; set; }
    }

    [AutoMap(typeof(Participant))]

    public class UpdateFileDto
    {
        public IFormFile Avatar { get; set; }
        public string AvatarFilename { get; set; }
    }

    public class LoginDto
    {
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
    }

    [AutoMap(typeof(Participant))]
    public class ChangeBackgroundDto
    {
        public IFormFile ChatBackground { get; set; }
        public string ChatBackgroundPath { get; set; }
    }

    [AutoMap(typeof(Participant))]
    public class UpdateStatusDto
    {
        public bool Status { get; set; }
    }
}
