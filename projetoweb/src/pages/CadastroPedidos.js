import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import OrderList from '../components/OrderList';
import '../styles/cadastro_pedidos.css';

const CadastroPedidos = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Carrega os dados do carrinho e do usuário do localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const savedUser = JSON.parse(localStorage.getItem('user'));
    setCart(savedCart);
    setUser(savedUser);
    updateTotalPrice(savedCart);
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
      window.location.href = 'login.html';
    }
  };

  // Confirma a compra, limpa o carrinho e fecha o modal
  const confirmPurchase = () => {
    alert('Compra concluída com sucesso!');
    localStorage.removeItem('cart');
    setCart([]);
    setShowModal(false);
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
      <Footer />
    </>
  );
};

export default CadastroPedidos;
