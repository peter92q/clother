public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Price { get; set; }
    public string Description {get; set;}
    public string Brand {get; set;}
    public string Type {get; set;}
    public string Mainpic {get; set;}
    public List<Picture> Pictures {get; set;} = new();
    public List<Size> Sizes { get; set; } = new();
}

public class Size
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; }
}

public class Picture
{
    public int Id { get; set; }
    public string Url { get; set; }
    public int ProductId {get; set;}
    public Product Product { get; set; }
}