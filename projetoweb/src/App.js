import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Slider from "./components/Slider";
import IconSection from "./components/IconSection";
import Footer from "./components/Footer";
import Sobre from "./pages/Sobre";
import Produtos from "./pages/Produtos";
import CadastroPedidos from "./pages/CadastroPedidos";
import Login from "./components/Login"; // Importa a página de Login
import "./styles/styles.css";
import "./styles/products.css"; 
import "./styles/cadastro_pedidos.css"; 
import "./styles/login.css"; // Importa os estilos específicos da página de Login

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
            <Route path="/sobre" element={<Sobre />} /> {/* Rota para a página Sobre */}
            <Route path="/produtos" element={<Produtos />} /> {/* Rota para a página Produtos */}
            <Route path="/cadastro_pedidos" element={<CadastroPedidos />} /> {/* Rota para a página CadastroPedidos */}
            <Route path="/login" element={<Login />} /> {/* Rota para a página Login */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
