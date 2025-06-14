using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace ECommerce_Medicine.Entities
{
    public class User : IdentityUser<int>
    {
        public User()
        {
            Orders = new HashSet<Order>();
            Cart = new HashSet<Cart>();
        }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public int Phone { get; set; }

        [DataType(DataType.Date)]
        public DateTime DOB { get; set; }

        public string? Address { get; set; }

        public int Fund { get; set; } = 0;

        public string Type { get; set; } = "User";

        public string Role { get; set; } = "User";

        public string Status { get; set; } = "Active";

        public virtual ICollection<Order> Orders { get; set; }

        public virtual ICollection<Cart> Cart { get; set; }
    }
}
