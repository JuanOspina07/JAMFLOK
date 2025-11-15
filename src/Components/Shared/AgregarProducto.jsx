import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/AgregarProducto.css";

const AgregarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState({
    ID_NEGOCIOS: id,
    Nombre: "",
    Descripcion: "",
    Precio: "",
    Imagen: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/productosnuevo", producto);
      Swal.fire({
              icon: 'success',
              title: 'Exitoo!!',
              text: 'Producto agregado con exito.',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Entendido'
            });
      navigate(`/negocio/${id}`);
    } catch (error) {
      Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo añadir el producto'+{error},
              confirmButtonColor: '#d33',
              confirmButtonText: 'Entendido'
            });
    }
  };

  return (
    <div className="form-producto-container">
      <button className="btn-volver" onClick={() => navigate(-1)}>←</button>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="form-producto">
        <div className="input-group">
          <label htmlFor="Nombre">Nombre</label>
          <input type="text" name="Nombre" id="Nombre" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="Descripcion">Descripción</label>
          <textarea name="Descripcion" id="Descripcion" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="Precio">Precio</label>
          <input type="number" name="Precio" id="Precio" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label htmlFor="Imagen">URL de Imagen</label>
          <input type="text" name="Imagen" id="Imagen" onChange={handleChange} required />
        </div>

        <button type="submit">Registrar Producto</button>
      </form>
    </div>
  );
};

export default AgregarProducto;
