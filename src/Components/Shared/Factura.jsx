import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  CircularProgress,
  Alert,
  Dialog,
} from "@mui/material";
//Que viva la chocha
const Factura = ({ idFactura, onClose }) => {
  const [factura, setFactura] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFactura = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/facturas/${idFactura}`);
        setFactura(response.data);
      } catch (error) {
        setError(error.response?.data?.message || "Error al cargar la factura");
      } finally {
        setLoading(false);
      }
    };
    if (idFactura) {
      fetchFactura();
    } else {
      setError("ID de factura no válido");
      setLoading(false);
    }
  }, [idFactura]);

  const handleDownload = () => {
    window.location.href = `http://localhost:4000/api/facturas/${idFactura}/descargar`;
  };

  // Función para formatear precios
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0, 
      maximumFractionDigits: 4, 
    }).format(price);
  };

  // Calcular el total
  const total = factura.reduce((sum, detalle) => sum + (detalle.PrecioUnitario * detalle.Cantidad), 0);

  if (loading) {
    return (
      <Box sx={{ 
        textAlign: "center", 
        py: 5,
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        borderRadius: '20px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(198, 166, 100, 0.4)',
        maxWidth: '700px',
        margin: '30px auto',
      }}>
        <CircularProgress sx={{ color: "#c6a664" }} />
        <Typography variant="body1" sx={{ mt: 2, color: "#ffffff", fontFamily: "'Roboto', sans-serif" }}>
          Cargando factura...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        textAlign: "center", 
        py: 5,
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        borderRadius: '20px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(198, 166, 100, 0.4)',
        maxWidth: '700px',
        margin: '30px auto',
      }}>
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
        <Button 
          variant="contained" 
          onClick={onClose} 
          sx={{
            background: 'linear-gradient(45deg, #c6a664, #d4b97a)',
            color: '#2e2e2e',
            borderRadius: '25px',
            textTransform: 'none',
            fontWeight: 600,
            padding: '10px 30px',
            transition: 'all 0.4s ease',
            boxShadow: '0 5px 15px rgba(198, 166, 100, 0.4)',
            fontSize: '1rem',
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: '1px',
            '&:hover': {
              background: 'linear-gradient(45deg, #d4b97a, #c6a664)',
              transform: 'translateY(-2px)',
              boxShadow: '0 7px 20px rgba(198, 166, 100, 0.6)',
              color: '#ffffff',
            },
          }}
        >
          Cerrar
        </Button>
      </Box>
    );
  }

  if (!factura.length) {
    return (
      <Box sx={{ 
        textAlign: "center", 
        py: 5,
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        borderRadius: '20px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
        border: '1px solid rgba(198, 166, 100, 0.4)',
        maxWidth: '700px',
        margin: '30px auto',
      }}>
        <Typography variant="body1" sx={{ color: "#ffffff", fontFamily: "'Roboto', sans-serif", mb: 2 }}>
          No se encontró la factura.
        </Typography>
        <Button 
          variant="contained" 
          onClick={onClose} 
          sx={{
            background: 'linear-gradient(45deg, #c6a664, #d4b97a)',
            color: '#2e2e2e',
            borderRadius: '25px',
            textTransform: 'none',
            fontWeight: 600,
            padding: '10px 30px',
            transition: 'all 0.4s ease',
            boxShadow: '0 5px 15px rgba(198, 166, 100, 0.4)',
            fontSize: '1rem',
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: '1px',
            '&:hover': {
              background: 'linear-gradient(45deg, #d4b97a, #c6a664)',
              transform: 'translateY(-2px)',
              boxShadow: '0 7px 20px rgba(198, 166, 100, 0.6)',
              color: '#ffffff',
            },
          }}
        >
          Cerrar
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{
      fontFamily: "'Roboto', sans-serif",
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
      borderRadius: '20px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
      padding: '30px',
      maxWidth: '700px',
      margin: '30px auto',
      border: '1px solid rgba(198, 166, 100, 0.4)',
      color: '#ffffff',
    }}>
      <Box sx={{ 
        textAlign: "center", 
        marginBottom: '25px',
        paddingBottom: '15px',
        borderBottom: '3px solid #c6a664',
        position: 'relative',
      }}>
        <Box sx={{ 
          content: '""',
          position: 'absolute',
          bottom: '-2px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '50px',
          height: '3px',
          background: 'linear-gradient(90deg, #c6a664, #d4b97a)',
        }} />
        <Typography 
          variant="h5" 
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            color: '#c6a664',
            fontWeight: 700,
            fontSize: '26px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            marginBottom: '10px',
          }}
        >
          Factura #{factura[0].ID_FACTURA}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: '#ffffff', 
            fontSize: '1rem',
            marginTop: '10px',
            fontWeight: 500,
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          <strong>Fecha:</strong> {new Date(factura[0].FechaPago).toLocaleString()}
        </Typography>
      </Box>
      
      <Typography 
        variant="h6" 
        sx={{ 
          fontFamily: "'Montserrat', sans-serif",
          color: '#c6a664',
          fontWeight: 700,
          fontSize: '20px',
          margin: '25px 0 15px',
          textTransform: 'uppercase',
          position: 'relative',
          textAlign: 'center',
          padding: '10px',
          background: 'rgba(198, 166, 100, 0.15)',
          borderRadius: '8px',
          border: '1px solid rgba(198, 166, 100, 0.3)',
        }}
      >
        <strong style={{ color: "#ffffff" }}>DETALLES DE COMPRA</strong>
      </Typography>
      
      <TableContainer sx={{ 
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(198, 166, 100, 0.3)',
        backdropFilter: 'blur(5px)',
        marginBottom: '30px',
      }}>
        <Table>
          <TableHead>
            <TableRow sx={{ 
              background: 'linear-gradient(45deg, #c6a664, #d4b97a)',
            }}>
              <TableCell sx={{ 
                fontWeight: 700,
                color: '#2e2e2e',
                fontSize: '1rem',
                padding: '16px',
                borderBottom: '2px solid rgba(46, 46, 46, 0.5)',
                fontFamily: "'Montserrat', sans-serif",
              }}><strong>Producto</strong></TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  fontWeight: 700,
                  color: '#2e2e2e',
                  fontSize: '1rem',
                  padding: '16px',
                  borderBottom: '2px solid rgba(46, 46, 46, 0.5)',
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                <strong>Cantidad</strong>
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  fontWeight: 700,
                  color: '#2e2e2e',
                  fontSize: '1rem',
                  padding: '16px',
                  borderBottom: '2px solid rgba(46, 46, 46, 0.5)',
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                <strong>Precio Unitario</strong>
              </TableCell>
              <TableCell 
                align="center" 
                sx={{ 
                  fontWeight: 700,
                  color: '#2e2e2e',
                  fontSize: '1rem',
                  padding: '16px',
                  borderBottom: '2px solid rgba(46, 46, 46, 0.5)',
                  fontFamily: "'Montserrat', sans-serif",
                }}
              >
                <strong>Subtotal</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {factura.map((detalle) => (
              <TableRow 
                key={detalle.ID_FACTURA_DETALLE} 
                sx={{
                  '&:nth-of-type(even)': {
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(198, 166, 100, 0.12)',
                  },
                }}
              >
                <TableCell sx={{ 
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  padding: '14px 16px',
                  borderBottom: '1px solid rgba(198, 166, 100, 0.2)',
                  fontFamily: "'Roboto', sans-serif",
                }}>
                  {detalle.NombreProducto}
                </TableCell>
                <TableCell 
                  align="center" 
                  sx={{ 
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    padding: '14px 16px',
                    borderBottom: '1px solid rgba(198, 166, 100, 0.2)',
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  {formatPrice(Math.floor(detalle.Cantidad))}
                </TableCell>
                <TableCell 
                  align="center" 
                  sx={{ 
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    padding: '14px 16px',
                    borderBottom: '1px solid rgba(198, 166, 100, 0.2)',
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  ${formatPrice(detalle.PrecioUnitario)}
                </TableCell>
                <TableCell 
                  align="center" 
                  sx={{ 
                    color: '#ffffff',
                    fontSize: '0.95rem',
                    padding: '14px 16px',
                    borderBottom: '1px solid rgba(198, 166, 100, 0.2)',
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  ${formatPrice(detalle.PrecioUnitario * detalle.Cantidad)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ 
        background: 'rgba(198, 166, 100, 0.2)',
        borderRadius: '12px',
        padding: '15px 20px',
        textAlign: 'right',
        marginTop: '25px',
        marginBottom: '15px',
        border: '1px solid rgba(198, 166, 100, 0.3)',
      }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: "'Montserrat', sans-serif",
            color: '#c6a664',
            fontWeight: 700,
            fontSize: '22px',
            transition: 'transform 0.3s ease',
            margin: 0,
          }}
        >
          <strong>TOTAL: ${formatPrice(total)}</strong>
        </Typography>
      </Box>
      
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '20px',
        marginTop: '25px',
      }}>
        <Button 
          variant="contained" 
          onClick={onClose} 
          sx={{
            background: 'linear-gradient(45deg, #c6a664, #d4b97a)',
            color: '#2e2e2e',
            borderRadius: '25px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '10px 30px',
            border: 'none',
            transition: 'all 0.4s ease',
            boxShadow: '0 5px 15px rgba(198, 166, 100, 0.4)',
            fontSize: '1rem',
            minWidth: '160px',
            fontFamily: "'Montserrat', sans-serif",
            '&:hover': {
              background: 'linear-gradient(45deg, #d4b97a, #c6a664)',
              transform: 'translateY(-2px)',
              boxShadow: '0 7px 20px rgba(198, 166, 100, 0.6)',
              color: '#ffffff',
            },
          }}
        >
          Cerrar
        </Button>
        <Button 
          variant="contained" 
          onClick={handleDownload} 
          sx={{
            background: 'linear-gradient(45deg, #c6a664, #d4b97a)',
            color: '#2e2e2e',
            borderRadius: '25px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '10px 30px',
            border: 'none',
            transition: 'all 0.4s ease',
            boxShadow: '0 5px 15px rgba(198, 166, 100, 0.4)',
            fontSize: '1rem',
            minWidth: '160px',
            fontFamily: "'Montserrat', sans-serif",
            '&:hover': {
              background: 'linear-gradient(45deg, #d4b97a, #c6a664)',
              transform: 'translateY(-2px)',
              boxShadow: '0 7px 20px rgba(198, 166, 100, 0.6)',
              color: '#ffffff',
            },
          }}
        >
          Descargar PDF
        </Button>
      </Box>
    </Box>
  );
};

export default Factura;