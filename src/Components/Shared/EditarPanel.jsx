import React, { useState, useEffect } from "react";
import "../Styles/EditarPanel.css";
import { Home, LogOut, SlidersHorizontal, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditarPanel = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("idUsuario");

  const [formData, setFormData] = useState({
    PrimerNombre: "",
    SegundoNombre: "",
    PrimerApellido: "",
    SegundoApellido: "",
    CorreoElectronico: "",
    NumTelefono: "",
    NombreUsuario: "",
    Edad: "",
    FechaNacimiento: "",
    ID_CIUDAD: "",
    ID_DOCUMENTO: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ciudades, setCiudades] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchInitialData = async () => {
      try {
        const [userResponse, ciudadesResponse, documentosResponse] = await Promise.all([
          axios.get(`http://localhost:4000/api/usuario/${userId}`),
          axios.get('http://localhost:4000/api/ciudades'),
          axios.get('http://localhost:4000/api/documentos')
        ]);

        setFormData({
          ...userResponse.data,
          FechaNacimiento: userResponse.data.FechaNacimiento?.split('T')[0] || ""
        });
        setCiudades(ciudadesResponse.data);
        setDocumentos(documentosResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar datos iniciales:", err);
        setError("Error al cargar datos del usuario");
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGuardar = async () => {
    // Validación de campos obligatorios
    const camposObligatorios = [
      { campo: "PrimerNombre", nombre: "Primer Nombre" },
      { campo: "PrimerApellido", nombre: "Primer Apellido" },
      { campo: "CorreoElectronico", nombre: "Correo Electrónico" },
      { campo: "NumTelefono", nombre: "Número de Teléfono" },
      { campo: "NombreUsuario", nombre: "Nombre de Usuario" },
      { campo: "Edad", nombre: "Edad" },
      { campo: "FechaNacimiento", nombre: "Fecha de Nacimiento" },
      { campo: "ID_CIUDAD", nombre: "Ciudad" },
      { campo: "ID_DOCUMENTO", nombre: "Documento" }
    ];

    for (const { campo, nombre } of camposObligatorios) {
      if (!formData[campo]) {
        alert(`⚠️ El campo ${nombre} es obligatorio`);
        return;
      }
    }

    // Validación de formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.CorreoElectronico)) {
      alert("⚠️ Por favor ingrese un correo electrónico válido");
      return;
    }

    // Validación de edad
    if (isNaN(formData.Edad) || formData.Edad < 1 || formData.Edad > 120) {
      alert("⚠️ La edad debe ser un número entre 1 y 120");
      return;
    }

    setIsSaving(true);

    try {
      const response = await axios.put(
        `http://localhost:4000/api/usuario/${userId}`,
        {
          ...formData,
          FechaNacimiento: formData.FechaNacimiento
        }
      );

      alert("¡Datos actualizados correctamente!");
      navigate("/ajustes");
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                         err.response?.data?.message || 
                         "Error al actualizar los datos";
      alert(`❌ ${errorMessage}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner"></div>
        <p>Cargando datos del usuario...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <p>{error}</p>
          <button className="primary-button" onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

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
          <div className="nav-item" onClick={() => navigate("/reseñas")}>
            <Star className="nav-icon" size={20} />
            <span>Reseñas</span>
          </div>
        </div>
        
        <div className="nav-item logout" onClick={() => {
          localStorage.removeItem("idUsuario");
          navigate("/login");
        }}>
          <LogOut className="nav-icon" size={20} />
          <span>Cerrar sesión</span>
        </div>
      </div>

      <div className="main-content">
        <header className="content-header">
          <h1>Editar Información del Usuario</h1>
          <p>Actualiza tus datos personales y preferencias</p>
        </header>

        <div className="cards-grid">
          <div className="info-card">
            <div className="card-header">
              <h2>Datos Personales</h2>
            </div>
            <div className="card-body">
              <div className="info-field">
                <label>Primer Nombre *</label>
                <input
                  name="PrimerNombre"
                  value={formData.PrimerNombre}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="info-field">
                <label>Segundo Nombre</label>
                <input
                  name="SegundoNombre"
                  value={formData.SegundoNombre || ""}
                  onChange={handleChange}
                />
              </div>
              
              <div className="info-field">
                <label>Primer Apellido *</label>
                <input
                  name="PrimerApellido"
                  value={formData.PrimerApellido}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="info-field">
                <label>Segundo Apellido</label>
                <input
                  name="SegundoApellido"
                  value={formData.SegundoApellido || ""}
                  onChange={handleChange}
                />
              </div>
              
              <div className="info-field">
                <label>Edad *</label>
                <input
                  type="number"
                  name="Edad"
                  value={formData.Edad}
                  onChange={handleChange}
                  min="1"
                  max="120"
                  required
                />
              </div>
              
              <div className="info-field">
                <label>Fecha de Nacimiento *</label>
                <input
                  type="date"
                  name="FechaNacimiento"
                  value={formData.FechaNacimiento}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="info-field">
                <label>Ciudad *</label>
                <select
                  name="ID_CIUDAD"
                  value={formData.ID_CIUDAD}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una ciudad</option>
                  {ciudades.map((c) => (
                    <option key={c.ID_CIUDAD} value={c.ID_CIUDAD}>
                      {c.Nombre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="info-field">
                <label>Documento *</label>
                <select
                  name="ID_DOCUMENTO"
                  value={formData.ID_DOCUMENTO}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un documento</option>
                  {documentos.map((d) => (
                    <option key={d.ID_DOCUMENTO} value={d.ID_DOCUMENTO}>
                      {d.Nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="card-header">
              <h2>Contacto</h2>
            </div>
            <div className="card-body">
              <div className="info-field">
                <label>Correo Electrónico *</label>
                <input
                  type="email"
                  name="CorreoElectronico"
                  value={formData.CorreoElectronico}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="info-field">
                <label>Número de Teléfono *</label>
                <input
                  name="NumTelefono"
                  value={formData.NumTelefono}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="info-card">
            <div className="card-header">
              <h2>Cuenta</h2>
            </div>
            <div className="card-body">
              <div className="info-field">
                <label>Nombre de Usuario *</label>
                <input
                  name="NombreUsuario"
                  value={formData.NombreUsuario}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="info-field">
                <label>Cambiar Contraseña</label>
                <input
                  type="password"
                  name="Contrasena"
                  placeholder="Nueva contraseña (dejar en blanco para no cambiar)"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            className="secondary-button"
            onClick={() => navigate("/ajustes")}
          >
            Cancelar
          </button>
          
          <button 
            className="primary-button"
            onClick={handleGuardar}
            disabled={isSaving}
          >
            {isSaving ? "Guardando..." : "Guardar Cambios"}
            {!isSaving && <ChevronRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditarPanel;