import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ShopCar from "./ShopCar";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Box,
  IconButton,
  Tooltip,
  CircularProgress,
  Badge,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductCard = ({ product, onAddToCart }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
        border: "1px solid rgba(198, 166, 100, 0.4)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
        color: "#ffffff",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 12px 25px rgba(198, 166, 100, 0.3)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.Imagen}
        alt={product.NombreProducto}
        sx={{ 
          objectFit: "cover",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          variant="h6" 
          component="div" 
          fontWeight="bold"
          sx={{ 
            fontFamily: "'Montserrat', sans-serif",
            color: "#c6a664",
            minHeight: "64px",
            display: "flex",
            alignItems: "center"
          }}
        >
          {product.NombreProducto}
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            my: 1, 
            color: "#c6a664",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            textShadow: "0 1px 2px rgba(0,0,0,0.3)"
          }}
        >
          ${new Intl.NumberFormat("es-CO").format(product.Precio)}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: "rgba(255, 255, 255, 0.7)", 
            minHeight: "60px",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          {product.Descripcion.length > 80
            ? `${product.Descripcion.slice(0, 80)}...`
            : product.Descripcion}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onAddToCart(product)}
          sx={{
            background: "linear-gradient(45deg, #c6a664, #d4b97a)",
            color: "#2e2e2e",
            borderRadius: "25px",
            fontWeight: 600,
            padding: "10px 20px",
            transition: "all 0.3s ease",
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "0.5px",
            "&:hover": {
              background: "linear-gradient(45deg, #d4b97a, #c6a664)",
              transform: "translateY(-2px)",
              boxShadow: "0 5px 15px rgba(198, 166, 100, 0.4)",
              color: "#ffffff",
            },
          }}
        >
          Añadir al Carrito
        </Button>
      </CardActions>
    </Card>
  </Grid>
);

const ProductosNegocio = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:4000/api/productos/negocio/${id}`
        );
        if (!response.ok)
          throw new Error("No se pudo conectar con el servidor.");
        const data = await response.json();
        console.log("Productos de la API:", data);
        setProductos(data);
      } catch (e) {
        console.error("Error al cargar productos:", e);
        setError("Hubo un problema al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, [id]);

  const handleAddToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.ID_PRODUCTOS === productToAdd.ID_PRODUCTOS
      );
      let updatedItems;
      if (existingItem) {
        updatedItems = prevItems.map((item) =>
          item.ID_PRODUCTOS === productToAdd.ID_PRODUCTOS
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...prevItems, { ...productToAdd, quantity: 1 }];
      }
      console.log("Carrito actualizado:", updatedItems);
      return [...updatedItems];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.ID_PRODUCTOS === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.ID_PRODUCTOS !== productId)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress sx={{ color: "#c6a664" }} />
      </Box>
    );
    
  if (error)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          color: "#000000",
        }}
      >
        <Typography variant="h5" color="error" align="center">
          {error}
        </Typography>
      </Box>
    );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          py: 2,
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "200px",
            height: "3px",
            background: "linear-gradient(90deg, #c6a664, #d4b97a)",
            borderRadius: "3px",
          }
        }}
      >
        <Tooltip title="Regresar">
          <IconButton 
            onClick={() => navigate(-1)} 
            aria-label="regresar"
            sx={{
              color: "#c6a664",
              bgcolor: "rgba(198, 166, 100, 0.1)",
              "&:hover": {
                bgcolor: "rgba(198, 166, 100, 0.2)",
              }
            }}
          >
            <KeyboardBackspaceIcon fontSize="large" />
          </IconButton>
        </Tooltip>

        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{ 
            fontWeight: 700,
            flexGrow: 1,
            color: "#1a1a1a",
            fontFamily: "'Montserrat', sans-serif",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          Productos del Negocio
        </Typography>

        <Tooltip title="Ver Carrito">
          <IconButton
            onClick={() => setIsCartOpen(true)}
            sx={{
              color: "#c6a664",
              bgcolor: "rgba(198, 166, 100, 0.1)",
              "&:hover": {
                bgcolor: "rgba(198, 166, 100, 0.2)",
              }
            }}
            aria-label="ver carrito"
          >
            <Badge 
              badgeContent={cartItems.length} 
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  right: 5,
                  top: 5,
                  padding: "0 4px",
                  fontWeight: "bold",
                }
              }}
            >
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>

      {productos.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 10,
            bgcolor: "rgba(255, 255, 255, 0.9)",
            borderRadius: "12px",
            border: "1px solid rgba(198, 166, 100, 0.3)",
            backdropFilter: "blur(5px)",
            maxWidth: "600px",
            mx: "auto",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#c6a664",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              mb: 2
            }}
          >
            Este negocio aún no tiene productos
          </Typography>
          <Typography
            variant="body1"
            sx={{ 
              color: "#555555",
              fontFamily: "'Roboto', sans-serif",
              maxWidth: "500px",
              mx: "auto"
            }}
          >
            Parece que este negocio todavía no ha añadido productos a su catálogo.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(-1)}
            sx={{
              mt: 3,
              background: "linear-gradient(45deg, #c6a664, #d4b97a)",
              color: "#2e2e2e",
              borderRadius: "25px",
              fontWeight: 600,
              padding: "10px 30px",
              fontFamily: "'Montserrat', sans-serif",
              "&:hover": {
                background: "linear-gradient(45deg, #d4b97a, #c6a664)",
                transform: "translateY(-2px)",
                boxShadow: "0 5px 15px rgba(198, 166, 100, 0.3)",
              },
            }}
          >
            Volver atrás
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {productos.map((prod) => (
            <ProductCard
              key={prod.ID_PRODUCTOS}
              product={prod}
              onAddToCart={handleAddToCart}
            />
          ))}
        </Grid>
      )}

      <ShopCar
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </Container>
  );
};

export default ProductosNegocio;