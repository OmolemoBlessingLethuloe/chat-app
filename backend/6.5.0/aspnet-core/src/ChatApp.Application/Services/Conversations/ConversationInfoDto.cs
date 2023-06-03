using ChatApp.Domains.RefLists;
using System;

namespace ChatApp.Services.Conversations
{
    public class ConversationInfoDto
    {
        public string GroupName { get; set; }
        public string Username { get; set; }
        public RefListConversationType IsPrivate { get; set; }
        public string DisplayText { get; set; }
        public DateTime? LastTextTime { get; set; }
        public string GroupAvatarURL { get; set; }
    }
}