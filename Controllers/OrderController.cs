using ECommerce_Medicine.Data;
using ECommerce_Medicine.Entities;
using ECommerce_Medicine.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ECommerce_Medicine.Controllers
{
    [ApiController]
    [Route("api/Order")]
    public class OrderController : ControllerBase
    {
        private readonly ECommerceDbContext _context;

        public OrderController(ECommerceDbContext context)
        {
            _context = context;
        }

        // GET: api/order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetAllOrders()
        {
            var orders = await _context.Orders
                .Select(o => new OrderDTO
                {
                    Id = o.Id,
                    UserId = o.UserId,
                    OrderNumber = o.OrderNumber,
                    OrderTotal = o.OrderTotal,
                    OrderStatus = o.OrderStatus,
                    OrderDate = o.OrderDate
                })
                .ToListAsync();

            return Ok(orders);
        }

        // GET: api/order/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO>> GetOrderById(int id)
        {
            var order = await _context.Orders
                .Where(o => o.Id == id)
                .Select(o => new OrderDTO
                {
                    Id = o.Id,
                    UserId = o.UserId,
                    OrderNumber = o.OrderNumber,
                    OrderTotal = o.OrderTotal,
                    OrderStatus = o.OrderStatus,
                    OrderDate = o.OrderDate
                })
                .FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // ✅ GET: api/order/user/{userId} – Get all orders for a specific user
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrdersByUserId(int userId)
        {
            var orders = await _context.Orders
                .Where(o => o.UserId == userId)
                .Select(o => new OrderDTO
                {
                    Id = o.Id,
                    UserId = o.UserId,
                    OrderNumber = o.OrderNumber,
                    OrderTotal = o.OrderTotal,
                    OrderStatus = o.OrderStatus,
                    OrderDate = o.OrderDate
                })
                .ToListAsync();

            return Ok(orders);
        }

        // POST: api/order
        [HttpPost]
        public async Task<ActionResult<OrderDTO>> CreateOrder(OrderDTO orderDTO)
        {
            var order = new Order
            {
                UserId = orderDTO.UserId,
                OrderNumber = orderDTO.OrderNumber,
                OrderTotal = orderDTO.OrderTotal,
                OrderStatus = orderDTO.OrderStatus,
                OrderDate = orderDTO.OrderDate
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            orderDTO.Id = order.Id;

            return CreatedAtAction(nameof(GetOrderById), new { id = order.Id }, orderDTO);
        }

        // PUT: api/order/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, OrderDTO orderDTO)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            order.OrderStatus = orderDTO.OrderStatus;
            order.OrderTotal = orderDTO.OrderTotal;

            _context.Entry(order).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/order/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound(); 
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
