import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import OrderList from '../components/OrderList';
import { auth } from '../store/env';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/cadastro_pedidos.css';

const CadastroPedidos = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Carrega os dados do carrinho do localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    updateTotalPrice(savedCart);

    // Verifica o estado de autenticação do Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Atualiza o usuário autenticado
        setUser(user);
      } else {
        // Usuário não está logado
        setUser(null);
        localStorage.removeItem('user');  // Garante que localStorage esteja sincronizado
      }
    });

    return () => unsubscribe(); // Limpa a verificação quando o componente é desmontado
  }, []);

  // Atualiza o preço total com base nos itens do carrinho
  const updateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total.toFixed(2));
  };

  // Atualiza a quantidade de um item no carrinho
  const updateQuantity = (index, quantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = parseInt(quantity);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotalPrice(updatedCart);
  };

  // Remove um item do carrinho
  const removeItem = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateTotalPrice(updatedCart);
  };

  // Finaliza a compra se o usuário estiver logado, caso contrário redireciona para a página de login
  const finalizePurchase = () => {
    if (user) {
      setShowModal(true);
    } else {
      alert('Você precisa estar logado para concluir a compra.');
      window.location.href = '/login'; // Certifique-se de que o caminho para a página de login esteja correto.
    }
  };

  // Confirma a compra, limpa o carrinho e fecha o modal
  const confirmPurchase = () => {
    if (user) {
      alert('Compra concluída com sucesso!');
      localStorage.removeItem('cart');
      setCart([]);
      setShowModal(false);
    } else {
      alert('Erro: Usuário não autenticado. Por favor, faça login.');
    }
  };

  return (
    <>
      <main id="main-content">
        <h1>Cadastro de Pedidos</h1>
        <OrderList 
          cart={cart}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
        {cart.length === 0 ? (
          <div id="empty-cart-message">Seu carrinho de compras está vazio.</div>
        ) : (
          <>
            <div className="total-price" id="total-price">Total: R${totalPrice}</div>
            <button id="finalize-button" onClick={finalizePurchase}>Concluir Compra</button>
          </>
        )}
        <Modal 
          showModal={showModal} 
          setShowModal={setShowModal} 
          cart={cart} 
          user={user} 
          confirmPurchase={confirmPurchase} 
        />
      </main>
    </>
  );
};

export default CadastroPedidos;
