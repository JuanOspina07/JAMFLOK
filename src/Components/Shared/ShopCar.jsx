import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

///////////////////////////////////////////////////////////
/// Lo más triste no es que alguien no te valore…      ////
//  es que tú lo sepas y aún así decidas quedarte.     ////
//  Eso no es amor… es herida disfrazada de esperanza  ////
///////////////////////////////////////////////////////////


const ShopCar = ({
  open,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  console.log("CartItems en ShopCar:", cartItems);

  const total = cartItems.reduce(
    (sum, item) => sum + item.Precio * item.quantity,
    0
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ m: 0, p: 2, fontWeight: "bold" }}>
        Tu Carrito de Compras
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 5 }}>
            <RemoveShoppingCartIcon
              sx={{ fontSize: 60, color: "text.secondary" }}
            />
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
              Tu carrito está vacío
            </Typography>
            <Typography color="text.secondary">
              ¡Añade productos para verlos aquí!
            </Typography>
          </Box>
        ) : (
          <List>
            {cartItems.map((item) => (
              <React.Fragment key={item.ID_PRODUCTOS}>
                <ListItem
                  secondaryAction={
                    <Tooltip title="Eliminar producto">
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onRemoveItem(item.ID_PRODUCTOS)}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemAvatar>
                    <Avatar
                      variant="rounded"
                      src={item.Imagen}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography fontWeight="bold">
                        {item.NombreProducto}
                      </Typography>
                    }
                    secondary={
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            onUpdateQuantity(
                              item.ID_PRODUCTOS,
                              item.quantity - 1
                            )
                          }
                        >
                          <RemoveCircleOutlineIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1.5 }}>
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
                        >
                          <AddCircleOutlineIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ ml: "auto", fontWeight: "bold" }}>
                          $
                          {new Intl.NumberFormat("es-CO").format(
                            item.Precio * item.quantity
                          )}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </DialogContent>

      {cartItems.length > 0 && (
        <DialogActions
          sx={{ p: 2, flexDirection: "column", alignItems: "stretch" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Total:
            </Typography>
            <Typography variant="h6" fontWeight="bold" color="primary.main">
              ${new Intl.NumberFormat("es-CO").format(total)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCartCheckoutIcon />}
            onClick={() => alert("Procediendo al pago...")}
          >
            Finalizar Compra
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ mt: 1 }}
            onClick={onClearCart}
          >
            Vaciar Carrito
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ShopCar;
