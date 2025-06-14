namespace ECommerce_Medicine.Model;

public class OrderDTO
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int OrderNumber { get; set; }
    public int OrderTotal { get; set; }
    public string OrderStatus { get; set; }
    public DateTime OrderDate { get; set; }
}
