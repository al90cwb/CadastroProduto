//Minimal API em C#
//Testar Api 
// - Rest Client - Extensão do VS code
// - PostMAn
// - Insomnia

//EndPois - Funcionalidades
//Requisição - URL E METODO /VERBO HTTP
//Resposta – Dados (json-xml) e código HTTP de Status  
//GET: / 

using System.Security.Cryptography;
using API.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();//adicionando o serviço de banco dados na aplicação

builder.Services.AddCors(
    options => 
        options.AddPolicy("Acesso Total",configs=>configs
                .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod() )
);

var app = builder.Build();




//Endpoint -  Funcionalidades
//Requisição - URL e método / verbo http
app.MapGet("/", () => "API de Produtos");

//=================================CATEGORIA

//GET: /api/categoria/listar
app.MapGet("/api/categoria/listar", ([FromServices] AppDataContext dataBasse) =>
{
    if (dataBasse.Categorias.Any()) 
    {
        return Results.Ok(dataBasse.Categorias.ToList());
    }
    return Results.NotFound();
});

//PUT: /api/categoria/cadastrar
app.MapPut("/api/categoria/cadastrar", ([FromBody] Categoria categoria,[FromServices] AppDataContext dataBasse) => 
{
    dataBasse.Categorias.Add(categoria);
    dataBasse.SaveChanges();

    return Results.Created("",categoria);
});

//DELETE: /api/categoria/remover
app.MapDelete("/api/categoria/remover", ([FromBody] Categoria categoria, [FromServices] AppDataContext dataBasse) =>
{
    // Corrigindo a busca do produto pelo ID
    var categoria_busca = dataBasse.Categorias.FirstOrDefault(p => p.Id == categoria.Id);
    
    if (categoria_busca == null)
    {
        return Results.NotFound();
    }

    dataBasse.Categorias.Remove(categoria_busca);
    dataBasse.SaveChanges();
    return Results.Ok();
});



//=================================PRODUTO

//GET: /api/produto/listar
app.MapGet("/api/produto/listar", ([FromServices] AppDataContext dataBasse) =>
{
    if (dataBasse.Produtos.Any()) 
    {
        return Results.Ok(dataBasse.Produtos.ToList());
    }
    return Results.NotFound();
});


//PUT: /api/produto/cadastrar
app.MapPut("/api/produto/cadastrar", ([FromBody] Produto produto,[FromServices] AppDataContext dataBasse) => 
{
    Categoria? categaria = dataBasse.Categorias.Find(produto.CategoriaId);

    if (categaria is null)
    {
        return Results.NotFound();
    }

    dataBasse.Produtos.Add(produto);
    dataBasse.SaveChanges();
    return Results.Created("",produto);
});


//POST: /api/produto/buscar
app.MapPost("/api/produto/buscar", ([FromBody] Produto produto,[FromServices] AppDataContext dataBasse) => 
{

    Produto? produtobusca = dataBasse.Produtos.Find(produto.Id);
    //buscar por qualquer outro campo
    
    if(produtobusca ==null){
        return Results.NotFound();    
    }
    return Results.Ok(produtobusca);
});

//DELETE: /api/produto/remover
app.MapDelete("/api/produto/remover", ([FromBody] Produto produto, [FromServices] AppDataContext dataBasse) =>
{
    // Corrigindo a busca do produto pelo ID
    var produto_busca = dataBasse.Produtos.FirstOrDefault(p => p.Id == produto.Id);
    
    if (produto_busca == null)
    {
        return Results.NotFound();
    }

    dataBasse.Produtos.Remove(produto_busca);
    dataBasse.SaveChanges();
    return Results.Ok();
});

// PUT: /api/produto/alterar
app.MapPut("/api/produto/alterar", ([FromBody] Produto produto, [FromServices] AppDataContext dataBasse) =>
{
    // Busca o produto pelo ID corretamente
    var produto_busca = dataBasse.Produtos.FirstOrDefault(p => p.Id == produto.Id);

    if (produto_busca != null)
    {
        // Atualiza os dados do produto encontrado
        produto_busca.Nome = produto.Nome;
        produto_busca.Valor = produto.Valor;
        produto_busca.Quantidade = produto.Quantidade;

        dataBasse.Produtos.Update(produto_busca);
        dataBasse.SaveChanges();

        return Results.Ok(produto_busca);
    }

    return Results.NotFound();
});

app.UseCors("Acesso Total");
app.Run();
