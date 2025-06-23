import React, { useState, useEffect } from "react";
import "../Styles/PaginaCliente.css";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Tooltip from "@mui/material/Tooltip";
import ModalBusqueda from "./ModalBusqueda";
import FiltroCategorias from "./FiltroCategorias";
import Sidebar from "./SideBarCliente";

const PaginaCliente = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFiltroAbierto, setModalFiltroAbierto] = useState(false);
  const [negocios, setNegocios] = useState([]);
  const [negociosFiltrados, setNegociosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/categorias")
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((e) => console.error("Error al cargar categorías:", e));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/api/negocios")
      .then((res) => res.json())
      .then((data) => {
        setNegocios(data);
        setNegociosFiltrados(data);
      })
      .catch((e) => console.error("Error al cargar negocios:", e));
  }, []);

  const handleSearch = (query) => {
    const filtrados = negocios.filter((n) =>
      n.NombreNegocio.toLowerCase().includes(query.toLowerCase())
    );
    setNegociosFiltrados(filtrados);
    setModalOpen(false);
  };

  return (
    <div className="pagina-cliente">
         <Sidebar onLogout={() => localStorage.removeItem("idUsuario")} />
      <div className="encabezado-clientes">
        <Tooltip title="Regresar">
          <button className="btn-icono" onClick={() => navigate("/")}>
            <KeyboardBackspaceIcon fontSize="large" />
          </button>
        </Tooltip>
        <Tooltip title="Buscar">
          <button className="btn-icono" onClick={() => setModalOpen(true)}>
            <SearchIcon fontSize="large" />
          </button>
        </Tooltip>
        <Tooltip title="Filtrar">
          <button className="btn-icono" onClick={() => setModalFiltroAbierto(true)}>
            <TuneIcon fontSize="large" />
          </button>
        </Tooltip>
      </div>

      <h1 className="titulo-clientes">Negocios Disponibles</h1>

      <div className="tarjetas-grid">
        {negociosFiltrados.map((n) => (
          <div
            className="tarjeta-negocio"
            key={n.ID_NEGOCIOS}
            onClick={() => navigate(`/ProductoNegocio/${n.ID_NEGOCIOS}`)}
          >
            <img src={n.Imagen} alt={n.NombreNegocio} className="imagen-negocio" />
            <div className="contenido">
              <h3 className="nombre">{n.NombreNegocio}</h3>
              <p className="descripcion">
                {n.Descripcion.length > 100
                  ? n.Descripcion.slice(0, 100) + "..."
                  : n.Descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>

      <ModalBusqueda
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSearch={handleSearch}
      />
      <FiltroCategorias
        isOpen={modalFiltroAbierto}
        onClose={() => setModalFiltroAbierto(false)}
        negocios={negocios}
        categorias={categorias}
        onFilter={(f) => setNegociosFiltrados(f)}
      />
    </div>
  );
};

export default PaginaCliente;
