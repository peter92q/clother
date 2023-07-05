public class OrderDetailsDto
{
    public int OrderId { get; set; }
    public string Username { get; set; }
    public string CreatedAt { get; set; }
    public string FullName { get; set; }
    public Address Address { get; set; }
    public List<OrderItemDto> Items { get; set; }
    public decimal TotalAmount { get; set; }
}
