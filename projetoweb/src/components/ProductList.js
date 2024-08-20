import React, { useEffect, useState } from "react";
import { db } from "../store/env"; 
import { collection, getDocs } from "firebase/firestore";
import ProductItem from "./ProductItem";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsList = [];

        querySnapshot.forEach((doc) => {
          productsList.push(doc.data());
        });

        setProducts(productsList);
      } catch (error) {
        console.error("Erro ao carregar produtos: ", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (name, description, price, image) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex((product) => product.name === name);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ name, description, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produto adicionado à página de Pedidos!");
  };

  return (
    <div className="product-container">
      {products.map((product, index) => (
        <ProductItem
          key={index}
          imagem={product.imagem}
          titulo={product.titulo}
          descricao={product.descricao}
          preco={product.preco}
          onAddToCart={() => addToCart(product.titulo, product.descricao, product.preco, product.imagem)}
        />
      ))}
    </div>
  );
}

export default ProductList;
