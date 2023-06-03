using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using ChatApp.Authorization.Roles;
using ChatApp.Authorization.Users;
using ChatApp.MultiTenancy;
using ChatApp.Domains;

namespace ChatApp.EntityFrameworkCore
{
    public class ChatAppDbContext : AbpZeroDbContext<Tenant, Role, User, ChatAppDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Participant> Participants { get; set; }
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<ConversationParticipant> ConversationParticipants { get; set; }
        public DbSet<Message> Messages { get; set; }


        public ChatAppDbContext(DbContextOptions<ChatAppDbContext> options)
            : base(options)
        {
        }
    }
}
