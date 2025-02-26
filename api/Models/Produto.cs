using System;

namespace API.Models;

public class Produto
{
    //C# - Contrutor
    public Produto( )
    {
        Id = Guid.NewGuid().ToString();//gerar identificadores globais únicos Metodo GUID
        CriadoEm = DateTime.Now;//usar data do sistema atual
    }
    //C# - Atributos/Propriedades - Caracteristicas Inicia maiuscula
    
    public string? Id { get; set; }
    public string? Nome {get;set;}
    public double Valor {get;set;}
    public int Quantidade { get; set; }
    public DateTime CriadoEm { get; set; }
    public Categoria Categoria  { get; set; } // isso é obrigatorio
    public int CategoriaId  { get; set; }//importante ter o id tambem

}
