import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronRight, ChevronDown } from "lucide-react";
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
} from "@mui/material";

const PanelAjustesCliente = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [hoveredAccordion, setHoveredAccordion] = useState(null);
  const userId = localStorage.getItem("idUsuario");

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

    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/usuario/${userId}`
        );
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError("Error al cargar datos del usuario");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleEditar = () => {
    const rolId = localStorage.getItem("idRol");
    switch (rolId) {
      case "1":
        navigate("/Editar-panel");
        break;
      case "2":
        navigate("/Editar-panel-cliente");
        break;
      default:
        console.warn("Rol no reconocido:", rolId);
        break;
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
        "&.Mui-readOnly": {
          color: theme.gray,
          WebkitTextFillColor: theme.gray,
        },
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
      marginTop: 4,
    },
    primaryButton: {
      backgroundColor: theme.accent,
      color: theme.dark,
      fontWeight: 600,
      padding: "12px 24px",
      borderRadius: "28px",
      textTransform: "none",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: theme.accentHover,
        transform: "scale(1.05)",
        boxShadow: "0 4px 15px rgba(198, 166, 100, 0.3)",
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
        <Typography sx={styles.loadingText}>
          Cargando datos del usuario...
        </Typography>
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

  if (!userData) {
    return (
      <Box sx={styles.errorContainer}>
        <Typography sx={styles.errorMessage}>
          No se encontraron datos del usuario
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.wrapper}>
      <Sidebar onLogout={() => localStorage.removeItem("idUsuario")} />
      <Container component="main" sx={styles.mainContent}>
        <Box sx={styles.header}>
          <Typography variant="h1" sx={styles.title}>
            Panel de Ajustes
          </Typography>
        </Box>

        <Box sx={styles.accordionContainer}>
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
                <Grid item sx={styles.gridItem}>
                  <TextField
                    label="Primer Nombre"
                    value={userData.PrimerNombre}
                    fullWidth
                    size="small"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item sx={styles.gridItem}>
                  <TextField
                    label="Segundo Nombre"
                    value={userData.SegundoNombre || "No especificado"}
                    fullWidth
                    size="small"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={4} sx={styles.gridItem}>
                  <TextField
                    label="Primer Apellido"
                    value={userData.PrimerApellido}
                    fullWidth
                    size="small"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={4} sx={styles.gridItem}>
                  <TextField
                    label="Segundo Apellido"
                    value={userData.SegundoApellido || "No especificado"}
                    fullWidth
                    size="small"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={4} sx={styles.gridItem}>
                  <TextField
                    label="Tipo de Documento"
                    value={userData.TipoDocumento}
                    fullWidth
                    size="small"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={4} sx={styles.gridItem}>
                  <TextField
                    label="Número de Documento"
                    value={userData.NumeroDocumento}
                    fullWidth
                    size="small"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={styles.textField}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

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
                Información de Contacto
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={styles.accordionDetails(hoveredAccordion === "contacto")}
            >
              <Grid container spacing={2} sx={styles.gridContainer}>
                <Grid item xs={12} md={4} sx={styles.gridItem}>
                  <TextField
                    label="Número de Teléfono"
                    value={userData.NumTelefono}
                    fullWidth
                    size="small"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={4} sx={styles.gridItem}>
                  <TextField
                    label="Correo Electrónico"
                    value={userData.CorreoElectronico}
                    fullWidth
                    size="small"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={4} sx={styles.gridItem}>
                  <TextField
                    label="Ubicación"
                    value={`${userData.Ciudad}, ${userData.Departamento}, ${userData.Pais}`}
                    fullWidth
                    size="small"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={styles.textField}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "cuenta"}
            onChange={handleAccordionChange("cuenta")}
            sx={styles.accordion(hoveredAccordion === "cuenta")}
            onMouseEnter={() => setHoveredAccordion("cuenta")}
            onMouseLeave={() => setHoveredAccordion(null)}
          >
            <AccordionSummary
              expandIcon={<ChevronDown color={theme.accent} />}
              sx={styles.accordionSummary}
            >
              <Typography sx={styles.accordionTitle}>Cuenta</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={styles.accordionDetails(hoveredAccordion === "cuenta")}
            >
              <Grid container spacing={2} sx={styles.gridContainer}>
                <Grid item xs={12} md={4} sx={styles.gridItem}>
                  <TextField
                    label="Nombre de Usuario"
                    value={userData.NombreUsuario}
                    fullWidth
                    size="small"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={4} sx={styles.gridItem}>
                  <TextField
                    label="Rol"
                    value={userData.NombreRol}
                    fullWidth
                    size="small"
                    variant="outlined"
                    InputProps={{ readOnly: true }}
                    sx={styles.textField}
                  />
                </Grid>
                <Grid item xs={12} md={4} sx={styles.gridItem}>
                  <TextField
                    label="Contraseña"
                    value="********"
                    fullWidth
                    size="small"
                    variant="outlined"
                    type="password"
                    InputProps={{ readOnly: true }}
                    sx={styles.textField}
                  />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Box sx={styles.actionsPanel}>
          <Button
            sx={styles.primaryButton}
            onClick={handleEditar}
            variant="contained"
            endIcon={<ChevronRight size={20} />}
            size="large"
          >
            Editar información
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default PanelAjustesCliente;
