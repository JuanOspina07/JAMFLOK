import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Informacion.css"; // Ajusta si la ruta cambia
import logo from "../../../public/Logo.png";
import TopBar from "./TopBar"; 

const Informacion = () => {

  return (
    <div>
      <TopBar />
      <div className="cont">
      <div className="informacion">
        <div className="box_logo">
          <img src={logo} alt="Logo" className="Logo7" />
        </div>

        <h2>Nuestra Empresa</h2>
        <p>
          <strong>JAMFLOK</strong> es una plataforma diseñada para conectar a empresas y clientes en un entorno digital eficiente, seguro y fácil de usar.
          Ofrecemos un espacio donde las empresas pueden mostrar y vender sus productos, mientras que los clientes pueden explorar, elegir y comprar con confianza.
        </p>

        <h2>Misión</h2>
        <p>
          Facilitar el comercio digital entre empresas y clientes, brindando una plataforma intuitiva que permita la compra y venta de productos de manera rápida, transparente y segura.
        </p>

        <h2>Visión</h2>
        <p>
          Ser la plataforma líder en el comercio digital local, reconocida por su innovación, confiabilidad y por fomentar el crecimiento de pequeñas y grandes empresas mediante soluciones tecnológicas accesibles.
        </p>

        <h2>¿Qué ofrecemos?</h2>
        <ul>
          <li>Registro gratuito para empresas y clientes.</li>
          <li>Subida y gestión de productos para vendedores.</li>
          <li>Interfaz clara y rápida para que los clientes realicen sus compras.</li>
          <li>Soporte técnico y acompañamiento constante.</li>
          <li>Integración con múltiples formas de pago (Nequi, efectivo, etc.).</li>
        </ul>

        <h2>Compromiso con nuestros usuarios</h2>
        <p>
          En <strong>JAMFLOK</strong> creemos en construir una comunidad comercial basada en la confianza, el crecimiento mutuo y la innovación.
          Nos comprometemos a mantener una plataforma que evoluciona junto con las necesidades de nuestros usuarios.
        </p>
      </div>
    </div>
    </div>
    );
  };
  
  export default Informacion;