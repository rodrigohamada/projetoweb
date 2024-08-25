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

  return (
    <header>
      <Link to="/"><img src={logo} alt="Logo Cooperativa Orgânica" className="logo" /></Link>
      <nav>
        <ul className={`menu ${isMobileMenuOpen ? "open" : ""}`}> {/* Aplica a classe "open" se o menu móvel estiver aberto */}
          <li><Link to="/" id="home-link">Home</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><Link to="/produtos">Produtos</Link></li>
          <li><Link to="/cadastro_pedidos" id="pedidos-link">Pedidos</Link></li>
          {user ? (
            <>
              <li><Link to="/cadastro_produtos" id="cadastro-produtos-link">Cadastro de Produtos</Link></li>
              <button id="logout-button" onClick={handleLogout}>Logout</button>
              <span id="user-email">{user.email}</span>
            </>
          ) : (
            <li><Link to="/login" id="login-link">Login</Link></li>
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
      </nav>
    </header>
  );
};

export default Header;
