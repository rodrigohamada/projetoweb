function ProductItem({ imagem, titulo, descricao, preco, onAddToCart }) {
  return (
    <div className="product-item">
      <img src={imagem} alt={titulo} />
      <div className="product-info">
        <h3 className="product-name">{titulo}</h3>
        <p className="product-description">{descricao}</p>
        <p className="product-price">
          {preco !== undefined ? `R$${preco.toFixed(2)}` : "Preço não disponível"}
        </p>
        {/* Adiciona a classe buy-button */}
        <button className="buy-button" onClick={onAddToCart}>
          Comprar
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
