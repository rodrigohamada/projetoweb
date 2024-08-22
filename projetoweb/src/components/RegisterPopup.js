import React from 'react';
import RegisterForm from './RegisterForm';

const RegisterPopup = ({ onClose }) => {
    return (
      <div className="overlay show" id="overlay">
        <div className="popup show" id="popup">
          <a href="#" className="close" onClick={onClose}>&times;</a>
          <h2>Cadastro</h2>
          <RegisterForm onClose={onClose} />
        </div>
      </div>
    );
  };
  

export default RegisterPopup;
