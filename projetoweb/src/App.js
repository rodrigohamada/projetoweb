import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Slider from "./components/Slider";
import IconSection from "./components/IconSection";
import Footer from "./components/Footer";
import Sobre from "./pages/Sobre"; // Importe a página Sobre
import "./styles/styles.css";

function App() {
  return (
    <Router>
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={
            <>
              <Slider />
              <IconSection />
            </>
          } />
          <Route path="/sobre" element={<Sobre />} /> {/* Adiciona a rota para a página Sobre */}
          {/* Outras rotas podem ser adicionadas aqui */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
