namespace ECommerce_Medicine.Entities;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Cart
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    public string Medicine { get; set; }

    [Required]
    public int UnitPrice { get; set; } = 10;

    [Required]
    public int Discount { get; set; } = 0;

    [Required]
    public int Quantity { get; set; } = 1000;

    public int TotalPrice => UnitPrice * Quantity * (100 - Discount) / 100;

    public virtual User User { get; set; }
}
