
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Typography } from "@mui/material";

const ProductosNegocio = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/productos/negocio/${id}`)
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(e => console.error("Error al cargar productos:", e));
  }, [id]);

  return (
    <div style={{ padding: 20 }}>
      <Button variant="outlined" onClick={() => navigate(-1)}>← Volver</Button>
      <h2>Productos del negocio</h2>
      {productos.length === 0 ? (
        <p>Este negocio aún no tiene productos registrados.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {productos.map(prod => (
            <Card key={prod.ID_PRODUCTO} style={{ width: 250 }}>
              <CardContent>
                <img src={prod.Imagen} alt={prod.Nombre} style={{ width: "100%", height: 150, objectFit: "cover" }} />
                <Typography variant="h6">{prod.Nombre}</Typography>
                <Typography>${prod.Precio}</Typography>
                <Typography variant="body2">{prod.Descripcion}</Typography>
                <Button variant="contained" style={{ marginTop: 8 }}>Añadir al carrito</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductosNegocio;
