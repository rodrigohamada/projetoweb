import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Slider from "./components/Slider";
import IconSection from "./components/IconSection";
import Footer from "./components/Footer";
import Sobre from "./pages/Sobre";
import Produtos from "./pages/Produtos"; // Importa a página Produtos
import CadastroPedidos from "./pages/CadastroPedidos"; // Importa a página CadastroPedidos
import "./styles/styles.css";
import "./styles/products.css"; // Importa os estilos específicos da página de Produtos
import "./styles/cadastro_pedidos.css"; // Importa os estilos específicos da página de CadastroPedidos

function App() {
  return (
    <Router>
      <Header />
      <main id="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Slider />
                <IconSection />
              </>
            }
          />
          <Route path="/sobre" element={<Sobre />} /> {/* Rota para a página Sobre */}
          <Route path="/produtos" element={<Produtos />} /> {/* Rota para a página Produtos */}
          <Route path="/cadastro_pedidos" element={<CadastroPedidos />} /> {/* Rota para a página CadastroPedidos */}
          {/* Outras rotas podem ser adicionadas futuramente */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
