namespace YourProject.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterUserAsync(string username, string password);
        Task<bool> LoginUserAsync(string username, string password);
        Task LogoutUserAsync();
        Task<bool> ResetPasswordAsync(string email);
        Task<bool> IsAuthenticatedAsync();
    }
}
