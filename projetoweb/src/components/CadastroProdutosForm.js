import React, { useState } from 'react';
import { auth, db, storage } from '../store/env';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../styles/cadastro_produtos.css';

const CadastroProdutoForm = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || isNaN(productPrice) || !productDescription || !productImage) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {
      // Upload da imagem para o Firebase Storage
      const storageRef = ref(storage, `product_images/${Date.now()}_${productImage.name}`);
      await uploadBytes(storageRef, productImage);
      const imageUrl = await getDownloadURL(storageRef);

      // Cadastro do produto no Firestore
      await addDoc(collection(db, 'products'), {
        titulo: productName,
        preco: parseFloat(productPrice),
        descricao: productDescription,
        imagem: imageUrl
      });

      alert('Produto cadastrado com sucesso!');
      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setProductImage(null);
    } catch (error) {
      console.error('Erro ao cadastrar produto: ', error);
      alert('Erro ao cadastrar produto. Por favor, tente novamente.');
    }
  };

  return (
    <div className="login-form">
      <h2>Cadastro de Produtos</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Nome do Produto"
            required
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Preço do Produto"
            step="0.01"
            required
          />
        </div>
        <div className="input-group">
          <textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Descrição do Produto"
            required
          ></textarea>
        </div>
        <div className="input-group">
          <input
            type="file"
            id="productImage"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
            required
          />
        </div>
        <button type="submit" id="register-button">Cadastrar Produto</button>
      </form>
    </div>
  );
};

export default CadastroProdutoForm;