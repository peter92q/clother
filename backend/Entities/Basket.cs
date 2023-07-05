using System.ComponentModel.DataAnnotations.Schema;

    public class Basket {
    public int Id {get; set;}
    public string BuyerId {get; set;}
    public List<BasketItem> Items {get; set;}= new();

    public void AddItem(Product product, int quantity, string size)
    {
    var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id && item.Size == size);

    if (existingItem != null)
    {
        existingItem.Quantity += quantity;  
    }
    else
    {
        var newItem = new BasketItem { Product = product, Quantity = quantity, Size = size };
        Items.Add(newItem);
    }
    }

    public void RemoveItem(int productId, int quantity, string size)
    {
    var item = Items.FirstOrDefault(item => item.ProductId == productId && item.Size == size);
    if(item == null) return;

    item.Quantity -= quantity;

    if(item.Quantity <= 0) Items.Remove(item);
    }

    public void UpdateItem(int itemId, int quantity)
    {
    var item = Items.FirstOrDefault(i => i.Id == itemId);

    if (item != null)
    {
        item.Quantity = quantity;
    }
    }
    }

    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id {get; set;}
        public int Quantity {get; set;}
        public string Size {get; set;}
        public int ProductId {get; set;}
        public Product Product {get; set;}
        public int BasketId {get; set;}
        public Basket Basket {get; set;}
    }