using Microsoft.EntityFrameworkCore;

namespace TodoWebApi.Models;

public class TestContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Data Source=EREN\\SQLEXPRESS;Initial Catalog=TodoDb;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
    }

    public DbSet<TodosTable> TodosTables { get; set; }
}
