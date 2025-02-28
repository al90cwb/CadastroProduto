import React, { useEffect, useState, useRef } from 'react';
import { Produto } from '../../../models/Produto';
import axios from 'axios';
import { API_BASE_URL } from '../../../config';


function ProdutoCadastrar() {
    
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [categoriaId, setCategoriaId] = useState(0);

    const [categorias, setCategorias] = useState<any[]>([]);//criar a categoria com interface


    //usando axios
    useEffect(()=> {
        axios.get<any[]>("http://localhost:5212/api/categoria/listar")
            .then(resposta => {
                setCategorias(resposta.data);
            })
    }, []);
    
    function enviarProduto(event: any){
        event.preventDefault();//não recarrega a pagina
        //alert("Cliquei no botão"); //cada vez que clica gera aviso
        const produto: Produto ={
            nome : nome,
            valor : Number(valor),
            quantidade :  Number(quantidade),
            categoriaId : Number(categoriaId)
        };

        //AXIOS - Biblioteca de Requisições HTTP facilita



        fetch("http://localhost:5212/api/produto/cadastrar", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto)
        })
            .then((resposta) => resposta.json())
            .then((produto) => {
                console.log(produto);
            })
            .catch((erro) => {
                console.log(produto);
                console.error("Erro ao cadastrar produto:", erro);
            });

            

    }

    return (
        <div className="form-container">
            <h1>Cadastrar Produto</h1>
            <form onSubmit={enviarProduto} id="form-cadatro" >
                <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        onChange={(event: any)=> setNome(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="valor">Valor</label>
                    <input
                        type="number"
                        id="valor"
                        name="valor"
                        onChange={(event: any)=> setValor(event.target.value)}
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="quantidade">Quantidade</label>
                    <input
                        type="number"
                        id="quantidade"
                        name="quantidade"
                        onChange={(event: any)=> setQuantidade(event.target.value)}
                        required
                    />
                </div>


                <select onChange={(event) => setCategoriaId(Number(event.target.value))}>
                    {categorias.map((categoria) => (
                        <option value={categoria.id} key={categoria.id}>
                            {categoria.nome}
                        </option>
                    ))}
                </select>

                <button type="submit">Cadastrar Produto</button>
            </form>
        </div>
    );
}

export default ProdutoCadastrar;
