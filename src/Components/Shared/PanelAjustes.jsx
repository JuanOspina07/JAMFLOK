import React from "react";
import "../Styles/PanelAjustes.css";
import { Home, LogOut, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PanelAjustes=()=> {
  const navigate=useNavigate();
  const handleEditar=()=>{navigate("/Editar panel");};
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

        <div className="nav-icon bottom">
          <LogOut className="icon" />
        </div>
      </div>

      <div className="main-panel">
        <h1 className="panel-title">Panel de Ajustes</h1>

        <div className="grid-panel">
          <div className="card">
            <h2 className="section-title">Configuraciones generales</h2>
            <button className="btn">Idioma</button>
            <button className="btn">Tema</button>
            <button className="btn">Formato</button>
          </div>

          <div className="card">
            <h2 className="section-title">Cuenta y Seguridad</h2>
            <button className="btn">Cambiar Contraseña</button>
            <button className="btn">Autenticación</button>
            <button className="btn">Dispositivos Activos</button>
          </div>

          <div className="card">
            <h2 className="section-title">Notificaciones</h2>
            <button className="btn">Correos informativos</button>
            <button className="btn">Alertas importantes</button>
            <button className="btn">Mensajes dentro de la app</button>
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
            <button className="btn">Tamaño de fuente</button>
            <button className="btn">Contraste alto</button>
            <button className="btn">Animaciones</button>
          </div>
        </div>

       
        <button className="btn btn-edit" onClick={handleEditar}>Editar</button>
      </div>
    </div>
  );
}

export default PanelAjustes;