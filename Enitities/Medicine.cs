public class Medicine
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Manufacturer { get; set; }
    public int LightPixze { get; set; }
    public int Discount { get; set; }
    public int Quantity { get; set; }
    public DateTime ExpiryDate { get; set; }
    public string? Disease { get; set; }
    public string? Uses { get; set; }
    public string Status { get; set; }
    public string? ImagePath { get; set; }
}
