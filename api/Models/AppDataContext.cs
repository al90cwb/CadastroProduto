using System;
using System.Runtime.InteropServices.Marshalling;
using Microsoft.EntityFrameworkCore;

namespace API.Models;

public class AppDataContext : DbContext
{
    public DbSet<Produto> Produtos {get;set;}
    public DbSet<Categoria> Categorias {get;set;}
    

    //para mais de uma tabela reproduzir
    //public DbSet<Outro> Outros {get;set;}

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
       optionsBuilder.UseSqlite("Data Source=EcommerDb.db");//string de conexão
    }

}
