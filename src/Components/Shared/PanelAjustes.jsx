import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import Sidebar from "./SideBar";
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

const PanelAjustes = () => {
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
      <div className="loading-container">
        <CircularProgress className="animate-spin" size={32} />
        <Typography>Cargando datos del usuario...</Typography>
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

  if (!userData) {
    return (
      <div className="error-container">
        <Typography className="error-message">
          No se encontraron datos del usuario
        </Typography>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar onLogout={() => localStorage.removeItem("idUsuario")} />
      <div className="main-content">
        <header className="content-header">
          <Typography variant="h1">Panel de Ajustes</Typography>
          <Typography variant="body2">
            Administra tu información personal y preferencias
          </Typography>
        </header>

        <Grid container spacing={3} className="cards-grid">
          {/* Datos Personales */}
          <Grid item xs={12} md={12}>
            <Card className="info-card">
              <CardHeader title="Datos Personales" className="card-header" />
              <CardContent className="card-body">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" className="info-label">
                      Primer Nombre
                    </Typography>
                    <Typography variant="body1" className="info-value">
                      {userData.PrimerNombre}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" className="info-label">
                      Segundo Nombre
                    </Typography>
                    <Typography variant="body1" className="info-value">
                      {userData.SegundoNombre || "No especificado"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" className="info-label">
                      Primer Apellido
                    </Typography>
                    <Typography variant="body1" className="info-value">
                      {userData.PrimerApellido}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" className="info-label">
                      Segundo Apellido
                    </Typography>
                    <Typography variant="body1" className="info-value">
                      {userData.SegundoApellido || "No especificado"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" className="info-label">
                      Tipo de Documento
                    </Typography>
                    <Typography variant="body1" className="info-value">
                      {userData.TipoDocumento}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" className="info-label">
                      Número de Documento
                    </Typography>
                    <Typography variant="body1" className="info-value">
                      {userData.NumeroDocumento}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Información de Contacto */}
          <Grid item xs={12} md={12}>
            <Card className="info-card">
              <CardHeader
                title="Información de Contacto"
                className="card-header"
              />
              <CardContent className="card-body">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" className="info-label">
                      Número de Teléfono
                    </Typography>
                    <Typography variant="body1" className="info-value">
                      {userData.NumTelefono}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" className="info-label">
                      Correo Electrónico
                    </Typography>
                    <Typography variant="body1" className="info-value">
                      {userData.CorreoElectronico}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" className="info-label">
                      Ubicación
                    </Typography>
                    <Typography
                      variant="body1"
                      className="info-value"
                    >{`${userData.Ciudad}, ${userData.Departamento}, ${userData.Pais}`}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Cuenta */}
          <Grid item xs={12} md={12}>
            <Card className="info-card">
              <CardHeader title="Cuenta" className="card-header" />
              <CardContent className="card-body">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" className="info-label">
                      Nombre de Usuario
                    </Typography>
                    <Typography variant="body1" className="info-value">
                      {userData.NombreUsuario}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" className="info-label">
                      Rol
                    </Typography>
                    <Typography variant="body1" className="info-value">
                      {userData.NombreRol}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="body2" className="info-label">
                      Contraseña
                    </Typography>
                    <Typography variant="body1" className="info-value">
                      ********
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <div className="form-actions">
          <Button
            className="primary-button"
            onClick={handleEditar}
            variant="contained"
            endIcon={<ChevronRight size={18} />}
          >
            Editar información
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PanelAjustes;
