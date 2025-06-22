import React, { useState } from "react";
import {
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  Divider,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Factura from "./Factura";
import PasarelaPago from "./PasarelaPago";

const ShopCar = ({
  open,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  userId,
}) => {
  const [showPasarela, setShowPasarela] = useState(false);
  const [showFactura, setShowFactura] = useState(false);
  const [idFactura, setIdFactura] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.Precio * item.quantity,
    0
  );

  const handlePaymentSuccess = (idFactura) => {
    setIsProcessing(true);
    setTimeout(() => {
      onClearCart();
      setShowPasarela(false);
      setIdFactura(idFactura);
      setShowFactura(true);
      setIsProcessing(false);
    }, 1500);
  };

  const handleFacturaClose = () => {
    setShowFactura(false);
    onClose();
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setShowPasarela(true);
      setIsProcessing(false);
    }, 800);
  };

  return (
    <>
      <Dialog 
        open={open && !showPasarela && !showFactura} 
        onClose={onClose} 
        fullWidth 
        maxWidth="sm"
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
            borderRadius: '20px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(198, 166, 100, 0.4)',
            color: '#ffffff',
            animation: 'fadeInSlide 0.6s ease-out',
            '@keyframes fadeInSlide': {
              from: {
                opacity: 0,
                transform: 'translateY(30px) scale(0.95)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0) scale(1)',
              },
            },
          }
        }}
      >
        <DialogTitle sx={{ 
          m: 0, 
          p: 2, 
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
          }
        }}>
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
            Tu Carrito de Compras
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#c6a664",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ 
          bgcolor: 'rgba(30, 30, 30, 0.7)', 
          '&.MuiDialogContent-dividers': {
            borderColor: 'rgba(198, 166, 100, 0.3)'
          }
        }}>
          {cartItems.length === 0 ? (
            <Box sx={{ 
              textAlign: "center", 
              py: 5,
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(198, 166, 100, 0.3)',
              backdropFilter: 'blur(5px)',
            }}>
              <RemoveShoppingCartIcon
                sx={{ 
                  fontSize: 60, 
                  color: "rgba(255, 255, 255, 0.7)",
                  mb: 2
                }}
              />
              <Typography variant="h6" color="#ffffff" sx={{ mt: 2, fontFamily: "'Montserrat', sans-serif" }}>
                Tu carrito está vacío
              </Typography>
              <Typography color="rgba(255, 255, 255, 0.7)" sx={{ mt: 1 }}>
                ¡Añade productos para verlos aquí!
              </Typography>
            </Box>
          ) : (
            <List sx={{ 
              bgcolor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(198, 166, 100, 0.3)',
              backdropFilter: 'blur(5px)',
              py: 0,
            }}>
              {cartItems.map((item) => (
                <React.Fragment key={item.ID_PRODUCTOS}>
                  <ListItem
                    sx={{
                      '&:hover': {
                        bgcolor: 'rgba(198, 166, 100, 0.12)',
                      },
                      py: 2,
                      '&:nth-of-type(even)': {
                        bgcolor: 'rgba(255, 255, 255, 0.03)',
                      }
                    }}
                    secondaryAction={
                      <Tooltip title="Eliminar producto">
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => onRemoveItem(item.ID_PRODUCTOS)}
                          sx={{ color: '#e74c3c' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={item.Imagen}
                        sx={{ 
                          width: 70, 
                          height: 70, 
                          mr: 2,
                          border: '1px solid rgba(198, 166, 100, 0.3)',
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography 
                          sx={{ 
                            fontWeight: 600, 
                            color: '#ffffff',
                            fontFamily: "'Roboto', sans-serif",
                          }}
                        >
                          {item.NombreProducto}
                        </Typography>
                      }
                      secondary={
                        <Box
                          sx={{ 
                            display: "flex", 
                            alignItems: "center", 
                            mt: 1,
                            flexWrap: 'wrap',
                            rowGap: '10px'
                          }}
                        >
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            bgcolor: 'rgba(198, 166, 100, 0.15)',
                            borderRadius: '20px',
                            px: 1,
                            border: '1px solid rgba(198, 166, 100, 0.3)',
                          }}>
                            <IconButton
                              size="small"
                              onClick={() => 
                                onUpdateQuantity(
                                  item.ID_PRODUCTOS,
                                  item.quantity - 1
                                )
                              }
                              sx={{ color: '#c6a664' }}
                            >
                              <RemoveCircleOutlineIcon fontSize="small" />
                            </IconButton>
                            <Typography sx={{ 
                              mx: 1.5,
                              color: '#ffffff',
                              fontWeight: 500,
                              minWidth: '20px',
                              textAlign: 'center'
                            }}>
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => 
                                onUpdateQuantity(
                                  item.ID_PRODUCTOS,
                                  item.quantity + 1
                                )
                              }
                              sx={{ color: '#c6a664' }}
                            >
                              <AddCircleOutlineIcon fontSize="small" />
                            </IconButton>
                          </Box>
                          
                          <Typography sx={{ 
                            ml: 'auto', 
                            fontWeight: "bold",
                            color: '#c6a664',
                            fontSize: '1.1rem',
                            minWidth: '110px',
                            textAlign: 'right'
                          }}>
                            ${new Intl.NumberFormat("es-CO").format(
                              item.Precio * item.quantity
                            )}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider 
                    variant="middle" 
                    component="li" 
                    sx={{ 
                      bgcolor: 'rgba(198, 166, 100, 0.2)', 
                      height: '1px',
                      mx: 2
                    }} 
                  />
                </React.Fragment>
              ))}
            </List>
          )}
        </DialogContent>

        {cartItems.length > 0 && (
          <DialogActions
            sx={{ 
              p: 3, 
              flexDirection: "column", 
              alignItems: "stretch",
              bgcolor: 'rgba(30, 30, 30, 0.7)',
              borderTop: '1px solid rgba(198, 166, 100, 0.3)',
            }}
          >
            {/* Contenedor del Total Centrado */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center", // Centrado horizontal
                width: "100%",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  textAlign: 'center', // Contenido centrado
                  width: "80%", // Ancho reducido para mejor estética
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
                  sx={{ mr: 1 }}
                >
                  Total:
                </Typography>
                <Typography 
                  variant="h5" 
                  component="span" 
                  fontWeight="bold" 
                  color="#c6a664"
                >
                  ${new Intl.NumberFormat("es-CO").format(total)}
                </Typography>
              </Box>
            </Box>
            
            <Button
              variant="contained"
              size="large"
              startIcon={isProcessing ? <CircularProgress size={20} color="inherit" /> : <ShoppingCartCheckoutIcon />}
              onClick={handleCheckout}
              disabled={isProcessing}
              sx={{
                background: 'linear-gradient(45deg, #c6a664, #d4b97a)',
                color: '#2e2e2e',
                borderRadius: '25px',
                textTransform: 'none',
                fontWeight: 600,
                padding: '12px 30px',
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
            >
              {isProcessing ? 'Procesando...' : 'Finalizar Compra'}
            </Button>
            
            <Button
              variant="outlined"
              size="medium"
              sx={{ 
                mt: 2,
                color: '#e74c3c',
                borderColor: 'rgba(231, 76, 60, 0.5)',
                borderRadius: '25px',
                textTransform: 'none',
                fontWeight: 500,
                padding: '8px 20px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(231, 76, 60, 0.1)',
                  borderColor: '#e74c3c',
                }
              }}
              onClick={onClearCart}
              disabled={isProcessing}
            >
              Vaciar Carrito
            </Button>
          </DialogActions>
        )}
      </Dialog>

      {showPasarela && (
        <PasarelaPago
          items={cartItems}
          onPaymentSuccess={handlePaymentSuccess}
          onClose={() => setShowPasarela(false)}
        />
      )}

      {showFactura && (
        <Dialog open={showFactura} onClose={handleFacturaClose} fullWidth maxWidth="sm">
          <Factura idFactura={idFactura} onClose={handleFacturaClose} />
        </Dialog>
      )}
    </>
  );
};

export default ShopCar;