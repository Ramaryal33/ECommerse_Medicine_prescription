using ECommerce_Medicine.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class Order
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [ForeignKey("User")]
    public int UserId { get; set; } // ✅ FIXED

    [Required]
    public int OrderNumber { get; set; }

    [Required]
    public int OrderTotal { get; set; }

    [Required]
    public string OrderStatus { get; set; } // e.g. Pending, Shipped, Completed

    public DateTime OrderDate { get; set; }

   

    public virtual User User { get; set; }
}
