import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import TopBar from "./TopBar";
import logo from "../../../public/Logo.png";
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        nombreUsuario,
        contraseña,
      });

      if (response.data.success) {
        const { idUsuario, idRol, nombre, apellido } = response.data.user;
        const user = { idUsuario, idRol, nombre, apellido }; // Crear objeto user
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(user)); // Guardar objeto user
        localStorage.setItem("idUsuario", idUsuario);
        localStorage.setItem("idRol", idRol);
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("apellido", apellido);
        localStorage.setItem("token", response.data.token);

        switch (idRol) {
          case 1:
            navigate("/emprendedor");
            break;
          case 2:
            navigate("/cliente");
            break;
          default:
            setError("Rol no reconocido");
        }
      } else {
        setError(response.data.message);
      }
    } catch (err) {
  console.error("Error en login:", err);
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Hubo un error al iniciar sesión. Verifica tus credenciales e intenta de nuevo.',
    confirmButtonColor: '#d33',
    confirmButtonText: 'Entendido'
  });
}
  };

  const handleRecuperar = () => {
    navigate("/Recuperar");
  };

  return (
    <div className="login-page">
      <TopBar />
      <main className="login-container">
        <div className="login-box">
          <img src={logo} alt="Logo" className="Logo" />
          <h2>INICIO DE SESIÓN</h2>
          <label>Nombre de Usuario</label>
          <input
            type="text"
            placeholder="Nombre de Usuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <div className="forgot-password">
            ¿Olvidaste tu contraseña? <span onClick={handleRecuperar}>Recupérala</span>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button className="sign-in" onClick={handleLogin}>Iniciar Sesión</button>
        </div>
      </main>
    </div>
  );
};

export default Login;