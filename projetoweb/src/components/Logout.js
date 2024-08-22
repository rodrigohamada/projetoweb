import React, { useEffect, useState } from 'react';
import { auth } from '../store/env';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Logout = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('Usuário deslogado com sucesso');
      localStorage.removeItem('user');  // Remove do localStorage
      window.location.href = '/';  // Redireciona após logout
    }).catch((error) => {
      console.error('Erro ao fazer logout:', error);
    });
  };

  return (
    <div className="logout-container">
      {user && (
        <button id="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Logout;
