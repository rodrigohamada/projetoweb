import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importa o componente Link do React Router
import slide1 from "../assets/images/slide1.jpg";
import slide2 from "../assets/images/slide2.png";
import slide3 from "../assets/images/slide3.jpg";
import "../styles/styles.css";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      src: slide1,
      alt: "Slide 1",
      title: "Produtos Orgânicos",
      description: "Conheça nossa variedade de produtos orgânicos frescos e saudáveis.",
      link: "/produtos"
    },
    {
      src: slide2,
      alt: "Slide 2",
      title: "Login",
      description: "Faça seu login para acessar sua conta e realizar pedidos com facilidade.",
      link: "/login"
    },
    {
      src: slide3,
      alt: "Slide 3",
      title: "Sobre Nós",
      description: "Saiba mais sobre nossa cooperativa e nossa missão em fornecer alimentos orgânicos de qualidade.",
      link: "/sobre"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="slider">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide-item ${index === currentSlide ? 'active' : ''}`}
          style={{ display: index === currentSlide ? "block" : "none" }} // Apenas o slide ativo é exibido
        >
          {index === currentSlide && ( // O link só aparece para o slide ativo
            <Link to={slide.link}>
              <img src={slide.src} alt={slide.alt} />
              <div className="slide-info">
                <h2 className="title">{slide.title}</h2>
                <p className="description">{slide.description}</p>
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slider;
