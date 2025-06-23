import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import Sidebar from "./SideBarCliente";
import "../Styles/PanelAjustes.css";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";

const PanelAjustesCliente = () => {
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
    

  if (loading) {
    return (
      <div className="vortex-loading-container">
        <CircularProgress className="vortex-spinner" size={40} />
        <Typography className="vortex-loading-text">
          Cargando datos del usuario...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div className="vortex-error-container">
        <Typography className="vortex-error-message">{error}</Typography>
        <Button
          className="vortex-retry-button"
          onClick={() => window.location.reload()}
          variant="contained"
        >
          Reintentar
        </Button>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="vortex-error-container">
        <Typography className="vortex-error-message">
          No se encontraron datos del usuario
        </Typography>
      </div>
    );
  }

  return (
    <div className="vortex-dashboard-wrapper">
      <Sidebar onLogout={() => localStorage.removeItem("idUsuario")} />
      <main className="vortex-main-content">
        <header className="vortex-content-header">
          <Typography variant="h1" className="vortex-title">
           Panel de Ajustes
          </Typography>
         
        </header>

        <Grid container spacing={4} className="vortex-cards-grid">
          {/* Datos Personales */}
          <Grid item xs={12}>
            <Card className="vortex-info-card">
              <CardHeader
                title="Datos Personales"
                className="vortex-card-header"
              />
              <CardContent className="vortex-card-body">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" className="vortex-info-label">
                      Primer Nombre
                    </Typography>
                    <Typography variant="body1" className="vortex-info-value">
                      {userData.PrimerNombre}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" className="vortex-info-label">
                      Segundo Nombre
                    </Typography>
                    <Typography variant="body1" className="vortex-info-value">
                      {userData.SegundoNombre || "No especificado"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" className="vortex-info-label">
                      Primer Apellido
                    </Typography>
                    <Typography variant="body1" className="vortex-info-value">
                      {userData.PrimerApellido}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" className="vortex-info-label">
                      Segundo Apellido
                    </Typography>
                    <Typography variant="body1" className="vortex-info-value">
                      {userData.SegundoApellido || "No especificado"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" className="vortex-info-label">
                      Tipo de Documento
                    </Typography>
                    <Typography variant="body1" className="vortex-info-value">
                      {userData.TipoDocumento}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" className="vortex-info-label">
                      Número de Documento
                    </Typography>
                    <Typography variant="body1" className="vortex-info-value">
                      {userData.NumeroDocumento}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Información de Contacto */}
          <Grid item xs={12}>
            <Card className="vortex-info-card">
              <CardHeader
                title="Información de Contacto"
                className="vortex-card-header"
              />
              <CardContent className="vortex-card-body">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" className="vortex-info-label">
                      Número de Teléfono
                    </Typography>
                    <Typography variant="body1" className="vortex-info-value">
                      {userData.NumTelefono}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" className="vortex-info-label">
                      Correo Electrónico
                    </Typography>
                    <Typography variant="body1" className="vortex-info-value">
                      {userData.CorreoElectronico}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" className="vortex-info-label">
                      Ubicación
                    </Typography>
                    <Typography variant="body1" className="vortex-info-value">
                      {`${userData.Ciudad}, ${userData.Departamento}, ${userData.Pais}`}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Cuenta */}
          <Grid item xs={12}>
            <Card className="vortex-info-card">
              <CardHeader title="Cuenta" className="vortex-card-header" />
              <CardContent className="vortex-card-body">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" className="vortex-info-label">
                      Nombre de Usuario
                    </Typography>
                    <Typography variant="body1" className="vortex-info-value">
                      {userData.NombreUsuario}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" className="vortex-info-label">
                      Rol
                    </Typography>
                    <Typography variant="body1" className="vortex-info-value">
                      {userData.NombreRol}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" className="vortex-info-label">
                      Contraseña
                    </Typography>
                    <Typography variant="body1" className="vortex-info-value">
                      ********
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <div className="vortex-actions-panel">
          <Button
            className="vortex-primary-button"
            onClick={handleEditar}
            variant="contained"
            endIcon={<ChevronRight size={20} />}
          >
            Editar información
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PanelAjustesCliente;