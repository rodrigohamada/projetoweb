import React from 'react';

const OrderList = ({ cart, updateQuantity, removeItem }) => {
  return (
    <div id="order-list">
      {cart.map((item, index) => (
        <div className="order-item" key={index}>
          <div className="product-info">
            <img 
              src={item.image || 'default-image.png'} 
              alt={item.name || 'Produto'} 
              className="product-image" 
            />
            <h3>{item.name || 'Nome do Produto'}</h3>
            <p>{item.description || 'Descrição do Produto'}</p>
            <p className="product-price">
              {/* Verifica se o preço é um número válido antes de formatar */}
              R${(item.price && !isNaN(item.price) ? item.price.toFixed(2) : '0.00')}
            </p>
          </div>
          <div className="quantity-control">
            <label>Quantidade:</label>
            <input 
              type="number" 
              min="1" 
              value={item.quantity || 1} 
              onChange={(e) => updateQuantity(index, e.target.value)} 
            />
          </div>
          <button 
            className="remove-button" 
            onClick={() => removeItem(index)}
          >
            Remover
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
