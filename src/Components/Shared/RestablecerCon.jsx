// src/Components/Shared/Restablecer.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../Styles/Recuperar.css";
import logo from "../../../public/Logo.png";

const Restablecer = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [tokenValido, setTokenValido] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/restablecer/${token}`)
      .then((response) => {
        if (response.data.success) {
          setTokenValido(true);
          Swal.fire({
            icon: "info",
            title: "Token válido",
            text: "Puedes restablecer tu contraseña ahora.",
            confirmButtonColor: "#d4af37",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Token inválido o expirado",
            text: "El enlace ya no es válido. Solicita uno nuevo.",
            confirmButtonColor: "#e74c3c",
          }).then(() => {
            navigate("/recuperar");
          });
        }
      })
      .catch((error) => {
        console.error("Error al verificar el token:", error);
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "Hubo un problema al verificar el token.",
          confirmButtonColor: "#e74c3c",
        }).then(() => {
          navigate("/recuperar");
        });
      });
  }, [token, navigate]);

  const handlePasswordReset = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/restablecer-contrasena", {
        token,
        nuevaContrasena,
      });

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "¡Contraseña actualizada!",
          text: "Ahora puedes iniciar sesión con tu nueva contraseña.",
          confirmButtonColor: "#27ae60",
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.message || "No se pudo actualizar la contraseña.",
          confirmButtonColor: "#e74c3c",
        });
      }
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Ocurrió un problema al actualizar la contraseña.",
        confirmButtonColor: "#e74c3c",
      });
    }
  };

  return (
    <div className="containerRecuperar">
      <div className="espacio"></div>
      <div className="recuperar_box">
        <img src={logo} alt="Logo" className="Logo" />
        <p className="subtitulo">Restablecer contraseña</p>
        <p className="text">
          Ingresa tu nueva contraseña para <br /> completar el proceso
        </p>

        {tokenValido && (
          <>
            <p className="correo">Nueva Contraseña</p>
            <input
              type="password"
              className="area"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
              placeholder="********"
              required
            />
            <div className="boton_box">
              <button className="boton" onClick={handlePasswordReset}>
                Restablecer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Restablecer;
