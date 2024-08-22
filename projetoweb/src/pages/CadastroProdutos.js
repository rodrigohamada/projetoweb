import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../store/env';
import CadastroProdutoForm from '../components/CadastroProdutoForm';

const CadastroProdutos = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o usuário está autenticado
    auth.onAuthStateChanged((user) => {
      if (!user) {
        // Redireciona para a página de login se o usuário não estiver autenticado
        navigate('/login');
      }
    });
  }, [navigate]);

  return (
    <div>
      <CadastroProdutoForm />
    </div>
  );
};

export default CadastroProdutos;