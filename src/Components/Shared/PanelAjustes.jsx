import React, { useState, useEffect } from "react";
import "../Styles/PanelAjustes.css";
import { Home, LogOut, SlidersHorizontal, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const PanelAjustes = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("idUsuario");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/usuario/${userId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError("Error al cargar datos del usuario");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditar = () => {
    navigate("/Editar-panel");
  };

  const handleLogout = () => {
    localStorage.removeItem("idUsuario");
    navigate("/login");
  };

  if (loading) return <div className="loading-container">Cargando datos del usuario...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;
  if (!userData) return <div className="error-container">No se encontraron datos del usuario</div>;

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <span className="logo">M4CH</span>
        </div>
        
        <div className="nav-items">
          <div className="nav-item" onClick={() => navigate("/")}>
            <Home className="nav-icon" size={20} />
            <span>Inicio</span>
          </div>
          <div className="nav-item active">
            <SlidersHorizontal className="nav-icon" size={20} />
            <span>Ajustes</span>
          </div>
        </div>
        
        <div className="nav-item logout" onClick={handleLogout}>
          <LogOut className="nav-icon" size={20} />
          <span>Cerrar sesión</span>
        </div>
      </div>

      <div className="main-content">
        <header className="content-header">
          <h1>Panel de Ajustes</h1>
          <p>Administra tu información personal y preferencias</p>
        </header>

        <div className="cards-grid">
          <div className="info-card">
            <div className="card-header">
              <h2>Datos Personales</h2>
            </div>
            <div className="card-body">
              <div className="info-field">
                <label>Primer Nombre</label>
                <div className="info-value">{userData.PrimerNombre}</div>
              </div>
              <div className="info-field">
                <label>Segundo Nombre</label>
                <div className="info-value">{userData.SegundoNombre || "No especificado"}</div>
              </div>
              <div className="info-field">
                <label>Primer Apellido</label>
                <div className="info-value">{userData.PrimerApellido}</div>
              </div>
              <div className="info-field">
                <label>Segundo Apellido</label>
                <div className="info-value">{userData.SegundoApellido || "No especificado"}</div>
              </div>
              <div className="info-field">
                <label>Tipo de Documento</label>
                <div className="info-value">{userData.TipoDocumento}</div>
              </div>
              <div className="info-field">
                <label>Número de Documento</label>
                <div className="info-value">{userData.NumeroDocumento}</div>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="card-header">
              <h2>Información de Contacto</h2>
            </div>
            <div className="card-body">
              <div className="info-field">
                <label>Número de Teléfono</label>
                <div className="info-value">{userData.NumTelefono}</div>
              </div>
              <div className="info-field">
                <label>Correo Electrónico</label>
                <div className="info-value">{userData.CorreoElectronico}</div>
              </div>
              <div className="info-field">
                <label>Ubicación</label>
                <div className="info-value">
                  {`${userData.Ciudad}, ${userData.Departamento}, ${userData.Pais}`}
                </div>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="card-header">
              <h2>Cuenta</h2>
            </div>
            <div className="card-body">
              <div className="info-field">
                <label>Nombre de Usuario</label>
                <div className="info-value">{userData.NombreUsuario}</div>
              </div>
              <div className="info-field">
                <label>Rol</label>
                <div className="info-value">{userData.NombreRol}</div>
              </div>
              <div className="info-field">
                <label>Contraseña</label>
                <input
                  type="password"
                  value="********"
                  className="info-value password"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <button className="primary-button" onClick={handleEditar}>
          Editar información
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default PanelAjustes;