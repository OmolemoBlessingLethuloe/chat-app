using System.ComponentModel.DataAnnotations;

namespace ChatApp.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}