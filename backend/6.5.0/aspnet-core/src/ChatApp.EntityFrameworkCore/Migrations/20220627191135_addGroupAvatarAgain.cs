using Microsoft.EntityFrameworkCore.Migrations;

namespace ChatApp.Migrations
{
    public partial class addGroupAvatarAgain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GroupAvatar",
                table: "Conversations",
                newName: "GroupAvatarURL");

            migrationBuilder.AddColumn<string>(
                name: "AvatarFilename",
                table: "Conversations",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarFilename",
                table: "Conversations");

            migrationBuilder.RenameColumn(
                name: "GroupAvatarURL",
                table: "Conversations",
                newName: "GroupAvatar");
        }
    }
}
