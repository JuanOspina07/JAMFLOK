import React, { useState, useEffect } from "react";
import "../Styles/PaginaCliente.css";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import ModalBusqueda from "./ModalBusqueda";
import FiltroCategorias from "./FiltroCategorias";
import Sidebar from "./SideBarCliente";
import { Star, StarOff } from "lucide-react";
import axios from "axios";

const PaginaCliente = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFiltroAbierto, setModalFiltroAbierto] = useState(false);
  const [negocios, setNegocios] = useState([]);
  const [negociosFiltrados, setNegociosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [favoritosCargados, setFavoritosCargados] = useState(false);
  const [negociosCargados, setNegociosCargados] = useState(false);

  const idUsuario = localStorage.getItem("idUsuario");

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
        setNegociosCargados(true);
      })
      .catch((e) => {
        console.error("Error al cargar negocios:", e);
        setNegociosCargados(true);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/favoritos/${idUsuario}`)
      .then((res) => {
        const idsFavoritos = res.data.map((fav) => fav.ID_NEGOCIOS);
        setFavoritos(idsFavoritos);
        setFavoritosCargados(true);
      })
      .catch((e) => {
        console.error("Error al cargar favoritos:", e);
        setFavoritosCargados(true);
      });
  }, [idUsuario]);

  const handleSearch = (query) => {
    const filtrados = negocios.filter((n) =>
      n.NombreNegocio.toLowerCase().includes(query.toLowerCase())
    );
    setNegociosFiltrados(filtrados);
    setModalOpen(false);
  };

  const toggleFavorito = async (idNegocio) => {
    const esFavorito = favoritos.includes(idNegocio);
    try {
      if (esFavorito) {
        await axios.delete("http://localhost:4000/api/favoritos", {
          data: {
            ID_NEGOCIO: idNegocio,
            ID_USUARIOS: idUsuario,
          },
        });
        setFavoritos(favoritos.filter((id) => id !== idNegocio));
      } else {
        await axios.post("http://localhost:4000/api/favoritos", {
          ID_NEGOCIO: idNegocio,
          ID_USUARIOS: idUsuario,
        });
        setFavoritos([...favoritos, idNegocio]);
      }
    } catch (error) {
      console.error("Error al actualizar favoritos:", error);
    }
  };

  return (
    <div className="arros-pagina-cliente">
      <Sidebar onLogout={() => localStorage.removeItem("idUsuario")} />

      <div className="arros-encabezado">
        <Tooltip title="Buscar">
          <button className="arros-btn-icono" onClick={() => setModalOpen(true)}>
            <SearchIcon fontSize="large" />
          </button>
        </Tooltip>
        <Tooltip title="Filtrar">
          <button className="arros-btn-icono" onClick={() => setModalFiltroAbierto(true)}>
            <TuneIcon fontSize="large" />
          </button>
        </Tooltip>
      </div>

      <h1 className="arros-titulo">Negocios Disponibles</h1>

      {!favoritosCargados || !negociosCargados ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
          <CircularProgress sx={{ color: "#c6a664" }} />
        </div>
      ) : (
        <div className="arros-grid">
          {negociosFiltrados.map((n) => (
            <div
              className="arros-card"
              key={n.ID_NEGOCIOS}
              onClick={() => navigate(`/ProductoNegocio/${n.ID_NEGOCIOS}`)}
            >
              <div
                className="arros-favorito"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorito(n.ID_NEGOCIOS);
                }}
                title={
                  favoritos.includes(n.ID_NEGOCIOS)
                    ? "Quitar de favoritos"
                    : "Agregar a favoritos"
                }
              >
                {favoritos.includes(n.ID_NEGOCIOS) ? (
                  <Star fill="#facc15" stroke="#facc15" size={26} />
                ) : (
                  <StarOff stroke="#c6a664" size={26} />
                )}
              </div>

              <img
                src={n.Imagen}
                alt={n.NombreNegocio}
                className="arros-imagen"
              />

              <div className="arros-contenido">
                <h3 className="arros-nombre">{n.NombreNegocio}</h3>
                <p className="arros-descripcion">
                  {n.Descripcion.length > 100
                    ? n.Descripcion.slice(0, 100) + "..."
                    : n.Descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

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
