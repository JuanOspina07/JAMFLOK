import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/NegocioDetalle.css";

const DetalleNegocio = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [negocio, setNegocio] = useState(null);
  const [productos, setProductos] = useState([]);
  const [resenas, setResenas] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/negocio/${id}`)
    
      .then(res =>setNegocio(res.data))
      .catch(err => console.error("Error al cargar negocio", err));

    axios.get(`http://localhost:4000/api/productos/negocio/${id}`)
      .then(res => setProductos(res.data))
      .catch(err => console.error("Error al cargar productos", err));

    axios.get(`http://localhost:4000/api/resenas/negocio/${id}`)
      .then(res => setResenas(res.data))
      .catch(err => console.error("Error al cargar reseñas", err));
  }, [id]);

  if (!negocio) return <p>Cargando negocio...</p>;

  return (
    <div className="detalle-negocio">
      <h2>{negocio.NombreNegocio}</h2>
      <img src={negocio.Imagen} alt={negocio.NombreNegocio} className="imagen-negocio" />

      <div className="info-negocio">
        <div className="info-item"><span className="info-label">🧾 RUT:</span><span className="info-value">{negocio.RUT}</span></div>
        <div className="info-item"><span className="info-label">📄 Descripción:</span><span className="info-value">{negocio.Descripcion}</span></div>
        <div className="info-item"><span className="info-label">📍 Dirección:</span><span className="info-value">{negocio.Direccion}</span></div>
        <div className="info-item"><span className="info-label">⏰ Horario:</span><span className="info-value">{negocio.Horario}</span></div>
        <div className="info-item"><span className="info-label">📞 Teléfono:</span><span className="info-value">{negocio.NumTelefono}</span></div>
      </div>

      <h3>Productos</h3>
      <button onClick={() => navigate(`/agregar-producto/${id}`)}>+ Añadir Producto</button>
      <div className="productos-lista">
        {productos.length === 0 ? (
          <p>Este negocio aún no tiene productos.</p>
        ) : (
          productos.map(prod => (
            <div key={prod.ID_PRODUCTOS} className="producto-card">
              <h4>{prod.NombreProducto}</h4>
              <img src={prod.Imagen} alt={prod.NombreProducto} className="producto-imagen" />
              <p>{prod.Descripcion}</p>
              <p><strong>Precio:</strong> ${prod.Precio}</p>
            </div>
          ))
        )}
      </div>

      <h3>Reseñas</h3>
      <div className="resenas-lista">
        {resenas.length === 0 ? (
          <p>Este negocio aún no tiene reseñas.</p>
        ) : (
          resenas.map(resena => (
            <div key={resena.ID_RESENA} className="resena-card">
              <div className="estrellas">
                {'★'.repeat(resena.NumEstrellas)}
                {'☆'.repeat(5 - resena.NumEstrellas)}
              </div>
              <p className="descripcion-resena">"{resena.Descripcion}"</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DetalleNegocio;
