import React from "react";
import MobileMenuIcon from "../components/MobileMenuIcon";
import Logout from "../components/Logout";
import "../styles/sobre.css";

const Sobre = () => {
  return (
    <div>
      <main>
        <section className="about">
          <div className="about-left">
            <div className="about-image">
              <img src={require("../assets/images/agricultor.png")} alt="Agricultor" />
            </div>
            <div className="about-text">
              <h2>Nossa História</h2>
              <p>
                Somos uma cooperativa dedicada a fornecer alimentos orgânicos de qualidade para
                nossos clientes. Começamos nossa jornada há mais de uma década, quando dois jovens
                estudantes decidiram se unir em prol de uma produção sustentável e saudável.
              </p>
            </div>
          </div>
          <div className="about-right">
            <div className="about-text">
              <h2>Nossa Missão</h2>
              <p>
                Nossa missão é promover a agricultura sustentável, respeitando o meio ambiente e
                valorizando o trabalho dos nossos agricultores. Queremos proporcionar alimentos
                frescos e saudáveis para todos os nossos clientes, contribuindo para um estilo de
                vida mais consciente e equilibrado.
              </p>
            </div>
            <div className="about-image">
              <img src={require("../assets/images/missao.png")} alt="Plantação" />
            </div>
          </div>
        </section>
      </main>
      <Logout />
      <MobileMenuIcon />
    </div>
  );
};

export default Sobre;
