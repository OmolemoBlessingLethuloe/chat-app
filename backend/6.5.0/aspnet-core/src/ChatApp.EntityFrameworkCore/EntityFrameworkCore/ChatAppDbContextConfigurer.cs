using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace ChatApp.EntityFrameworkCore
{
    public static class ChatAppDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<ChatAppDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<ChatAppDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
