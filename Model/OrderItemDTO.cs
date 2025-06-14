using ECommerce_Medicine.Entities;

public class OrderItemDTO
{
    public int Id { get; set; }
    public int UserId { get; set; }       // 🆕 Add this
    public int OrderId { get; set; } = 0; // 0 means 'not placed yet'
    public int MedicineId { get; set; }
    public Medicine Medicine { get; set; }
    public decimal UnitPrice { get; set; }
    public double Discount { get; set; }
    public int Quantity { get; set; }
}
