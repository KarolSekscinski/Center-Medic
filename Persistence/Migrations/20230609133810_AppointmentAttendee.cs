using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AppointmentAttendee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DoctorId",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "PatiendId",
                table: "Appointments");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Pesel",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sex",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Specialization",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Surname",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AppointmentAttendees",
                columns: table => new
                {
                    AppUserId = table.Column<string>(type: "TEXT", nullable: false),
                    AppointmentId = table.Column<Guid>(type: "TEXT", nullable: false),
                    IsDoctor = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentAttendees", x => new { x.AppointmentId, x.AppUserId });
                    table.ForeignKey(
                        name: "FK_AppointmentAttendees_Appointments_AppointmentId",
                        column: x => x.AppointmentId,
                        principalTable: "Appointments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppointmentAttendees_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentAttendees_AppUserId",
                table: "AppointmentAttendees",
                column: "AppUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppointmentAttendees");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Pesel",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Sex",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Specialization",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Surname",
                table: "AspNetUsers");

            migrationBuilder.AddColumn<int>(
                name: "DoctorId",
                table: "Appointments",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PatiendId",
                table: "Appointments",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }
    }
}
