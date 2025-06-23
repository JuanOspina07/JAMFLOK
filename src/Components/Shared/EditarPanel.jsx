import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2, Eye, EyeOff, ChevronRight } from "lucide-react";
import Sidebar from "./SideBar";
import "../Styles/EditarPanel.css";
import {
  Card,
  CardContent,
  CardHeader,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  InputAdornment,
  IconButton,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";

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
    ID_PAIS: "",
    ID_DEPARTAMENTO: "",
    ID_CIUDAD: "",
    ID_TIPO_DOCUMENTO: "",
    NumeroDocumento: "",
    Contrasena: "",
    Pais: "",
    Departamento: "",
    Ciudad: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [tiposDocumento, setTiposDocumento] = useState([]);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    const fetchInitialData = async () => {
      try {
        const [userData, paisesData, tiposDocData] = await Promise.all([
          axios.get(`http://localhost:4000/api/usuario/${userId}`),
          axios.get("http://localhost:4000/api/paises"),
          axios.get("http://localhost:4000/api/tipos-documento"),
        ]);

        setPaises(paisesData.data);
        setTiposDocumento(tiposDocData.data);

        const user = userData.data;
        let idPais = "",
          idDepartamento = "",
          idCiudad = "";

        // Map TipoDocumento to ID_TIPO_DOCUMENTO
        const tipoDoc = tiposDocData.data.find(
          (doc) => doc.Nombre === user.TipoDocumento
        );
        const idTipoDocumento = tipoDoc ? tipoDoc.ID_TIPO_DOCUMENTO : "";

        if (user.Pais) {
          // Fetch location IDs based on names
          const pais = paisesData.data.find((p) => p.Nombre === user.Pais);
          if (pais) {
            idPais = pais.ID_PAIS;
            const deptosResponse = await axios.get(
              `http://localhost:4000/api/departamentos/${idPais}`
            );
            setDepartamentos(deptosResponse.data);

            const depto = deptosResponse.data.find(
              (d) => d.Nombre === user.Departamento
            );
            if (depto) {
              idDepartamento = depto.ID_DEPARTAMENTO;
              const ciudadesResponse = await axios.get(
                `http://localhost:4000/api/ciudades/${idDepartamento}`
              );
              setCiudades(ciudadesResponse.data);

              const ciudad = ciudadesResponse.data.find(
                (c) => c.Nombre === user.Ciudad
              );
              if (ciudad) {
                idCiudad = ciudad.ID_CIUDAD;
              }
            }
          }
        }

        setFormData({
          PrimerNombre: user.PrimerNombre || "",
          SegundoNombre: user.SegundoNombre || "",
          PrimerApellido: user.PrimerApellido || "",
          SegundoApellido: user.SegundoApellido || "",
          CorreoElectronico: user.CorreoElectronico || "",
          NumTelefono: user.NumTelefono || "",
          NombreUsuario: user.NombreUsuario || "",
          Edad: user.Edad || "",
          FechaNacimiento: user.FechaNacimiento?.split("T")[0] || "",
          ID_PAIS: idPais,
          ID_DEPARTAMENTO: idDepartamento,
          ID_CIUDAD: idCiudad,
          ID_TIPO_DOCUMENTO: idTipoDocumento,
          NumeroDocumento: user.NumeroDocumento || "",
          Contrasena: "",
          Pais: user.Pais || "",
          Departamento: user.Departamento || "",
          Ciudad: user.Ciudad || "",
        });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaisChange = async (idPais) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/departamentos/${idPais}`
      );
      setDepartamentos(response.data);
      setCiudades([]);
      setFormData((prev) => ({
        ...prev,
        ID_PAIS: idPais,
        ID_DEPARTAMENTO: "",
        ID_CIUDAD: "",
        Departamento: "",
        Ciudad: "",
        Pais: paises.find((p) => p.ID_PAIS == idPais)?.Nombre || "",
      }));
    } catch (err) {
      toast.error("Error al cargar departamentos");
    }
  };

  const handleDepartamentoChange = async (idDepartamento) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/ciudades/${idDepartamento}`
      );
      setCiudades(response.data);
      setFormData((prev) => ({
        ...prev,
        ID_DEPARTAMENTO: idDepartamento,
        ID_CIUDAD: "",
        Ciudad: "",
        Departamento:
          departamentos.find((d) => d.ID_DEPARTAMENTO == idDepartamento)
            ?.Nombre || "",
      }));
    } catch (err) {
      toast.error("Error al cargar ciudades");
    }
  };

  const handleCiudadChange = (idCiudad) => {
    const ciudadSeleccionada = ciudades.find((c) => c.ID_CIUDAD == idCiudad);
    setFormData((prev) => ({
      ...prev,
      ID_CIUDAD: idCiudad,
      Ciudad: ciudadSeleccionada ? ciudadSeleccionada.Nombre : "",
    }));
  };

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
      { field: "NumeroDocumento", name: "Número de documento" },
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);

    try {
      const payload = {
        ...formData,
        ID_PAIS: formData.ID_PAIS,
        ID_DEPARTAMENTO: formData.ID_DEPARTAMENTO,
        ID_CIUDAD: formData.ID_CIUDAD,
      };

      if (!payload.Contrasena) delete payload.Contrasena;
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
        <CircularProgress className="animate-spin" size={32} />
        <Typography>Cargando datos...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <Typography className="error-message">{error}</Typography>
        <Button
          className="retry-button"
          onClick={() => window.location.reload()}
          variant="contained"
          color="error"
        >
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="ep-dashboard-layout">
      <Sidebar onLogout={() => localStorage.removeItem("idUsuario")} />
      <div className="ep-content-area">
        <header className="ep-content-header">
          <Typography variant="h1" className="ep-title">
            Editar Perfil
          </Typography>
          <Typography variant="body2" className="ep-subtitle">
            Actualiza tu información personal
          </Typography>
        </header>

        <form onSubmit={handleSubmit} className="ep-form">
          <Grid container spacing={3} className="ep-form-grid">
            {/* Datos Personales */}
            <Grid item xs={12} md={12}>
              <Card className="ep-info-panel">
                <CardHeader
                  title="Datos Personales"
                  className="ep-panel-header"
                />
                <CardContent className="ep-panel-content">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Primer Nombre *"
                        name="PrimerNombre"
                        value={formData.PrimerNombre}
                        onChange={handleChange}
                        required
                        fullWidth
                        variant="outlined"
                        className="ep-text-field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Segundo Nombre"
                        name="SegundoNombre"
                        value={formData.SegundoNombre}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        className="ep-text-field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Primer Apellido *"
                        name="PrimerApellido"
                        value={formData.PrimerApellido}
                        onChange={handleChange}
                        required
                        fullWidth
                        variant="outlined"
                        className="ep-text-field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Segundo Apellido"
                        name="SegundoApellido"
                        value={formData.SegundoApellido}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        className="ep-text-field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Edad *"
                        type="number"
                        name="Edad"
                        value={formData.Edad}
                        onChange={handleChange}
                        required
                        fullWidth
                        variant="outlined"
                        inputProps={{ min: 1, max: 120 }}
                        className="ep-text-field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Fecha Nacimiento *"
                        type="date"
                        name="FechaNacimiento"
                        value={formData.FechaNacimiento}
                        onChange={handleChange}
                        required
                        fullWidth
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                        className="ep-text-field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        className="ep-form-control"
                      >
                        <InputLabel id="ep-tipo-documento-label">
                          Tipo Documento *
                        </InputLabel>
                        <Select
                          labelId="ep-tipo-documento-label"
                          name="ID_TIPO_DOCUMENTO"
                          value={formData.ID_TIPO_DOCUMENTO}
                          onChange={handleChange}
                          required
                          label="Tipo Documento *"
                          displayEmpty
                          className="ep-select"
                        >
                          <MenuItem value="" className="ep-menu-item">
                            Seleccione...
                          </MenuItem>
                          {tiposDocumento.map((doc) => (
                            <MenuItem
                              key={doc.ID_TIPO_DOCUMENTO}
                              value={doc.ID_TIPO_DOCUMENTO}
                              className="ep-menu-item"
                            >
                              {doc.Nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Número Documento *"
                        name="NumeroDocumento"
                        value={formData.NumeroDocumento}
                        onChange={handleChange}
                        required
                        fullWidth
                        variant="outlined"
                        className="ep-text-field"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Ubicación */}
            <Grid item xs={12} md={12}>
              <Card className="ep-info-panel">
                <CardHeader title="Ubicación" className="ep-panel-header" />
                <CardContent className="ep-panel-content">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        className="ep-form-control"
                      >
                        <InputLabel id="ep-pais-label">País *</InputLabel>
                        <Select
                          labelId="ep-pais-label"
                          name="ID_PAIS"
                          value={formData.ID_PAIS}
                          onChange={(e) => handlePaisChange(e.target.value)}
                          required
                          label="País *"
                          displayEmpty
                          className="ep-select"
                        >
                          <MenuItem value="" className="ep-menu-item">
                            Seleccione país...
                          </MenuItem>
                          {paises.map((pais) => (
                            <MenuItem
                              key={pais.ID_PAIS}
                              value={pais.ID_PAIS}
                              className="ep-menu-item"
                            >
                              {pais.Nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        className="ep-form-control"
                      >
                        <InputLabel id="ep-departamento-label">
                          Departamento *
                        </InputLabel>
                        <Select
                          labelId="ep-departamento-label"
                          name="ID_DEPARTAMENTO"
                          value={formData.ID_DEPARTAMENTO}
                          onChange={(e) =>
                            handleDepartamentoChange(e.target.value)
                          }
                          disabled={!departamentos.length}
                          required
                          label="Departamento *"
                          displayEmpty
                          className="ep-select"
                        >
                          <MenuItem value="" className="ep-menu-item">
                            Seleccione departamento...
                          </MenuItem>
                          {departamentos.map((depto) => (
                            <MenuItem
                              key={depto.ID_DEPARTAMENTO}
                              value={depto.ID_DEPARTAMENTO}
                              className="ep-menu-item"
                            >
                              {depto.Nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        className="ep-form-control"
                      >
                        <InputLabel id="ep-ciudad-label">Ciudad *</InputLabel>
                        <Select
                          labelId="ep-ciudad-label"
                          name="ID_CIUDAD"
                          value={formData.ID_CIUDAD}
                          onChange={(e) => handleCiudadChange(e.target.value)}
                          disabled={!ciudades.length}
                          required
                          label="Ciudad *"
                          displayEmpty
                          className="ep-select"
                        >
                          <MenuItem value="" className="ep-menu-item">
                            Seleccione ciudad...
                          </MenuItem>
                          {ciudades.map((ciudad) => (
                            <MenuItem
                              key={ciudad.ID_CIUDAD}
                              value={ciudad.ID_CIUDAD}
                              className="ep-menu-item"
                            >
                              {ciudad.Nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Contacto y Cuenta */}
            <Grid item xs={12} md={12}>
              <Card className="ep-info-panel">
                <CardHeader title="Contacto" className="ep-panel-header" />
                <CardContent className="ep-panel-content">
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Correo Electrónico *"
                        type="email"
                        name="CorreoElectronico"
                        value={formData.CorreoElectronico}
                        onChange={handleChange}
                        required
                        fullWidth
                        variant="outlined"
                        className="ep-text-field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Teléfono *"
                        name="NumTelefono"
                        value={formData.NumTelefono}
                        onChange={handleChange}
                        required
                        fullWidth
                        variant="outlined"
                        className="ep-text-field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Nombre Usuario *"
                        name="NombreUsuario"
                        value={formData.NombreUsuario}
                        onChange={handleChange}
                        required
                        fullWidth
                        variant="outlined"
                        className="ep-text-field"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Cambiar Contraseña"
                        type={showPassword ? "text" : "password"}
                        name="Contrasena"
                        value={formData.Contrasena}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        placeholder="Nueva contraseña"
                        className="ep-text-field"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                className="ep-icon-btn"
                              >
                                {showPassword ? (
                                  <EyeOff size={18} className="ep-icon" />
                                ) : (
                                  <Eye size={18} className="ep-icon" />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <div className="ep-form-actions">
            
            <Button
              className="ep-save-btn"
              type="submit"
              disabled={isSaving}
              variant="contained"
              startIcon={
                isSaving ? <CircularProgress size={18} className="ep-spinner" /> : null
              }
              endIcon={
                !isSaving ? <ChevronRight size={18} className="ep-icon" /> : null
              }
            >
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </Button>
            <Button
              className="ep-cancel-btn"
              onClick={() => navigate("/ajustes")}
              disabled={isSaving}
              variant="outlined"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditarPanel;