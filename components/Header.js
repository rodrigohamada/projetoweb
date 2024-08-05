import React from 'react';
import './styles.css';

const Header = () => {
  return (
    <header>
      <a href="index.html">
        <img src="./images/logo.png" alt="Logo Cooperativa Orgânica" className="logo" />
      </a>
      <nav>
        <ul className="menu">
          <li><a href="index.html" id="home-link">Home</a></li>
          <li><a href="sobre.html">Sobre</a></li>
          <li><a href="products.html">Produtos</a></li>
          <li><a href="cadastro_pedidos.html" id="login-link">Pedidos</a></li>
          <li><a href="cadastro_produtos.html" id="login-link">Cadastro de Produtos</a></li>
          <li><a href="login.html" id="login-link">Login</a></li>
        </ul>
        <div className="mobile-menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
