import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Select, 
  MenuItem, 
  CircularProgress,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PasarelaPago = ({ items, onPaymentSuccess, onClose }) => {
  const [metodoPago, setMetodoPago] = useState("tarjeta");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    tarjeta: { numero: "", cvv: "", fechaExpiracion: "" },
    bancolombia: { numeroCuenta: "", nombreTitular: "" },
    paypal: { email: "" },
    nequi: { numeroCelular: "" }
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    } else {
      setError("Debes iniciar sesión para realizar un pago");
    }
  }, []);

  const calcularTotal = () => {
    const total = items.reduce((total, item) => total + (item.Precio * item.quantity), 0);
    return total; 
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CO", {
      minimumFractionDigits: 0, 
      maximumFractionDigits: 4, 
    }).format(price);
  };

  const validatePaymentDetails = () => {
    switch (metodoPago) {
      case "tarjeta":
        const { numero, cvv, fechaExpiracion } = paymentDetails.tarjeta;
        if (!/^\d{16}$/.test(numero)) return "El número de tarjeta debe tener 16 dígitos";
        if (!/^\d{3}$/.test(cvv)) return "El CVV debe tener 3 dígitos";
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fechaExpiracion)) return "Formato de fecha inválido (MM/AA)";
        break;
      case "bancolombia":
        const { numeroCuenta, nombreTitular } = paymentDetails.bancolombia;
        if (!/^\d{10,12}$/.test(numeroCuenta)) return "El número de cuenta debe tener entre 10 y 12 dígitos";
        if (!nombreTitular || nombreTitular.length < 3) return "El nombre del titular debe tener al menos 3 caracteres";
        break;
      case "paypal":
        const { email } = paymentDetails.paypal;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Correo electrónico inválido";
        break;
      case "nequi":
        const { numeroCelular } = paymentDetails.nequi;
        if (!/^\d{10}$/.test(numeroCelular)) return "El número de celular debe tener 10 dígitos";
        break;
      default:
        return "Método de pago inválido";
    }
    return null;
  };

  const handlePago = async () => {
    setLoading(true);
    setError(null);

    if (!user) {
      setError("Debes iniciar sesión para realizar un pago");
      setLoading(false);
      return;
    }

    const validationError = validatePaymentDetails();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }

    for (const item of items) {
      if (
        !item.ID_PRODUCTOS ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0 ||
        !item.Precio ||
        item.Precio <= 0
      ) {
        setError("Datos de producto inválidos: cantidad y precio deben ser positivos");
        setLoading(false);
        return;
      }
    }

    try {
      const productos = items.map(item => ({
        idProducto: item.ID_PRODUCTOS,
        cantidad: item.quantity,
        precioUnitario: item.Precio
      }));

      const token = localStorage.getItem('token');
      if (!token) {
        setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
        setLoading(false);
        navigate('/login');
        return;
      }

      const response = await axios.post("http://localhost:4000/api/pagos", {
        productos,
        metodoPago
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        onPaymentSuccess(response.data.idFactura);
        onClose();
      } else {
        throw new Error(response.data.message || "Error en el pago");
      }
    } catch (error) {
      console.error("Error en handlePago:", error);
      if (error.response?.status === 401) {
        setError("Sesión expirada. Por favor, inicia sesión nuevamente.");
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setError(error.response?.data?.message || error.message || "Error al procesar el pago");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderPaymentFields = () => {
    switch (metodoPago) {
      case "tarjeta":
        return (
          <div>
            <TextField
              label="Número de Tarjeta"
              value={paymentDetails.tarjeta.numero}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                setPaymentDetails({ ...paymentDetails, tarjeta: { ...paymentDetails.tarjeta, numero: value } });
              }}
              fullWidth
              margin="normal"
              placeholder="1234 5678 9012 3456"
              inputProps={{ maxLength: 16 }}
              sx={{
                '& .MuiInputBase-input': {
                  color: '#ffffff',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(198, 166, 100, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(198, 166, 100, 0.8)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#c6a664',
                  },
                },
              }}
            />
            <TextField
              label="CVV"
              value={paymentDetails.tarjeta.cvv}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                setPaymentDetails({ ...paymentDetails, tarjeta: { ...paymentDetails.tarjeta, cvv: value } });
              }}
              fullWidth
              margin="normal"
              placeholder="123"
              inputProps={{ maxLength: 3 }}
              sx={{
                '& .MuiInputBase-input': {
                  color: '#ffffff',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(198, 166, 100, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(198, 166, 100, 0.8)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#c6a664',
                  },
                },
              }}
            />
            <TextField
              label="Fecha de Expiración (MM/AA)"
              value={paymentDetails.tarjeta.fechaExpiracion}
              onChange={(e) => {
                let value = e.target.value.replace(/[^0-9\/]/g, '');
                if (value.length > 2 && !value.includes('/')) {
                  value = value.slice(0, 2) + '/' + value.slice(2, 4);
                }
                setPaymentDetails({ ...paymentDetails, tarjeta: { ...paymentDetails.tarjeta, fechaExpiracion: value.slice(0, 5) } });
              }}
              fullWidth
              margin="normal"
              placeholder="MM/AA"
              inputProps={{ maxLength: 5 }}
              sx={{
                '& .MuiInputBase-input': {
                  color: '#ffffff',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(198, 166, 100, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(198, 166, 100, 0.8)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#c6a664',
                  },
                },
              }}
            />
          </div>
        );
      case "bancolombia":
        return (
          <div>
            <TextField
              label="Número de Cuenta"
              value={paymentDetails.bancolombia.numeroCuenta}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                setPaymentDetails({ ...paymentDetails, bancolombia: { ...paymentDetails.bancolombia, numeroCuenta: value } });
              }}
              fullWidth
              margin="normal"
              placeholder="123456789012"
              inputProps={{ maxLength: 12 }}
              sx={{
                '& .MuiInputBase-input': {
                  color: '#ffffff',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(198, 166, 100, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(198, 166, 100, 0.8)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#c6a664',
                  },
                },
              }}
            />
            <TextField
              label="Nombre del Titular"
              value={paymentDetails.bancolombia.nombreTitular}
              onChange={(e) => {
                const value = e.target.value.slice(0, 50);
                setPaymentDetails({ ...paymentDetails, bancolombia: { ...paymentDetails.bancolombia, nombreTitular: value } });
              }}
              fullWidth
              margin="normal"
              placeholder="Nombre completo"
              inputProps={{ maxLength: 50 }}
              sx={{
                '& .MuiInputBase-input': {
                  color: '#ffffff',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(198, 166, 100, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(198, 166, 100, 0.8)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#c6a664',
                  },
                },
              }}
            />
          </div>
        );
      case "paypal":
        return (
          <div>
            <TextField
              label="Correo de PayPal"
              value={paymentDetails.paypal.email}
              onChange={(e) => {
                const value = e.target.value.slice(0, 100);
                setPaymentDetails({ ...paymentDetails, paypal: { ...paymentDetails.paypal, email: value } });
              }}
              fullWidth
              margin="normal"
              placeholder="correo@ejemplo.com"
              inputProps={{ maxLength: 100 }}
              sx={{
                '& .MuiInputBase-input': {
                  color: '#ffffff',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(198, 166, 100, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(198, 166, 100, 0.8)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#c6a664',
                  },
                },
              }}
            />
          </div>
        );
      case "nequi":
        return (
          <div>
            <TextField
              label="Número de Celular"
              value={paymentDetails.nequi.numeroCelular}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                setPaymentDetails({ ...paymentDetails, nequi: { ...paymentDetails.nequi, numeroCelular: value } });
              }}
              fullWidth
              margin="normal"
              placeholder="3001234567"
              inputProps={{ maxLength: 10 }}
              sx={{
                '& .MuiInputBase-input': {
                  color: '#ffffff',
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(198, 166, 100, 0.5)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(198, 166, 100, 0.8)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#c6a664',
                  },
                },
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog 
      open={true} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
          borderRadius: '20px',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(198, 166, 100, 0.4)',
          color: '#ffffff',
          overflow: 'hidden',
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          position: 'relative',
          textAlign: 'center',
          pb: 3,
          borderBottom: '3px solid #c6a664',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-2px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '50px',
            height: '3px',
            background: 'linear-gradient(90deg, #c6a664, #d4b97a)',
          },
          backgroundColor: 'rgba(30, 30, 30, 0.9)',
        }}
      >
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
          }}
        >
          Pasarela de Pago
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ 
        backgroundColor: 'rgba(30, 30, 30, 0.7)',
        py: 3,
        borderBottom: '1px solid rgba(198, 166, 100, 0.3)',
        borderTop: '1px solid rgba(198, 166, 100, 0.3)',
      }}>
        <Box>
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: "'Montserrat', sans-serif",
              color: '#c6a664',
              textAlign: 'center',
              mb: 2,
              mt: 1
            }}
          >
            Resumen de tu compra
          </Typography>
          
          <List sx={{ 
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(198, 166, 100, 0.3)',
            backdropFilter: 'blur(5px)',
            py: 0,
            mb: 3,
          }}>
            {items.map((item, index) => (
              <React.Fragment key={item.ID_PRODUCTOS}>
                <ListItem 
                  sx={{
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'rgba(198, 166, 100, 0.12)',
                    },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography 
                        sx={{ 
                          color: '#ffffff',
                          fontWeight: 600,
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        {item.NombreProducto}
                      </Typography>
                    }
                    secondary={
                      <Typography 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontFamily: "'Roboto', sans-serif",
                        }}
                      >
                        Cantidad: {item.quantity} | ${formatPrice(item.Precio)} c/u
                      </Typography>
                    }
                  />
                  <Typography 
                    sx={{ 
                      color: '#c6a664', 
                      fontWeight: "bold",
                      fontFamily: "'Roboto', sans-serif",
                    }}
                  >
                    ${formatPrice(item.Precio * item.quantity)}
                  </Typography>
                </ListItem>
                {index < items.length - 1 && <Divider sx={{ bgcolor: 'rgba(198, 166, 100, 0.2)' }} />}
              </React.Fragment>
            ))}
          </List>
          
          <Box
            sx={{
              textAlign: 'center',
              width: "100%",
              mb: 3,
              bgcolor: 'rgba(198, 166, 100, 0.2)',
              borderRadius: '12px',
              p: 2,
              border: '1px solid rgba(198, 166, 100, 0.3)',
            }}
          >
            <Typography 
              variant="h6" 
              component="span" 
              fontWeight="bold" 
              color="#ffffff" 
              sx={{ mr: 1, fontFamily: "'Montserrat', sans-serif" }}
            >
              Total:
            </Typography>
            <Typography 
              variant="h5" 
              component="span" 
              fontWeight="bold" 
              color="#c6a664"
              sx={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              ${formatPrice(calcularTotal())}
            </Typography>
          </Box>
          
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: "'Montserrat', sans-serif",
              color: '#c6a664',
              textAlign: 'center',
              mb: 2
            }}
          >
            Método de Pago
          </Typography>
          
          <Select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            disabled={loading}
            fullWidth
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(198, 166, 100, 0.3)',
              color: '#ffffff',
              mb: 2,
              '& .MuiSelect-icon': {
                color: '#c6a664',
              },
              '& .MuiSelect-select': {
                padding: '12px 14px',
                fontFamily: "'Roboto', sans-serif",
              },
            }}
          >
            <MenuItem value="tarjeta">Tarjeta de Crédito/Débito</MenuItem>
            <MenuItem value="bancolombia">Transferencia Bancolombia</MenuItem>
            <MenuItem value="paypal">PayPal</MenuItem>
            <MenuItem value="nequi">Nequi</MenuItem>
          </Select>
          
          <Box sx={{ 
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(198, 166, 100, 0.3)',
            p: 2,
            mb: 2,
          }}>
            {renderPaymentFields()}
          </Box>
          
          {error && (
            <Box sx={{ 
              bgcolor: 'rgba(231, 76, 60, 0.2)',
              borderRadius: '8px',
              p: 1.5,
              mb: 2,
              border: '1px solid rgba(231, 76, 60, 0.5)',
            }}>
              <Typography 
                sx={{ 
                  color: '#e74c3c',
                  fontFamily: "'Roboto', sans-serif",
                  fontWeight: 500,
                  textAlign: 'center'
                }}
              >
                {error}
              </Typography>
            </Box>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ 
        p: 3, 
        justifyContent: 'space-between',
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
      }}>
        <Button 
          onClick={onClose} 
          disabled={loading}
          sx={{
            color: '#e74c3c',
            border: '1px solid rgba(231, 76, 60, 0.5)',
            borderRadius: '25px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '8px 25px',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'rgba(231, 76, 60, 0.1)',
              borderColor: '#e74c3c',
            },
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handlePago} 
          disabled={loading || !user}
          sx={{
            background: 'linear-gradient(45deg, #c6a664, #d4b97a)',
            color: '#2e2e2e',
            borderRadius: '25px',
            textTransform: 'none',
            fontWeight: 600,
            padding: '10px 30px',
            border: 'none',
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
            '&.Mui-disabled': {
              background: 'rgba(198, 166, 100, 0.3)',
              color: 'rgba(46, 46, 46, 0.5)',
            }
          }}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? "Procesando..." : "Confirmar Pago"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasarelaPago;