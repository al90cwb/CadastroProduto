import { useEffect, useState, useRef } from "react"
import { Produto } from "../../../models/Produto";
import './ProdutoListar.css'

function ProdutoListar(){

    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(()=> {
        listarProdutos();
    }, []);

    const listarProdutos = async()=>{
        fetch("http://localhost:5212/api/produto/listar")
            .then((resposta)=> resposta.json())
            .then((produtos)=> //console.table(produtos);
             setProdutos(produtos) );
            ;
    }

    return(
        <div id="listar_produtos">
        <h1>Lista de Produtos</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#f0f8ff' }}>
            <thead>
                <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Criado em</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nome</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Valor</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantidade</th>
                </tr>
            </thead>
            <tbody>
                {produtos.map(produto => (
                    <tr key={produto.id}>
                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{produto.id}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{produto.criadoEm}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{produto.nome}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{produto.valor}</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{produto.quantidade}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
    
    
}
export default ProdutoListar;