// src/Components/Shared/Recuperar.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Recuperar.css"; // Ajusta si la ruta cambia
import logo from "../../../public/Logo.png";
import regresar from "../../../public/Regresar.png"; // Asegúrate de tener esta imagen

const Recuperar = () => {
  const navigate = useNavigate();

  const handleEnviar = () => {
    // Aquí podrías validar o mandar un correo
    alert("Correo enviado (simulado)");
  };

  return (
    <div className="containerRecuperar">
      <div className="espacio"></div>
      <div className="recuperar_box">
        <img src={logo} alt="Logo" className="Logo" />
        <p className="subtitulo">Recuperar contraseña</p>
        <p className="text">
          Ingresa tu correo electrónico para poder <br /> recuperar contraseña
        </p>
        <p className="correo">Correo electrónico</p>
        <input type="text" className="area" />
        <div className="boton_box">
          <button className="boton" onClick={handleEnviar}>
            Enviar
          </button>
        </div>
        <div className="pie">
          <a className="links" href="#" target="_blank">Privacidad</a>
          <a className="links" href="#" target="_blank">Ayuda</a>
          <a className="links" href="#" target="_blank">Condiciones</a>
        </div>
      </div>
      <button className="regresar" onClick={() => navigate("/")}>
        <img src={regresar} alt="Regresar" />
      </button>
    </div>
  );
};

export default Recuperar;
