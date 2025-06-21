// src/Components/NuevoNegocio.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/AgregarNegocio.css";
import { useNavigate } from "react-router-dom";

const NuevoNegocio = () => {
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);

  const [negocio, setNegocio] = useState({
    ID_USUARIOS: localStorage.getItem("idUsuario"),
    ID_CATEGORIA: "",
    ID_PAIS: "",
    ID_DEPARTAMENTO: "",
    ID_CIUDAD: "",
    NombreNegocio: "",
    RUT: "",
    Descripcion: "",
    Direccion: "",
    NumTelefono: "",
    Horario: "",
    Imagen: "",
  });

  useEffect(() => {
    axios.get("http://localhost:4000/api/categorias")
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Error al cargar categorías:", err));

    axios.get("http://localhost:4000/api/paises")
      .then(res => setPaises(res.data))
      .catch(err => console.error("Error al cargar países:", err));
  }, []);

  useEffect(() => {
    if (negocio.ID_PAIS) {
      axios.get(`http://localhost:4000/api/departamentos/${negocio.ID_PAIS}`)
        .then(res => setDepartamentos(res.data))
        .catch(err => console.error("Error al cargar departamentos:", err));
    } else {
      setDepartamentos([]);
      setCiudades([]);
    }
  }, [negocio.ID_PAIS]);


  useEffect(() => {
    if (negocio.ID_DEPARTAMENTO) {
      axios.get(`http://localhost:4000/api/ciudades/${negocio.ID_DEPARTAMENTO}`)
        .then(res => setCiudades(res.data))
        .catch(err => console.error("Error al cargar ciudades:", err));
    } else {
      setCiudades([]);
    }
  }, [negocio.ID_DEPARTAMENTO]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setNegocio(prev => ({
      ...prev,
      [name]: value,
      ...(name === "ID_PAIS" && { ID_DEPARTAMENTO: "", ID_CIUDAD: "" }),
      ...(name === "ID_DEPARTAMENTO" && { ID_CIUDAD: "" })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/negociosnuevo", negocio);
      alert("Negocio registrado con éxito");
      navigate("/emprendedor");
    } catch (error) {
      console.error("Error al guardar negocio:", error);
      alert("Error al registrar negocio");
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar Nuevo Negocio</h2>
      <form onSubmit={handleSubmit} className="form-negocio">
  <div className="input-group">
    <label htmlFor="NombreNegocio">Nombre del negocio</label>
    <input name="NombreNegocio" id="NombreNegocio" onChange={handleChange} required />
  </div>

  <div className="input-group">
    <label htmlFor="RUT">RUT</label>
    <input name="RUT" id="RUT" onChange={handleChange} required />
  </div>

  <div className="input-group">
    <label htmlFor="Descripcion">Descripción</label>
    <textarea name="Descripcion" id="Descripcion" onChange={handleChange} required />
  </div>

  <div className="input-group">
    <label htmlFor="Direccion">Dirección</label>
    <input name="Direccion" id="Direccion" onChange={handleChange} required />
  </div>

  <div className="input-group">
    <label htmlFor="NumTelefono">Teléfono</label>
    <input name="NumTelefono" id="NumTelefono" onChange={handleChange} required />
  </div>

  <div className="input-group">
    <label htmlFor="Horario">Horario</label>
    <input name="Horario" id="Horario" onChange={handleChange} required />
  </div>

  <div className="input-group">
    <label htmlFor="Imagen">URL de imagen</label>
    <input name="Imagen" id="Imagen" onChange={handleChange} required />
  </div>

  <div className="input-group">
    <label htmlFor="ID_CATEGORIA">Categoría</label>
    <select name="ID_CATEGORIA" id="ID_CATEGORIA" onChange={handleChange} required>
      <option value="">Selecciona categoría</option>
      {categorias.map(c => (
        <option key={c.ID_CATEGORIAS} value={c.ID_CATEGORIAS}>
          {c.NombreCategoria}
        </option>
      ))}
    </select>
  </div>

  <div className="input-group">
    <label htmlFor="ID_PAIS">País</label>
    <select name="ID_PAIS" id="ID_PAIS" onChange={handleChange} required>
      <option value="">Selecciona país</option>
      {paises.map(p => (
        <option key={p.ID_PAIS} value={p.ID_PAIS}>
          {p.Nombre}
        </option>
      ))}
    </select>
  </div>

  <div className="input-group">
    <label htmlFor="ID_DEPARTAMENTO">Departamento</label>
    <select name="ID_DEPARTAMENTO" id="ID_DEPARTAMENTO" onChange={handleChange} value={negocio.ID_DEPARTAMENTO} required disabled={!departamentos.length}>
      <option value="">Selecciona departamento</option>
      {departamentos.map(d => (
        <option key={d.ID_DEPARTAMENTO} value={d.ID_DEPARTAMENTO}>
          {d.Nombre}
        </option>
      ))}
    </select>
  </div>

  <div className="input-group">
    <label htmlFor="ID_CIUDAD">Ciudad</label>
    <select name="ID_CIUDAD" id="ID_CIUDAD" onChange={handleChange} value={negocio.ID_CIUDAD} required disabled={!ciudades.length}>
      <option value="">Selecciona ciudad</option>
      {ciudades.map(c => (
        <option key={c.ID_CIUDAD} value={c.ID_CIUDAD}>
          {c.Nombre}
        </option>
      ))}
    </select>
  </div>

  <button type="submit">Registrar Negocio</button>
</form>

    </div>
  );
};

export default NuevoNegocio;
