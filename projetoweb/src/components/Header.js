import React, { useEffect } from "react";
import { Link } from "react-router-dom"; // Importe o Link do react-router-dom
import MobileMenuIcon from "./MobileMenuIcon";
import logo from "../assets/images/logo.png";

const Header = () => {
  useEffect(() => {
    document.title = "Organic - Cestas Orgânicas";
    const link = document.querySelector("link[rel='icon']");
    if (link) {
      link.href = require("../assets/images/folha.png");
    }
  }, []);

  return (
    <header>
      <Link to="/"><img src={logo} alt="Logo Cooperativa Orgânica" className="logo" /></Link>
      <nav>
        <ul className="menu">
          <li><Link to="/" id="home-link">Home</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><Link to="/produtos">Produtos</Link></li>
          <li><Link to="/cadastro_pedidos" id="pedidos-link">Pedidos</Link></li>
          <li><Link to="/cadastro_produtos" id="cadastro-produtos-link">Cadastro de Produtos</Link></li>
          <li><Link to="/login" id="login-link">Login</Link></li>
        </ul>
        <MobileMenuIcon />
      </nav>
      <button id="logout-button" style={{ display: "none" }}>Logout</button>
      <span id="user-email" style={{ display: "none" }}></span>
    </header>
  );
};

export default Header;
