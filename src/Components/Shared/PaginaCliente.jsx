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
  const [personajes, setPersonajes] = useState([]);
  const [personajesFiltrados, setPersonajesFiltrados] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => {
        setPersonajes(data.results);
        setPersonajesFiltrados(data.results);
      })
      .catch((error) =>
        console.error("Error al obtener los personajes:", error)
      );
  }, []);

  const handleSearch = (query) => {
    const filtrados = personajes.filter((personaje) =>
      personaje.name.toLowerCase().includes(query.toLowerCase())
    );
    setPersonajesFiltrados(filtrados);
    setModalOpen(false);
  };

  return (
    <div className="pagina-cliente">
      <Tooltip title="Regresar">
        <button className="btn-regresar" onClick={() => navigate("/")}>
          <KeyboardBackspaceIcon fontSize="large" />
        </button>
      </Tooltip>
      <Tooltip title="Consultar">
        <button className="btn-search" onClick={() => setModalOpen(true)}>
          <SearchIcon fontSize="large" />
        </button>
      </Tooltip>
      <Tooltip title="Filtrar">
        <button
          className="btn-filter"
          onClick={() => setModalFiltroAbierto(true)}
        >
          <TuneIcon fontSize="large" />
        </button>
      </Tooltip>

      <div className="table-wrapper">
        <TableContainer component={Paper} className="table-container">
          <Table size="medium" aria-label="tabla de personajes">
            <TableHead>
              <TableRow className="table-head">
                <TableCell>
                  <strong>Imagen</strong>
                </TableCell>
                <TableCell>
                  <strong>Nombre</strong>
                </TableCell>
                <TableCell>
                  <strong>Estado</strong>
                </TableCell>
                <TableCell>
                  <strong>Especie</strong>
                </TableCell>
                <TableCell>
                  <strong>Origen</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personajesFiltrados.map((personaje) => (
                <TableRow key={personaje.id}>
                  <TableCell>
                    <img
                      src={personaje.image}
                      alt={personaje.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "8px",
                      }}
                    />
                  </TableCell>
                  <TableCell>{personaje.name}</TableCell>
                  <TableCell>{personaje.status}</TableCell>
                  <TableCell>{personaje.species}</TableCell>
                  <TableCell>{personaje.origin.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <ModalBusqueda
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSearch={handleSearch}
      />
      <FiltroCategorias
        isOpen={modalFiltroAbierto}
        onClose={() => setModalFiltroAbierto(false)}
        personajes={personajes}
        onFilter={(personajesFiltrados) => {
          setPersonajesFiltrados(personajesFiltrados);
        }}
      />
    </div>
  );
};

export default PaginaCliente;
