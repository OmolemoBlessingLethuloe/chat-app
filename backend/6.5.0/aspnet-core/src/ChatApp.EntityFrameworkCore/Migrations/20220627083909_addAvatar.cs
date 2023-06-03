using Microsoft.EntityFrameworkCore.Migrations;

namespace ChatApp.Migrations
{
    public partial class addAvatar : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Avatar",
                table: "Participants",
                newName: "AvatarURL");

            migrationBuilder.AddColumn<string>(
                name: "AvatarFilename",
                table: "Participants",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarFilename",
                table: "Participants");

            migrationBuilder.RenameColumn(
                name: "AvatarURL",
                table: "Participants",
                newName: "Avatar");
        }
    }
}
