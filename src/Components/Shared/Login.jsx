import "../Styles/Login.css"; 
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const handleSoporte = () => {
    navigate("/Soporte"); 
  };

  const handleRecuperar = () => {
    navigate("/Recuperar"); 
  };
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    console.log("Credenciales enviadas:", { nombreUsuario, contraseña });

    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        nombreUsuario,
        contraseña,
      });

      console.log("Respuesta del backend:", response.data);

      if (response.data.success) {
        const { idUsuario, idRol, nombre, apellido } = response.data.user;
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("idUsuario", idUsuario);
        localStorage.setItem("idRol", idRol);
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("apellido", apellido);

        // Redirigir según el rol
        switch (idRol) {
          case 1:
            console.log("voy donde el cliente");
            navigate("/menu");
            break;
          case 2:
            console.log("voy donde el administrador");
            navigate("/PaginaAdmin");
            break;
          default:
            setError("Rol no reconocid");
            return;
        }
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <div className="logo">JAMFLOK</div>
        <nav className="nav">
          <button onClick={() => navigate('/')}>Inicio</button>
          <button onClick={handleSoporte}>Soporte</button>
          <button>Información</button>
        </nav>
      </header>

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
