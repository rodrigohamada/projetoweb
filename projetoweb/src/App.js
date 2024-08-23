import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Slider from "./components/Slider";
import IconSection from "./components/IconSection";
import Footer from "./components/Footer";
import Sobre from "./pages/Sobre";
import Produtos from "./pages/Produtos";
import CadastroPedidos from "./pages/CadastroPedidos";
import Login from "./components/Login";
import CadastroProdutos from "./pages/CadastroProdutos"; // Importa a página de CadastroProdutos
import "./styles/styles.css";
import "./styles/products.css";
import "./styles/cadastro_pedidos.css";
import "./styles/login.css";

function App() {
  return (
    <Router>
      <div className="app-container"> {/* Envolve o layout em um contêiner principal */}
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
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/cadastro_pedidos" element={<CadastroPedidos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro_produtos" element={<CadastroProdutos />} /> {/* Rota para CadastroProdutos */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
