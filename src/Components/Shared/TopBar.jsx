import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../Styles/Soporte.css";

const TopBar = () => {
  const navigate = useNavigate();

  const handleInformacion = () => {
    navigate("/informacion");
  };

  return (
    <div>
      <header className="main-header">
        <h1 className="main-logo">JAMFLOK</h1>
        <nav className="main-nav">
          <button className="nav-button" onClick={() => navigate("/")}>
            Inicio
          </button>
          <button className="nav-button" onClick={() => navigate("/soporte")}>
            Soporte
          </button>
           <button className="nav-button" onClick={handleInformacion}>
            Información
          </button>
        </nav>
      </header>
    </div>
  );
};

export default TopBar;
