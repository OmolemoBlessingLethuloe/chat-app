using Microsoft.EntityFrameworkCore.Migrations;

namespace ChatApp.Migrations
{
    public partial class tableFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Participants_SenderId",
                table: "Messages");

            migrationBuilder.RenameColumn(
                name: "SenderId",
                table: "Messages",
                newName: "ParticipantId");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_SenderId",
                table: "Messages",
                newName: "IX_Messages_ParticipantId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Participants_ParticipantId",
                table: "Messages",
                column: "ParticipantId",
                principalTable: "Participants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Messages_Participants_ParticipantId",
                table: "Messages");

            migrationBuilder.RenameColumn(
                name: "ParticipantId",
                table: "Messages",
                newName: "SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_Messages_ParticipantId",
                table: "Messages",
                newName: "IX_Messages_SenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Messages_Participants_SenderId",
                table: "Messages",
                column: "SenderId",
                principalTable: "Participants",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
