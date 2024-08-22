import React, { useState } from 'react';
import { auth, db } from '../store/env';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          uid: user.uid,
          ...userData,
        }));
      }

      window.location.href = '/';
    } catch (error) {
      alert('Erro ao fazer login: ' + error.message);
    }
  };

  return (
    <form id="login-form" className="login-form" onSubmit={handleLogin}>
      <div className="input-group">
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <input
          type="password"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button id="login-button" type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;
