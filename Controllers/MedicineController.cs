using ECommerce_Medicine.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class MedicineController : ControllerBase
{
    private readonly IWebHostEnvironment _env;
    private readonly ECommerceDbContext _context;

    public MedicineController(ECommerceDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var medicines = await _context.Medicines.ToListAsync();

        return Ok(medicines.Select(m => new
        {
            m.Id,
            m.Name,
            m.Manufacturer,
            m.LightPixze,
            m.Discount,
            m.Quantity,
            m.ExpiryDate,
            m.Disease,
            m.Uses,
            m.Status,
            ImageURL = !string.IsNullOrEmpty(m.ImagePath) ? $"/uploads/{m.ImagePath}" : null
        }));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromForm] MedicineDTO dto)
    {
        string imageName = await SaveImage(dto.Image);

        var medicine = new Medicine
        {
            Name = dto.Name,
            Manufacturer = dto.Manufacturer,
            LightPixze = dto.LightPixze,
            Discount = dto.Discount,
            Quantity = dto.Quantity,
            ExpiryDate = dto.ExpiryDate,
            Disease = dto.Disease,
            Uses = dto.Uses,
            Status = dto.Status,
            ImagePath = imageName
        };

        _context.Medicines.Add(medicine);
        await _context.SaveChangesAsync();

        return Ok(medicine);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromForm] MedicineDTO dto)
    {
        var medicine = await _context.Medicines.FindAsync(id);
        if (medicine == null)
            return NotFound();

        medicine.Name = dto.Name;
        medicine.Manufacturer = dto.Manufacturer;
        medicine.LightPixze = dto.LightPixze;
        medicine.Discount = dto.Discount;
        medicine.Quantity = dto.Quantity;
        medicine.ExpiryDate = dto.ExpiryDate;
        medicine.Disease = dto.Disease;
        medicine.Uses = dto.Uses;
        medicine.Status = dto.Status;

        if (dto.Image != null)
        {
            medicine.ImagePath = await SaveImage(dto.Image);
        }

        await _context.SaveChangesAsync();
        return Ok(medicine);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var medicine = await _context.Medicines.FindAsync(id);
        if (medicine == null)
            return NotFound();

        _context.Medicines.Remove(medicine);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private async Task<string> SaveImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
            return null;

        var uploadsDir = Path.Combine(_env.WebRootPath, "uploads");
        if (!Directory.Exists(uploadsDir))
            Directory.CreateDirectory(uploadsDir);

        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(uploadsDir, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return fileName;
    }
}
