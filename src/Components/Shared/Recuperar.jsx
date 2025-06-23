import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Recuperar.css";
import logo from "../../../public/Logo.png";
import Swal from 'sweetalert2';
import regresar from "../../../public/Regresar.png";

const Recuperar = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");

  const handleEnviar = async () => {
    if (!correo) {
     Swal.fire({
      icon: 'warning',
      title: 'Campo vacío',
      text: 'Por favor ingresa tu correo electrónico.',
      background: '#fff8e1',           // Fondo amarillo claro
  color: '#7a5600',                // Texto marrón
  iconColor: '#ff9800',            // Ícono naranja
  confirmButtonColor: '#ff9800',   // Botón naranja
  confirmButtonText: 'Intentar de nuevo'
    });
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/recuperar", { correo });

      if (response.data.success) {
         Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Se envió el correo de recuperación exitosamente.',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Entendido'
      }).then(() => {
        navigate("/login");
      });
      } else {
       Swal.fire({
        icon: 'warning',
        title: 'Correo no encontrado',
        text: 'No se encontró una cuenta asociada a ese correo.',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Intentar de nuevo'
      });
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
       Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Hubo un error al intentar enviar el correo de reccuperación.',
    confirmButtonColor: '#d33',
    confirmButtonText: 'Entendido'
  });
    }
  };

  return (
    <div className="containerRecuperar">
      <button className="btn-volver13" onClick={() => navigate(-1)}>←</button>
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
     
    </div>
  );
};

export default Recuperar;