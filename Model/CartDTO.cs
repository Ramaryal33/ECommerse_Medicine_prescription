namespace ECommerce_Medicine.Model;

public class CartDTO
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string MedicineId { get; set; }
    public int UnitPrice { get; set; }
    public int Discount { get; set; }
    public int Quantity { get; set; }
}
