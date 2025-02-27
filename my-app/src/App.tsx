import ProdutoCadastrar from "./components/pages/produto/ProdutoCadastrar";
import ProdutoListar from "./components/pages/produto/ProdutoListar";


function App() {
  return (
    <div id='app'>
      <h1> Produtos </h1>
      <ProdutoListar />
      <ProdutoCadastrar/>
     
    </div>
  );
}

export default App;
