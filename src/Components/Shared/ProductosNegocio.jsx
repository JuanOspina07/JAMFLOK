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


/////////////////////////////////////////////
/// No tuvieron un final feliz,          //// 
///  pero sonrieron todas las horas      ////
/// que pasaron juntos. Y sólo por eso,  ////
///  valió la pena                       ////
/////////////////////////////////////////////

const ProductCard = ({ product, onAddToCart }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.Imagen}
        alt={product.NombreProducto}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" fontWeight="bold">
          {product.NombreProducto}
        </Typography>
        <Typography variant="h5" color="primary.main" sx={{ my: 1 }}>
          ${new Intl.NumberFormat("es-CO").format(product.Precio)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
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
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Tooltip title="Regresar">
            <IconButton onClick={() => navigate(-1)} aria-label="regresar">
              <KeyboardBackspaceIcon fontSize="large" />
            </IconButton>
          </Tooltip>

          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{ fontWeight: "bold", flexGrow: 1 }}
          >
            PRODUCTOS DEL NEGOCIO
          </Typography>

          <Tooltip title="Ver Carrito">
            <IconButton
              onClick={() => setIsCartOpen(true)}
              // color=" #a3863e"
              aria-label="ver carrito"
            >
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon fontSize="large" />
              </Badge>
            </IconButton>
          </Tooltip>
        </Box>

        {productos.length === 0 ? (
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mt: 5 }}
          >
            Este negocio aún no tiene productos registrados.
          </Typography>
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
      </Container>

      <ShopCar
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </>
  );
};

export default ProductosNegocio;
