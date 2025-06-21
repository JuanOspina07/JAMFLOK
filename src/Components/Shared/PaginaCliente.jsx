import React, { useState, useEffect } from "react";
import "../Styles/PaginaCliente.css";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Tooltip from "@mui/material/Tooltip";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ModalBusqueda from "./ModalBusqueda";
import FiltroCategorias from "./FiltroCategorias";

const PaginaCliente = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFiltroAbierto, setModalFiltroAbierto] = useState(false);
  const [negocios, setNegocios] = useState([]);
  const [negociosFiltrados, setNegociosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);

useEffect(() => {
  fetch("http://localhost:4000/api/categorias")
    .then(res => res.json())
    .then(data => setCategorias(data))
    .catch(e => console.error(" Error al cargar categorías:", e));
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
      <Tooltip title="Regresar">
        <button className="btn-regresar" onClick={() => navigate("/")}>
          <KeyboardBackspaceIcon fontSize="large" />
        </button>
      </Tooltip>
      <Tooltip title="Buscar">
        <button className="btn-search" onClick={() => setModalOpen(true)}>
          <SearchIcon fontSize="large" />
        </button>
      </Tooltip>
      <Tooltip title="Filtrar">
        <button className="btn-filter" onClick={() => setModalFiltroAbierto(true)}>
          <TuneIcon fontSize="large" />
        </button>
      </Tooltip>

      <TableContainer component={Paper} className="table-container">
        <Table size="medium" aria-label="Tabla de negocios">
          <TableHead>
            <TableRow>
              <TableCell><strong>Imagen</strong></TableCell>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>RUT</strong></TableCell>
              <TableCell><strong>Descripción</strong></TableCell>
              <TableCell><strong>Dirección</strong></TableCell>
              <TableCell><strong>Teléfono</strong></TableCell>
              <TableCell><strong>Horario</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {negociosFiltrados.map((n) => (
              <TableRow key={n.ID_NEGOCIOS} hover style={{ cursor: "pointer" }} onClick={() => navigate(`/ProductoNegocio/${n.ID_NEGOCIOS}`)}>

                <TableCell>
                  <img
                    src={n.Imagen}
                    alt={n.NombreNegocio}
                    style={{ width: 50, height: 50, borderRadius: 8 }}
                  />
                </TableCell>
                <TableCell>{n.NombreNegocio}</TableCell>
                <TableCell>{n.RUT}</TableCell>
                <TableCell>
                  {n.Descripcion.length > 50
                    ? n.Descripcion.slice(0, 50) + "..."
                    : n.Descripcion}
                </TableCell>
                <TableCell>{n.Direccion}</TableCell>
                <TableCell>{n.NumTelefono}</TableCell>
                <TableCell>{n.Horario}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
