import React from "react";
import "../Styles/Login.css"; // Asegúrate de que la ruta sea correcta

const Login = () => {
  return (
    <div className="login-page">
      <header className="header">
        <div className="logo">JAMFLOK</div>
        <nav className="nav">
          <button>Inicio</button>
          <button>Soporte</button>
          <button>Información</button>
        </nav>
      </header>

      <main className="login-container">
        <div className="login-box">
          <h2>LOGIN</h2>
          <label>Username</label>
          <input type="text" placeholder="Username" />

          <label>Password</label>
          <input type="password" placeholder="Password" />

          <div className="forgot-password">
            ¿Olvidaste tu contraseña? <span>Recupérala</span>
          </div>

          <button className="sign-in">SIGN IN</button>
        </div>
      </main>
    </div>
  );
};

export default Login;
