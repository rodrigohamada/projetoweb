import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { auth } from "../store/env";
import logo from "../assets/images/logo.png";
import menuIcon from "../assets/images/MobileMenuIcon.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // Estado para controlar o menu móvel

  useEffect(() => {
    document.title = "Organic - Cestas Orgânicas";
    const link = document.querySelector("link[rel='icon']");
    if (link) {
      link.href = require("../assets/images/folha.png");
    }

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    window.location.href = '/';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen); // Alterna o estado do menu móvel
  };

  // Função para fechar o menu móvel automaticamente ao clicar em qualquer link
  const handleLinkClick = () => {
    if (isMobileMenuOpen) {
      setMobileMenuOpen(false); // Fecha o menu móvel
    }
  };

  return (
    <header>
      <Link to="/"><img src={logo} alt="Logo Cooperativa Orgânica" className="logo" /></Link>
      <nav>
        <ul className={`menu ${isMobileMenuOpen ? "open" : ""}`}> {/* Aplica a classe "open" se o menu móvel estiver aberto */}
          <li><Link to="/" onClick={handleLinkClick} id="home-link">Home</Link></li>
          <li><Link to="/sobre" onClick={handleLinkClick}>Sobre</Link></li>
          <li><Link to="/produtos" onClick={handleLinkClick}>Produtos</Link></li>
          <li><Link to="/cadastro_pedidos" onClick={handleLinkClick} id="pedidos-link">Pedidos</Link></li>
          {user && (
            <li><Link to="/cadastro_produtos" onClick={handleLinkClick} id="cadastro-produtos-link">Cadastro de Produtos</Link></li>
          )}
          {!user && (
            <li><Link to="/login" onClick={handleLinkClick} id="login-link">Login</Link></li>
          )}
        </ul>
        <div className="mobile-menu-controls">
          {isMobileMenuOpen && (
            <button className="close-menu" onClick={toggleMobileMenu}>x</button>
          )}
          <img
            src={menuIcon}
            alt="Menu"
            className="mobile-menu-icon"
            onClick={toggleMobileMenu}
          />
        </div>
        {user && (
          <>
            <button id="logout-button" onClick={handleLogout}>Logout</button>
            <span id="user-email">{user.email}</span>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
