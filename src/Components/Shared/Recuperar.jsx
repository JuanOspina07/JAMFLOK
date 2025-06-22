import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Recuperar.css";
import logo from "../../../public/Logo.png";
import regresar from "../../../public/Regresar.png";

const Recuperar = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");

  const handleEnviar = async () => {
    if (!correo) {
      alert("Por favor ingresa tu correo electrónico");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/recuperar", { correo });

      if (response.data.success) {
        alert("✅ " + response.data.message);
        navigate("/login");
      } else {
        alert("⚠️ " + response.data.message);
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      alert("❌ Error al intentar enviar el correo de recuperación");
    }
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
        <input
          type="email"
          className="area"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="ejemplo@correo.com"
        />
        <div className="boton_box">
          <button className="boton" onClick={handleEnviar}>
            Enviar
          </button>
        </div>
        <div className="pie">
          <a className="links" onClick={() => navigate("/privacidad")}>Privacidad</a>
          <a className="links" onClick={() => navigate("/ayuda")}>Ayuda</a>
          <a className="links" onClick={() => navigate("/condiciones")}>Condiciones</a>
        </div>
      </div>
      <button className="regresar" onClick={() => navigate("/")}>
        <img src={regresar} alt="Regresar" />
      </button>
    </div>
  );
};

export default Recuperar;