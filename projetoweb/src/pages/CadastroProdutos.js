import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../store/env'; // Certifique-se de importar corretamente do arquivo env.js
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../styles/cadastro_produtos.css';

const CadastroProdutos = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null);

  // Verifica a autenticação do usuário ao carregar a página
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login'); // Redireciona para o login se o usuário não estiver autenticado
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleProductImageChange = (e) => {
    if (e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação dos campos
    if (!productName || isNaN(parseFloat(productPrice)) || !productDescription || !productImage) {
      alert('Por favor, preencha todos os campos corretamente.');
      return;
    }

    try {
      // Upload da imagem para o Firebase Storage
      const storageRef = ref(storage, 'product_images/' + Date.now() + '_' + productImage.name);
      await uploadBytes(storageRef, productImage);
      const imageUrl = await getDownloadURL(storageRef);

      // Adicionar o produto ao Firestore
      await addDoc(collection(db, 'products'), {
        titulo: productName,
        preco: parseFloat(productPrice),
        descricao: productDescription,
        imagem: imageUrl
      });

      alert('Produto cadastrado com sucesso!');

      // Limpa os campos do formulário
      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setProductImage(null);
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert('Erro ao cadastrar produto. Por favor, tente novamente.');
    }
  };

  if (!user) {
    return null; // Renderiza uma tela em branco se o usuário não estiver autenticado (antes do redirecionamento)
  }

  return (
    <div className="cadastro-produto-container">
      <h2>Cadastro de Produtos</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Nome do Produto"
            required
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            placeholder="Preço do Produto"
            step="0.01"
            required
          />
        </div>
        <div className="input-group">
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Descrição do Produto"
            required
          ></textarea>
        </div>
        <div className="input-group">
          <input
            type="file"
            onChange={handleProductImageChange}
            accept="image/*"
            required
          />
        </div>
        <button type="submit">Cadastrar Produto</button>
      </form>
    </div>
  );
};

export default CadastroProdutos;
