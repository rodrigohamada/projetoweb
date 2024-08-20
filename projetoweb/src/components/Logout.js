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
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    }).catch((error) => {
      console.error('Erro ao fazer logout:', error);
    });
  };

  return (
    <div className="logout-container">
      {user && (
        <>
          <span id="user-email" style={{ marginRight: '10px' }}>
            {user.email}
          </span>
          <button id="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Logout;
