namespace ECommerse_Medicine.Model
{
    public class RegisterDto
    {
        public string FirstName { get; set; }      // Required
        public string LastName { get; set; }       // Required
        public string Email { get; set; }          // Required, [EmailAddress]
        public string Password { get; set; }
    }
}
