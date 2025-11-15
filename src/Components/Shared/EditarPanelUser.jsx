import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ChevronRight, ChevronDown, Eye, EyeOff, Loader2 } from "lucide-react";
import Sidebar from "./SideBarCliente";
import {
  Typography,
  Button,
  Grid,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Box,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";

const EditarPanelUser = () => {
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
  const [expanded, setExpanded] = useState(false);
  const [hoveredAccordion, setHoveredAccordion] = useState(null);

  const theme = {
    dark: "#1a1a1a",
    darker: "#2c2c2c",
    accent: "#C6A664",
    accentHover: "#d9b97a",
    white: "#ffffff",
    gray: "#e0e0e0",
    lightGray: "#f5f5f5",
    border: "#444",
    error: "#ff6b6b",
  };

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

        const tipoDoc = tiposDocData.data.find(
          (doc) => doc.Nombre === user.TipoDocumento
        );
        const idTipoDocumento = tipoDoc ? tipoDoc.ID_TIPO_DOCUMENTO : "";

        if (user.Pais) {
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

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
      navigate("/ajustesCliente");
    } catch (err) {
      console.error("Error al actualizar:", err);
      toast.error(err.response?.data?.message || "Error al actualizar datos");
    } finally {
      setIsSaving(false);
    }
  };

  const styles = {
    wrapper: {
      display: "flex",
      minHeight: "100vh",
      color: theme.white,
    },
    mainContent: {
      flex: 1,
      padding: { xs: 2, md: 4 },
      maxWidth: "1200px",
      margin: "0 auto",
      width: "100%",
    },
    header: {
      marginBottom: 4,
      textAlign: "center",
    },
    title: {
      fontSize: { xs: "2rem", md: "2.5rem" },
      fontWeight: 700,
      color: theme.accent,
      marginBottom: 1,
      textAlign: "center",
    },
    accordionContainer: {
      width: "100%",
      marginBottom: 4,
    },
    accordion: (isHovered) => ({
      backgroundColor: theme.darker,
      borderRadius: "16px",
      boxShadow: isHovered
        ? "0 8px 32px rgba(0, 0, 0, 0.4)"
        : "0 4px 20px rgba(0, 0, 0, 0.25)",
      transition: "all 0.3s ease",
      marginBottom: 2,
      transform: isHovered ? "translateY(-4px)" : "translateY(0)",
      "&:before": { display: "none" },
      overflow: "hidden",
    }),
    accordionSummary: {
      minHeight: 70,
      backgroundColor: "#333",
      borderRadius: "16px 16px 0 0",
      transition: "all 0.3s ease",
      "&.Mui-expanded": {
        minHeight: 70,
        backgroundColor: "#3a3a3a",
        borderRadius: "16px 16px 0 0",
      },
    },
    accordionTitle: {
      fontWeight: 600,
      color: theme.accent,
      fontSize: "1.1rem",
    },
    accordionDetails: (isHovered) => ({
      padding: 3,
      backgroundColor: theme.darker,
      borderRadius: "0 0 16px 16px",
      transition: "all 0.3s ease",
      transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    }),
    textField: {
      "& .MuiInputBase-root": {
        backgroundColor: "#2a2a2a",
        borderRadius: "12px",
        transition: "all 0.2s ease",
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.accent,
          transform: "scale(1.02)",
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.border,
        borderWidth: "2px",
        transition: "all 0.2s ease",
      },
      "& .MuiInputLabel-root": {
        color: theme.gray,
        fontWeight: 500,
        "&.Mui-focused": {
          color: theme.accent,
        },
      },
      "& .MuiInputBase-input": {
        color: theme.white,
        fontWeight: 400,
        fontSize: "0.95rem",
      },
    },
    select: {
      "& .MuiInputBase-root": {
        backgroundColor: "#2a2a2a",
        borderRadius: "12px",
        transition: "all 0.2s ease",
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.accent,
          transform: "scale(1.02)",
        },
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.border,
        borderWidth: "2px",
      },
      "& .MuiInputLabel-root": {
        color: theme.gray,
        fontWeight: 500,
        "&.Mui-focused": {
          color: theme.accent,
        },
      },
      "& .MuiSelect-select": {
        color: theme.white,
      },
    },
    menuItem: {
      color: theme.white,
      "&:hover": {
        backgroundColor: "#3a3a3a",
      },
    },
    gridContainer: {
      width: "100%",
      margin: 0,
    },
    gridItem: {
      padding: "8px !important",
      flexBasis: "32% !important",
      maxWidth: "32% !important",
      flexGrow: 1,
    },
    actionsPanel: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 2,
      marginTop: 4,
    },
    cancelButton: {
      backgroundColor: theme.dark,
      color: theme.white,
      fontWeight: 600,
      padding: "22px 24px",
      borderRadius: "36px",
      textTransform: "none",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      marginTop: "1rem",
      maxHeight: "60px",
      justifyContent: "start",
      marginRight: "48rem",
      "&:hover": {
        backgroundColor: theme.darker,
        transform: "scale(1.05)",
        boxShadow: "0 4px 15px rgba(198, 166, 100, 0.3)",
      },
    },
    primaryButton: {
      backgroundColor: theme.accent,
      color: theme.dark,
      maxWidth: "230px",
      fontWeight: 600,
      padding: "12px 24px",
      borderRadius: "8px",
      textTransform: "none",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: theme.accentHover,
        transform: "scale(1.05)",
        boxShadow: "0 4px 15px rgba(198, 166, 100, 0.3)",
      },
      "&:disabled": {
        backgroundColor: "#555",
        color: theme.gray,
      },
    },
    loadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: theme.dark,
    },
    spinner: {
      color: theme.accent,
    },
    loadingText: {
      color: theme.gray,
      marginTop: 2,
      fontSize: "1.1rem",
    },
    errorContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: theme.dark,
      padding: 3,
    },
    errorMessage: {
      color: theme.error,
      fontSize: "1.25rem",
      marginBottom: 3,
      textAlign: "center",
    },
    retryButton: {
      backgroundColor: theme.error,
      color: theme.white,
      fontWeight: 600,
      padding: "12px 24px",
      borderRadius: "8px",
      textTransform: "none",
      "&:hover": {
        backgroundColor: "#ff8787",
      },
    },
  };

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress sx={styles.spinner} size={50} />
        <Typography sx={styles.loadingText}>Cargando datos...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.errorContainer}>
        <Typography sx={styles.errorMessage}>{error}</Typography>
        <Button
          sx={styles.retryButton}
          onClick={() => window.location.reload()}
          variant="contained"
        >
          Reintentar
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={styles.wrapper}>
      <Sidebar onLogout={() => localStorage.removeItem("idUsuario")} />
      <Container component="main" sx={styles.mainContent}>
        <Box sx={styles.header}>
          <Typography variant="h1" sx={styles.title}>
            Editar Perfil
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={styles.accordionContainer}>
            {/* Datos Personales */}
            <Accordion
              expanded={expanded === "datos-personales"}
              onChange={handleAccordionChange("datos-personales")}
              sx={styles.accordion(hoveredAccordion === "datos-personales")}
              onMouseEnter={() => setHoveredAccordion("datos-personales")}
              onMouseLeave={() => setHoveredAccordion(null)}
            >
              <AccordionSummary
                expandIcon={<ChevronDown color={theme.accent} />}
                sx={styles.accordionSummary}
              >
                <Typography sx={styles.accordionTitle}>
                  Datos Personales
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={styles.accordionDetails(
                  hoveredAccordion === "datos-personales"
                )}
              >
                <Grid container spacing={2} sx={styles.gridContainer}>
                  <Grid item xs={12} md={4} sx={styles.gridItem}>
                    <TextField
                      label="Primer Nombre *"
                      name="PrimerNombre"
                      value={formData.PrimerNombre}
                      onChange={handleChange}
                      required
                      fullWidth
                      size="small"
                      variant="outlined"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sx={styles.gridItem}>
                    <TextField
                      label="Segundo Nombre"
                      name="SegundoNombre"
                      value={formData.SegundoNombre}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      variant="outlined"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sx={styles.gridItem}>
                    <TextField
                      label="Primer Apellido *"
                      name="PrimerApellido"
                      value={formData.PrimerApellido}
                      onChange={handleChange}
                      required
                      fullWidth
                      size="small"
                      variant="outlined"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sx={styles.gridItem}>
                    <TextField
                      label="Segundo Apellido"
                      name="SegundoApellido"
                      value={formData.SegundoApellido}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      variant="outlined"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sx={styles.gridItem}>
                    <TextField
                      label="Edad *"
                      type="number"
                      name="Edad"
                      value={formData.Edad}
                      onChange={handleChange}
                      required
                      fullWidth
                      size="small"
                      variant="outlined"
                      inputProps={{ min: 1, max: 120 }}
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sx={styles.gridItem}>
                    <TextField
                      label="Fecha Nacimiento *"
                      type="date"
                      name="FechaNacimiento"
                      value={formData.FechaNacimiento}
                      onChange={handleChange}
                      required
                      fullWidth
                      size="small"
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sx={styles.gridItem}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel sx={{ color: theme.gray }}>
                        Tipo Documento *
                      </InputLabel>
                      <Select
                        name="ID_TIPO_DOCUMENTO"
                        value={formData.ID_TIPO_DOCUMENTO}
                        onChange={handleChange}
                        required
                        label="Tipo Documento *"
                        sx={styles.select}
                      >
                        <MenuItem value="" sx={styles.menuItem}>
                          Seleccione...
                        </MenuItem>
                        {tiposDocumento.map((doc) => (
                          <MenuItem
                            key={doc.ID_TIPO_DOCUMENTO}
                            value={doc.ID_TIPO_DOCUMENTO}
                            sx={styles.menuItem}
                          >
                            {doc.Nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} sx={styles.gridItem}>
                    <TextField
                      label="Número Documento *"
                      name="NumeroDocumento"
                      value={formData.NumeroDocumento}
                      onChange={handleChange}
                      required
                      fullWidth
                      size="small"
                      variant="outlined"
                      sx={styles.textField}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Ubicación */}
            <Accordion
              expanded={expanded === "ubicacion"}
              onChange={handleAccordionChange("ubicacion")}
              sx={styles.accordion(hoveredAccordion === "ubicacion")}
              onMouseEnter={() => setHoveredAccordion("ubicacion")}
              onMouseLeave={() => setHoveredAccordion(null)}
            >
              <AccordionSummary
                expandIcon={<ChevronDown color={theme.accent} />}
                sx={styles.accordionSummary}
              >
                <Typography sx={styles.accordionTitle}>Ubicación</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={styles.accordionDetails(hoveredAccordion === "ubicacion")}
              >
                <Grid container spacing={2} sx={styles.gridContainer}>
                  <Grid item xs={12} md={4} sx={styles.gridItem}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel sx={{ color: theme.gray }}>País *</InputLabel>
                      <Select
                        name="ID_PAIS"
                        value={formData.ID_PAIS}
                        onChange={(e) => handlePaisChange(e.target.value)}
                        required
                        label="País *"
                        sx={styles.select}
                      >
                        <MenuItem value="" sx={styles.menuItem}>
                          Seleccione país...
                        </MenuItem>
                        {paises.map((pais) => (
                          <MenuItem
                            key={pais.ID_PAIS}
                            value={pais.ID_PAIS}
                            sx={styles.menuItem}
                          >
                            {pais.Nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} sx={styles.gridItem}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel sx={{ color: theme.gray }}>
                        Departamento *
                      </InputLabel>
                      <Select
                        name="ID_DEPARTAMENTO"
                        value={formData.ID_DEPARTAMENTO}
                        onChange={(e) =>
                          handleDepartamentoChange(e.target.value)
                        }
                        disabled={!departamentos.length}
                        required
                        label="Departamento *"
                        sx={styles.select}
                      >
                        <MenuItem value="" sx={styles.menuItem}>
                          Seleccione departamento...
                        </MenuItem>
                        {departamentos.map((depto) => (
                          <MenuItem
                            key={depto.ID_DEPARTAMENTO}
                            value={depto.ID_DEPARTAMENTO}
                            sx={styles.menuItem}
                          >
                            {depto.Nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4} sx={styles.gridItem}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel sx={{ color: theme.gray }}>
                        Ciudad *
                      </InputLabel>
                      <Select
                        name="ID_CIUDAD"
                        value={formData.ID_CIUDAD}
                        onChange={(e) => handleCiudadChange(e.target.value)}
                        disabled={!ciudades.length}
                        required
                        label="Ciudad *"
                        sx={styles.select}
                      >
                        <MenuItem value="" sx={styles.menuItem}>
                          Seleccione ciudad...
                        </MenuItem>
                        {ciudades.map((ciudad) => (
                          <MenuItem
                            key={ciudad.ID_CIUDAD}
                            value={ciudad.ID_CIUDAD}
                            sx={styles.menuItem}
                          >
                            {ciudad.Nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>

            {/* Contacto y Cuenta */}
            <Accordion
              expanded={expanded === "contacto"}
              onChange={handleAccordionChange("contacto")}
              sx={styles.accordion(hoveredAccordion === "contacto")}
              onMouseEnter={() => setHoveredAccordion("contacto")}
              onMouseLeave={() => setHoveredAccordion(null)}
            >
              <AccordionSummary
                expandIcon={<ChevronDown color={theme.accent} />}
                sx={styles.accordionSummary}
              >
                <Typography sx={styles.accordionTitle}>
                  Contacto y Cuenta
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={styles.accordionDetails(hoveredAccordion === "contacto")}
              >
                <Grid container spacing={2} sx={styles.gridContainer}>
                  <Grid item xs={12} md={4} sx={styles.gridItem}>
                    <TextField
                      label="Correo Electrónico *"
                      type="email"
                      name="CorreoElectronico"
                      value={formData.CorreoElectronico}
                      onChange={handleChange}
                      required
                      fullWidth
                      size="small"
                      variant="outlined"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sx={styles.gridItem}>
                    <TextField
                      label="Teléfono *"
                      name="NumTelefono"
                      value={formData.NumTelefono}
                      onChange={handleChange}
                      required
                      fullWidth
                      size="small"
                      variant="outlined"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sx={styles.gridItem}>
                    <TextField
                      label="Nombre Usuario *"
                      name="NombreUsuario"
                      value={formData.NombreUsuario}
                      onChange={handleChange}
                      required
                      fullWidth
                      size="small"
                      variant="outlined"
                      sx={styles.textField}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sx={styles.gridItem}>
                    <TextField
                      label="Cambiar Contraseña"
                      type={showPassword ? "text" : "password"}
                      name="Contrasena"
                      value={formData.Contrasena}
                      onChange={handleChange}
                      fullWidth
                      size="small"
                      variant="outlined"
                      placeholder="Nueva contraseña"
                      sx={styles.textField}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                              sx={{ color: theme.gray }}
                            >
                              {showPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box sx={styles.actionsPanel}>
            <Button
              sx={styles.cancelButton}
              onClick={() => navigate("/ajustesCliente")}
              disabled={isSaving}
              variant="outlined"
            >
              Cancelar
            </Button>
            <Button
              sx={styles.primaryButton}
              type="submit"
              disabled={isSaving}
              variant="contained"
              endIcon={
                isSaving ? (
                  <CircularProgress size={16} sx={{ color: theme.dark }} />
                ) : (
                  <ChevronRight size={20} />
                )
              }
            >
              {isSaving ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default EditarPanelUser;