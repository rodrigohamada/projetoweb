import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterPopup from './RegisterPopup';
import '../styles/login.css';

const Login = () => {
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  const toggleRegisterPopup = () => {
    console.log('Popup Status:', !showRegisterPopup); // Log para verificar o estado
    setShowRegisterPopup(!showRegisterPopup);
  };  

  return (
    <div id="main-content">
      <div className="login-container">
        <h2>Login</h2>
        <LoginForm />
        <p className="register-link">
          Ainda não tem uma conta? Cadastre-se{' '}
          <a href="#" onClick={toggleRegisterPopup}>aqui</a>.
        </p>
      </div>
      {showRegisterPopup && (
        <RegisterPopup onClose={toggleRegisterPopup} />
      )}
    </div>
  );
};

export default Login;
