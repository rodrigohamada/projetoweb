import React from 'react';

const Modal = ({ showModal, setShowModal, cart, user, confirmPurchase }) => {
  if (!showModal) return null;

  const getOrderSummary = () => {
    return cart.map(item => `${item.name} (Quantidade: ${item.quantity}) - R$${(item.price * item.quantity).toFixed(2)}`).join('\n');
  };

  return (
    <div id="confirmation-modal" className="modal" style={{ display: 'flex' }}>
      <div className="modal-content">
        <span id="cancel-button" className="close-button" onClick={() => setShowModal(false)}>&times;</span>
        <h3>Confirmação de Compra</h3>
        <div id="order-summary">
          <pre>{getOrderSummary()}</pre>
        </div>
        <div id="user-info">
          <h4>Informações do Usuário:</h4>
          <p>Nome: {user?.name}</p>
          <p>Email: {user?.email}</p>
        </div>
        <div className="modal-footer">
          <button id="confirm-button" className="btn-confirm" onClick={confirmPurchase}>Confirmar Compra</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
