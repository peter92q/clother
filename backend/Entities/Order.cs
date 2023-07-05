using System.ComponentModel.DataAnnotations.Schema;

[Table("Orders")]
public class Order
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public DateTime CreatedAt { get; set; }
    public User User { get; set; } 
    public string UserName { get; set; }
    public int AddressId { get; set; }
    public Address Address { get; set; }
    
    public List<OrderItem> Items { get; set; } = new();

    public decimal TotalAmount
    {
        get { return Items.Sum(item => item.Quantity * item.Price); }
    }
}

public class OrderItem
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public int ProductId { get; set; }
    public string Name { get; set; }
    public string Mainpic { get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; }
    public string Size {get; set;}
}

