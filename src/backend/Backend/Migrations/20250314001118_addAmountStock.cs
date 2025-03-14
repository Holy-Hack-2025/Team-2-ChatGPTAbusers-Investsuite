using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class addAmountStock : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ApiID",
                table: "Stocks",
                newName: "Token");

            migrationBuilder.AddColumn<int>(
                name: "Amount",
                table: "Stocks",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Stocks");

            migrationBuilder.RenameColumn(
                name: "Token",
                table: "Stocks",
                newName: "ApiID");
        }
    }
}
