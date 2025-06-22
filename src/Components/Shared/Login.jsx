import "../Styles/Login.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import TopBar from "./TopBar";

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
      setError("Error al iniciar sesión. Verifica tus credenciales.");
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
          <h2>LOGIN</h2>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <div className="forgot-password">
            ¿Olvidaste tu contraseña? <span onClick={handleRecuperar}>Recupérala</span>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button className="sign-in" onClick={handleLogin}>SIGN IN</button>
        </div>
      </main>
    </div>
  );
};

export default Login;