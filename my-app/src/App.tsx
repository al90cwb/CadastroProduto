
import { BrowserRouter , Link, Route, Routes} from "react-router-dom";
import ProdutoCadastrar from "./components/pages/produto/ProdutoCadastrar";
import ProdutoListar from "./components/pages/produto/ProdutoListar";
import ConsultarCep from "./components/pages/exemplos/ConsultarCep";

//nav>ul>li*4>Link
//contrl alt para baixo gera multi crusosres

function App() {
  return (
    <div id='app'>


      
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pages/produtos/listar">Listar Produtos</Link>
            </li>
            <li>
              <Link to="/pages/produtos/cadastrar">Cadastrar Produto</Link>
            </li>
            <li>
              <Link to="/pages/endereco/consultar">Consultar CEP</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<ProdutoListar/>}/>
          <Route path="/pages/produtos/listar" element={<ProdutoListar/>}/>
          <Route path="/pages/produtos/cadastrar" element={<ProdutoCadastrar/>}/>
          <Route path="/pages/endereco/consultar"element={<ConsultarCep/>}/>
          {/*<Route path="*"element={<ConsultarCep/>}/>  O ASTERISCO INDICA PAGINA NÃO ENCONTRADA */}

        </Routes>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
