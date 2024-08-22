import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { auth } from "../store/env";
import MobileMenuIcon from "./MobileMenuIcon";
import logo from "../assets/images/logo.png";

const Header = () => {
  const [user, setUser] = useState(null); // Estado para armazenar o usuário logado

  useEffect(() => {
    document.title = "Organic - Cestas Orgânicas";
    const link = document.querySelector("link[rel='icon']");
    if (link) {
      link.href = require("../assets/images/folha.png");
    }

    // Verifica o estado de autenticação do usuário
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Usuário está logado
      } else {
        setUser(null); // Usuário não está logado
      }
    });

    return () => unsubscribe(); // Limpa o listener de autenticação quando o componente é desmontado
  }, []);

  const handleLogout = () => {
    auth.signOut();
    setUser(null); // Limpa o estado de usuário após logout
    window.location.href = '/'; // Redireciona para a página inicial após o logout
  };

  return (
    <header>
      <Link to="/"><img src={logo} alt="Logo Cooperativa Orgânica" className="logo" /></Link>
      <nav>
        <ul className="menu">
          <li><Link to="/" id="home-link">Home</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><Link to="/produtos">Produtos</Link></li>
          <li><Link to="/cadastro_pedidos" id="pedidos-link">Pedidos</Link></li>
          {user ? ( // Se o usuário estiver logado, esconde o link de login
            <>
              <li><Link to="/cadastro_produtos" id="cadastro-produtos-link">Cadastro de Produtos</Link></li>
              <button id="logout-button" onClick={handleLogout}>Logout</button>
              <span id="user-email">{user.email}</span>
            </>
          ) : (
            <li><Link to="/login" id="login-link">Login</Link></li>
          )}
        </ul>
        <MobileMenuIcon />
      </nav>
    </header>
  );
};

export default Header;
