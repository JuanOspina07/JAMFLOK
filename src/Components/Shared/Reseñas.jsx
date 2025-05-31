import React from "react";
import { Star, User, Home, LogOut, SlidersHorizontal } from "lucide-react";
import "../Styles/Reseñas.css";
import "../Styles/EditarPanel.css";

const Reseñas = () => {
  return (
    <div className="panel-container">
      
      <div className="sidebar">
        <div className="logo">M4CH</div>

        <div className="nav-icon">
          <Home className="icon" />
        </div>

        <div className="nav-icon">
          <SlidersHorizontal className="icon" />
        </div>

        <div className="nav-icon active">
          
          <Star className="icon"  />
        </div>

        <div className="nav-icon bottom">
          <LogOut className="icon" />
        </div>
      </div>

      
      <div className="main-panel">
        <h1 className="panel-title">Reseña</h1>

        <div className="resena-container">
          <div className="seccion-general">
            <label className="label">General:</label>
            <input className="input" placeholder="Nombre del producto / servicio" />
            <input className="input" placeholder="Valoraciones" />
            <input className="input" placeholder="Escribir reseña:" />
          </div>

          <div className="seccion-valoraciones">
            <label className="label">Valoraciones:</label>

            <div className="barra">
              <div className="estrellas">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={16} fill="#ffc107" stroke="#ffc107" />
                ))}
              </div>
              <div className="porcentaje">(65%)</div>
            </div>

            <div className="barra">
              <div className="estrellas">
                {Array(4).fill(0).map((_, i) => (
                  <Star key={i} size={16} fill="#ffc107" stroke="#ffc107" />
                ))}
              </div>
              <div className="porcentaje">(20%)</div>
            </div>

            <div className="barra">
              <div className="estrellas">
                {Array(3).fill(0).map((_, i) => (
                  <Star key={i} size={16} fill="#ffc107" stroke="#ffc107" />
                ))}
              </div>
              <div className="porcentaje">(3%)</div>
            </div>
          </div>

          <div className="seccion-reseña-usuario">
            <label className="label">Reseña de Usuarios:</label>

            <div className="comentario-usuario">
              <div className="usuario">
                <User className="icono-usuario" />
                Usuario123
                <span className="puntuacion">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} size={16} fill="#ffc107" stroke="#ffc107" />
                  ))}
                </span>
              </div>
              <p className="comentario-texto">Muy buen producto, llegó rápido.</p>
            </div>
          </div>

          <button className="btn-enviar">Enviar ✅</button>
        </div>
      </div>
    </div>
  );
};

export default Reseñas;
