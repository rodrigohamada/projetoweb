import React from 'react';
import './CartModal.css'; // Certifique-se de adicionar seus estilos

function CartModal({ isOpen, onClose, orderSummary, userInfo }) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                <h3>Confirmação de Compra</h3>
                <div id="order-summary">{orderSummary}</div>
                <div id="user-info">{userInfo}</div>
                <div className="modal-footer">
                    <button className="btn-confirm" onClick={() => alert('Compra Confirmada')}>Confirmar Compra</button>
                </div>
            </div>
        </div>
    );
}

export default CartModal;
