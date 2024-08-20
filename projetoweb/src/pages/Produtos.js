import React from "react";
import ProductList from "../components/ProductList";
import MobileMenuIcon from "../components/MobileMenuIcon";
import Logout from "../components/Logout";
function Produtos() {
  return (
    <>
      <MobileMenuIcon />
      <Logout />
      <h1 className="products-title">Produtos</h1>
      <ProductList />
    </>
  );
}

export default Produtos;
