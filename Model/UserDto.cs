namespace ECommerce_Medicine.Model
{
    public class UserDto
    {
        public int Id { get; set; }                     // Matches IdentityUser<int>.Id
        public string FirstName { get; set; }           // Required
        public string LastName { get; set; }            // Required

        public string Email { get; set; }               // Required
        // NOTE: Don't expose Password in DTOs unless needed for login/register
        // public string Password { get; set; }

        public int Phone { get; set; }                  // Optional
        public DateTime DOB { get; set; }               // Optional
        public string? Address { get; set; }            // Optional

        public int Fund { get; set; } = 0;              // Default value
        public string Type { get; set; } = "User";      // Default = "User"
        public string Role { get; set; } = "User";      // Optional: role-based logic
        public string Status { get; set; } = "Active";  // Default = "Active"
    }
}
