import React, { useState } from "react";
import "../Styles/EditarPanel.css";
import { Home, LogOut, SlidersHorizontal, ChevronDown, ChevronUp, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Accordion = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`accordion ${isOpen ? "open" : ""}`}>
      <button className="accordion-btn" onClick={() => setIsOpen(!isOpen)}>
        <span className="accordion-icon"></span>
        <span>{title}</span>
        <span className="chevron">
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </button>
      {isOpen && (
        <div className="accordion-options">
          {options.map((opt, idx) => (
            <button className="btn sub-option" key={idx}>
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const EditarPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="panel-container">
      <div className="sidebar">
        <div className="logo">M4CH</div>

        <div className="nav-icon">
          <Home className="icon" />
        </div>

        <div className="nav-icon active">
          <SlidersHorizontal className="icon" />
        </div>

        <div className="nav-icon" onClick={() => navigate("/reseñas")}>
          <Star className="icon" />
        </div>

        <div className="nav-icon bottom">
          <LogOut className="icon" />
        </div>
      </div>

      <div className="main-panel">
        <h1 className="panel-title">Editar Panel</h1>

        <div className="grid-panel">
          <div className="card">
            <h2 className="section-title">Configuraciones generales</h2>
            <Accordion title="Idioma" options={["Español", "Inglés", "Francés"]} />
            <Accordion title="Tema" options={["Claro", "Oscuro", "Automático"]} />
            <Accordion title="Formato" options={["24h", "12h", "ISO 8601"]} />
          </div>

          <div className="card">
            <h2 className="section-title">Cuenta y Seguridad</h2>
            <Accordion title="Cambiar Contraseña" options={["Cambiar ahora", "Ver políticas"]} />
            <Accordion title="Autenticación" options={["2 pasos", "App autenticadora", "SMS"]} />
            <button className="btn">Dispositivos Activos</button>
          </div>

          <div className="card">
            <h2 className="section-title">Notificaciones</h2>
            <button className="btn">Correos informativos</button>
            <button className="btn">Alertas importantes</button>
            <Accordion title="Mensajes dentro de la app" options={["Activar sonido", "Mostrar banner"]} />
          </div>

          <div className="card">
            <h2 className="section-title">Datos y Almacenamiento</h2>
            <button className="btn">Sincronizar con la nube</button>
            <button className="btn">Exportar datos</button>
            <button className="btn">Borrar historial</button>
          </div>

          <div className="card">
            <h2 className="section-title">Información y Soporte</h2>
            <button className="btn">Términos y Condiciones</button>
            <button className="btn">Política de privacidad</button>
            <button className="btn">Contactar soporte técnico</button>
          </div>

          <div className="card">
            <h2 className="section-title">Apariencia y Accesibilidad</h2>
            <Accordion title="Tamaño de fuente" options={["Pequeña", "Mediana", "Grande"]} />
            <Accordion title="Contraste alto" options={["Activar", "Desactivar"]} />
            <Accordion title="Animaciones" options={["Activar", "Reducir", "Desactivar"]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarPanel;
