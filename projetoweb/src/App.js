import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Slider from "./components/Slider";
import IconSection from "./components/IconSection";
import Footer from "./components/Footer";
import Sobre from "./pages/Sobre";
import Produtos from "./pages/Produtos"; // Importe a página Produtos
import "./styles/styles.css";
import "./styles/products.css"; // Importe os estilos de produtos

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
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
