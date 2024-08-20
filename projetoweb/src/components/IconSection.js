import React from "react";
import casaIcon from "../assets/images/casa.png";
import caminhaoIcon from "../assets/images/caminhao.png";
import qualidadeIcon from "../assets/images/qualidade.png";
import segurancaIcon from "../assets/images/segurança.png";
import confiancaIcon from "../assets/images/confiança.png";
import respeitoIcon from "../assets/images/respeito.png";

const IconSection = () => {
  return (
    <div className="icon-container">
      <div className="icon-row">
        <div className="icon">
          <img src={casaIcon} alt="Casa" />
          <h3>Pensado em você</h3>
          <p>Escolha seus produtos favoritos.</p>
        </div>
        <div className="icon">
          <img src={caminhaoIcon} alt="Caminhão" />
          <h3>Receba em casa</h3>
          <p>De segunda à sexta 08:00 às 18h. Sábados até 12:00.</p>
        </div>
        <div className="icon">
          <img src={qualidadeIcon} alt="Qualidade" />
          <h3>Qualidade</h3>
          <p>Carinho e cuidado em cada detalhe do início ao fim.</p>
        </div>
      </div>
      <div className="icon-row">
        <div className="icon">
          <img src={segurancaIcon} alt="Segurança" />
          <h3>Praticidade e segurança</h3>
          <p>Compre seus produtos indispensáveis sem sair de casa.</p>
        </div>
        <div className="icon">
          <img src={confiancaIcon} alt="Confiança" />
          <h3>Confiabilidade</h3>
          <p>Verduras, Frutas e Hortaliças com certificação.</p>
        </div>
        <div className="icon">
          <img src={respeitoIcon} alt="Respeito" />
          <h3>Respeito</h3>
          <p>Nós respeitamos a natureza e a integridade com o consumidor.</p>
        </div>
      </div>
    </div>
  );
};

export default IconSection;
