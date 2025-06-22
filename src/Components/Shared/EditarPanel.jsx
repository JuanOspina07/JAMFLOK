import React, { useState, useEffect } from "react";
import "../Styles/EditarPanel.css";
import { Home, LogOut, SlidersHorizontal, Star, ChevronRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditarPanel = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("idUsuario");

  // Estado inicial
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
    ID_PAIS: "",
    ID_DEPARTAMENTO: "",
    ID_CIUDAD: "",
    ID_TIPO_DOCUMENTO: "",
    NumeroDocumento: "",
    Contrasena: "",
    Pais: "",
    Departamento: "",
    Ciudad: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Datos para selects
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [tiposDocumento, setTiposDocumento] = useState([]);

  // Cargar datos iniciales
  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchInitialData = async () => {
      try {
        // Cargar datos en paralelo
        const [userData, paisesData, tiposDocData] = await Promise.all([
          axios.get(`http://localhost:4000/api/usuario/${userId}`),
          axios.get('http://localhost:4000/api/paises'),
          axios.get('http://localhost:4000/api/tipos-documento')
        ]);

        setPaises(paisesData.data);
        setTiposDocumento(tiposDocData.data);

        // Si el usuario tiene ciudad, cargar jerarquía de localización
        if (userData.data.ID_CIUDAD) {
          // Obtener datos completos de ubicación
          const [ciudadResponse, perfilResponse] = await Promise.all([
            axios.get(`http://localhost:4000/api/ciudades`),
            axios.get(`http://localhost:4000/api/usuario/${userId}/ubicacion`)
          ]);

          const ciudadUsuario = ciudadResponse.data.find(c => c.ID_CIUDAD === userData.data.ID_CIUDAD);
          
          if (ciudadUsuario) {
            const deptosResponse = await axios.get(`http://localhost:4000/api/departamentos/${ciudadUsuario.ID_PAIS}`);
            setDepartamentos(deptosResponse.data);
            
            const ciudadesResponse = await axios.get(`http://localhost:4000/api/ciudades/${ciudadUsuario.ID_DEPARTAMENTO}`);
            setCiudades(ciudadesResponse.data);
          }

          // Combinar datos del usuario con datos de ubicación
          setFormData({
            ...userData.data,
            ...perfilResponse.data,
            FechaNacimiento: userData.data.FechaNacimiento?.split('T')[0] || "",
            Contrasena: ""
          });
        } else {
          setFormData({
            ...userData.data,
            FechaNacimiento: userData.data.FechaNacimiento?.split('T')[0] || "",
            Contrasena: ""
          });
        }

        setLoading(false);
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("Error al cargar datos del usuario");
        toast.error("Error al cargar datos del usuario");
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [userId, navigate]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Cargar departamentos cuando cambia el país
  const handlePaisChange = async (idPais) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/departamentos/${idPais}`);
      setDepartamentos(response.data);
      setCiudades([]); // Resetear ciudades
      setFormData(prev => ({ 
        ...prev, 
        ID_DEPARTAMENTO: "",
        ID_CIUDAD: "",
        Departamento: "",
        Ciudad: ""
      }));
    } catch (err) {
      toast.error("Error al cargar departamentos");
    }
  };

  // Cargar ciudades cuando cambia el departamento
  const handleDepartamentoChange = async (idDepartamento) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/ciudades/${idDepartamento}`);
      setCiudades(response.data);
      setFormData(prev => ({ 
        ...prev, 
        ID_CIUDAD: "",
        Ciudad: ""
      }));
    } catch (err) {
      toast.error("Error al cargar ciudades");
    }
  };

  // Actualizar nombres de ubicación cuando se selecciona
  const handleCiudadChange = (e) => {
    const ciudadId = e.target.value;
    const ciudadSeleccionada = ciudades.find(c => c.ID_CIUDAD == ciudadId);
    
    setFormData(prev => ({
      ...prev,
      ID_CIUDAD: ciudadId,
      Ciudad: ciudadSeleccionada ? ciudadSeleccionada.Nombre : ""
    }));
  };

  // Validar formulario
  const validateForm = () => {
    const requiredFields = [
      { field: "PrimerNombre", name: "Primer nombre" },
      { field: "PrimerApellido", name: "Primer apellido" },
      { field: "CorreoElectronico", name: "Correo electrónico" },
      { field: "NumTelefono", name: "Teléfono" },
      { field: "NombreUsuario", name: "Nombre de usuario" },
      { field: "Edad", name: "Edad" },
      { field: "FechaNacimiento", name: "Fecha de nacimiento" },
      { field: "ID_CIUDAD", name: "Ciudad" },
      { field: "ID_TIPO_DOCUMENTO", name: "Tipo de documento" },
      { field: "NumeroDocumento", name: "Número de documento" }
    ];

    for (const { field, name } of requiredFields) {
      if (!formData[field]) {
        toast.error(`${name} es requerido`);
        return false;
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.CorreoElectronico)) {
      toast.error("Correo electrónico inválido");
      return false;
    }

    if (isNaN(formData.Edad) || formData.Edad < 1 || formData.Edad > 120) {
      toast.error("Edad debe ser entre 1 y 120");
      return false;
    }

    if (!/^[0-9]{8,15}$/.test(formData.NumTelefono)) {
      toast.error("Teléfono debe contener solo números (8-15 dígitos)");
      return false;
    }

    return true;
  };

  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);

    try {
      const payload = { 
        ...formData,
        // Solo enviar los IDs necesarios al backend
        ID_PAIS: formData.ID_PAIS,
        ID_DEPARTAMENTO: formData.ID_DEPARTAMENTO,
        ID_CIUDAD: formData.ID_CIUDAD
      };
      
      // No enviar contraseña si está vacía
      if (!payload.Contrasena) delete payload.Contrasena;
      // No enviar los nombres de ubicación al backend
      delete payload.Pais;
      delete payload.Departamento;
      delete payload.Ciudad;

      await axios.put(`http://localhost:4000/api/usuario/${userId}`, payload);
      
      toast.success("¡Datos actualizados correctamente!");
      navigate("/ajustes");
    } catch (err) {
      console.error("Error al actualizar:", err);
      toast.error(err.response?.data?.message || "Error al actualizar datos");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <Loader2 className="animate-spin" size={32} />
        <p>Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button 
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <span className="logo">JAMFLOK</span>
        </div>
        
        <div className="nav-items">
          <div className="nav-item" onClick={() => navigate("/")}>
            <Home size={20} />
            <span>Inicio</span>
          </div>
          <div className="nav-item active">
            <SlidersHorizontal size={20} />
            <span>Ajustes</span>
          </div>
          <div className="nav-item" onClick={() => navigate("/reseñas")}>
            <Star size={20} />
            <span>Reseñas</span>
          </div>
        </div>
        
        <div className="nav-item logout" onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}>
          <LogOut size={20} />
          <span>Cerrar sesión</span>
        </div>
      </div>

      <div className="main-content">
        <header className="content-header">
          <h1>Editar Perfil</h1>
          <p>Actualiza tu información personal</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="cards-grid">
            {/* Sección Datos Personales */}
            <div className="info-card">
              <div className="card-header">
                <h2>Datos Personales</h2>
              </div>
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group">
                    <label>Primer Nombre *</label>
                    <input
                      name="PrimerNombre"
                      value={formData.PrimerNombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Segundo Nombre</label>
                    <input
                      name="SegundoNombre"
                      value={formData.SegundoNombre}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Primer Apellido *</label>
                    <input
                      name="PrimerApellido"
                      value={formData.PrimerApellido}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Segundo Apellido</label>
                    <input
                      name="SegundoApellido"
                      value={formData.SegundoApellido}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
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
                  <div className="form-group">
                    <label>Fecha Nacimiento *</label>
                    <input
                      type="date"
                      name="FechaNacimiento"
                      value={formData.FechaNacimiento}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Tipo Documento *</label>
                  <select
                    name="ID_TIPO_DOCUMENTO"
                    value={formData.ID_TIPO_DOCUMENTO}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    {tiposDocumento.map(doc => (
                      <option key={doc.ID_TIPO_DOCUMENTO} value={doc.ID_TIPO_DOCUMENTO}>
                        {doc.Nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Número Documento *</label>
                  <input
                    name="NumeroDocumento"
                    value={formData.NumeroDocumento}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Sección Ubicación */}
            <div className="info-card">
              <div className="card-header">
                <h2>Ubicación</h2>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>País *</label>
                  <select
                    name="ID_PAIS"
                    value={formData.ID_PAIS}
                    onChange={(e) => {
                      handlePaisChange(e.target.value);
                      const paisSeleccionado = paises.find(p => p.ID_PAIS == e.target.value);
                      setFormData(prev => ({
                        ...prev,
                        ID_PAIS: e.target.value,
                        Pais: paisSeleccionado ? paisSeleccionado.Nombre : ""
                      }));
                    }}
                    required
                  >
                    <option value="">Seleccione país...</option>
                    {paises.map(pais => (
                      <option key={pais.ID_PAIS} value={pais.ID_PAIS}>
                        {pais.Nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Departamento *</label>
                  <select
                    name="ID_DEPARTAMENTO"
                    value={formData.ID_DEPARTAMENTO}
                    onChange={(e) => {
                      handleDepartamentoChange(e.target.value);
                      const deptoSeleccionado = departamentos.find(d => d.ID_DEPARTAMENTO == e.target.value);
                      setFormData(prev => ({
                        ...prev,
                        ID_DEPARTAMENTO: e.target.value,
                        Departamento: deptoSeleccionado ? deptoSeleccionado.Nombre : ""
                      }));
                    }}
                    disabled={!departamentos.length}
                    required
                  >
                    <option value="">Seleccione departamento...</option>
                    {departamentos.map(depto => (
                      <option key={depto.ID_DEPARTAMENTO} value={depto.ID_DEPARTAMENTO}>
                        {depto.Nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Ciudad *</label>
                  <select
                    name="ID_CIUDAD"
                    value={formData.ID_CIUDAD}
                    onChange={handleCiudadChange}
                    disabled={!ciudades.length}
                    required
                  >
                    <option value="">Seleccione ciudad...</option>
                    {ciudades.map(ciudad => (
                      <option key={ciudad.ID_CIUDAD} value={ciudad.ID_CIUDAD}>
                        {ciudad.Nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Sección Contacto y Cuenta */}
            <div className="info-card">
              <div className="card-header">
                <h2>Contacto</h2>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Correo Electrónico *</label>
                  <input
                    type="email"
                    name="CorreoElectronico"
                    value={formData.CorreoElectronico}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Teléfono *</label>
                  <input
                    name="NumTelefono"
                    value={formData.NumTelefono}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Nombre Usuario *</label>
                  <input
                    name="NombreUsuario"
                    value={formData.NombreUsuario}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group password-field">
                  <label>Cambiar Contraseña</label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="Contrasena"
                      value={formData.Contrasena}
                      onChange={handleChange}
                      placeholder="Nueva contraseña"
                    />
                    <button 
                      type="button" 
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button"
              className="secondary-button"
              onClick={() => navigate("/ajustes")}
              disabled={isSaving}
            >
              Cancelar
            </button>
            
            <button 
              type="submit"
              className="primary-button"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <span>Guardar Cambios</span>
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPanel;