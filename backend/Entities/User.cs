using Microsoft.AspNetCore.Identity;

public class User : IdentityUser
{
    public List<Order> Orders { get; set; } = new();
}
