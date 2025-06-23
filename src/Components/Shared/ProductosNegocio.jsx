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
  Avatar,
  Stack,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RateReviewIcon from "@mui/icons-material/RateReview";

const ProductCard = ({ product, onAddToCart }) => (
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <Card
      sx={{
        height: "100%",
        maxWidth: 300,
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
        height="150"
        image={product.Imagen}
        alt={product.NombreProducto}
        sx={{
          objectFit: "cover",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      />
      <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
        <Typography
          variant="h6"
          component="div"
          fontWeight="bold"
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            color: "#c6a664",
            minHeight: "48px",
            display: "flex",
            alignItems: "center",
            fontSize: "1rem",
          }}
        >
          {product.NombreProducto}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            my: 1,
            color: "#c6a664",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
          }}
        >
          ${new Intl.NumberFormat("es-CO").format(product.Precio)}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            minHeight: "48px",
            fontFamily: "'Roboto', sans-serif",
            fontSize: "0.875rem",
          }}
        >
          {product.Descripcion.length > 60
            ? `${product.Descripcion.slice(0, 60)}...`
            : product.Descripcion}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 1.5 }}>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onAddToCart(product)}
          sx={{
            background: "linear-gradient(45deg, #c6a664, #d4b97a)",
            color: "#2e2e2e",
            borderRadius: "25px",
            fontWeight: 600,
            padding: "8px 16px",
            transition: "all 0.3s ease",
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "0.5px",
            fontSize: "0.875rem",
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
  const [negocio, setNegocio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [resProductos, resNegocio] = await Promise.all([
          fetch(`http://localhost:4000/api/productos/negocio/${id}`),
          fetch(`http://localhost:4000/api/negocio/${id}`),
        ]);

        if (!resProductos.ok || !resNegocio.ok)
          throw new Error("Error al cargar datos del servidor");

        const [productosData, negocioData] = await Promise.all([
          resProductos.json(),
          resNegocio.json(),
        ]);

        setProductos(productosData);
        setNegocio(negocioData);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los datos");
      } finally {
        setLoading(false);
      }
    };
    fetchDatos();
  }, [id]);

  const handleAddToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.ID_PRODUCTOS === productToAdd.ID_PRODUCTOS
      );
      return existingItem
        ? prevItems.map((item) =>
            item.ID_PRODUCTOS === productToAdd.ID_PRODUCTOS
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevItems, { ...productToAdd, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) handleRemoveFromCart(productId);
    else {
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

  const handleClearCart = () => setCartItems([]);

  if (loading)
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}
      >
        <CircularProgress sx={{ color: "#c6a664" }} />
      </Box>
    );

  if (error)
    return (
      <Typography variant="h5" color="error" align="center" sx={{ mt: 5 }}>
        {error}
      </Typography>
    );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Encabezado y detalles del negocio */}
      {negocio && (
        <Box
          sx={{
            mb: 5,
            p: 3,
            borderRadius: 3,
            border: "1px solid rgba(198, 166, 100, 0.2)",
            background: "linear-gradient(135deg, #faf4e3, #f5f0d5)",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
          }}
        >
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar
              src={negocio.Imagen}
              alt={negocio.NombreNegocio}
              sx={{ width: 80, height: 80, border: "2px solid #c6a664" }}
            />
            <Box>
              <Typography variant="h4" fontWeight={700} color="#2e2e2e">
                {negocio.NombreNegocio}
              </Typography>
              <Typography variant="body1" color="#444">
                {negocio.Descripcion}
              </Typography>
              <Typography variant="body2" color="#555">
                Dirección: {negocio.Direccion} | Tel: {negocio.NumTelefono}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}

      {/* Botones de navegación, reseña y carrito */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box display="flex" alignItems="center" gap={2}>
          <Tooltip title="Regresar">
            <IconButton onClick={() => navigate(-1)} sx={{ color: "#c6a664" }}>
              <KeyboardBackspaceIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Escribir Reseña">
            <Button
              variant="contained"
              startIcon={<RateReviewIcon />}
              onClick={() => navigate(`/Reseñas/${id}`)}
              sx={{
                background: "linear-gradient(45deg, #c6a664, #d4b97a)",
                color: "#2e2e2e",
                borderRadius: "25px",
                fontWeight: 600,
                padding: "8px 16px",
                transition: "all 0.3s ease",
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "0.5px",
                fontSize: "0.875rem",
                "&:hover": {
                  background: "linear-gradient(45deg, #d4b97a, #c6a664)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 5px 15px rgba(198, 166, 100, 0.4)",
                  color: "#ffffff",
                },
              }}
            >
              Escribir Reseña
            </Button>
          </Tooltip>
        </Box>
        <Tooltip title="Ver Carrito">
          <IconButton onClick={() => setIsCartOpen(true)} sx={{ color: "#c6a664" }}>
            <Badge badgeContent={cartItems.length} color="error">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>

      {/* Productos */}
      {productos.length === 0 ? (
        <Typography align="center" variant="h5" sx={{ mt: 10, color: "#555" }}>
          Este negocio aún no tiene productos disponibles.
        </Typography>
      ) : (
        <Grid container spacing={3}>
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