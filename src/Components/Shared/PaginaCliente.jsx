import React, { useState } from "react";
import "../Styles/PaginaCliente.css";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import Tooltip from "@mui/material/Tooltip";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import ModalBusqueda from "./ModalBusqueda";
import FiltroCategorias from "./FiltroCategorias";

const PaginaCliente = () => {
  const userName = "Juan Pérez";
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFiltroAbierto, setModalFiltroAbierto] = useState(false);

  const compras = [
    {
      id: 1,
      producto: "Camiseta Oversize",
      fecha: "2025-04-12",
      total: "$45.000",
    },
    {
      id: 2,
      producto: "Pantalón Cargo",
      fecha: "2025-03-30",
      total: "$78.000",
    },
    { id: 3, producto: "Gorra Negra", fecha: "2025-02-21", total: "$25.000" },
  ];

  const handleSearch = (query) => {
    alert(`Buscando: "${query}"`);
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

      <div className="cliente-contenedor">
        <h1>Hola, {userName}</h1>

        <div className="perfil">
          <p>
            <strong>📧 Correo:</strong> juanperez@email.com
          </p>
          <p>
            <strong>🏠 Dirección:</strong> Cra 12 #45-67, Bogotá
          </p>
          <p>
            <strong>📞 Teléfono:</strong> +57 300 123 4567
          </p>
        </div>

        <div className="compras">
          <h2>🛍️ Tus Compras</h2>
          <ul>
            {compras.map((item) => (
              <li key={item.id}>
                <span>{item.producto}</span>
                <span>{item.fecha}</span>
                <span>{item.total}</span>
              </li>
            ))}
          </ul>
        </div>

        <ModalBusqueda
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSearch={handleSearch}
        />

        <FiltroCategorias
          isOpen={modalFiltroAbierto}
          onClose={() => setModalFiltroAbierto(false)}
          onFilter={(categoriasSeleccionadas) => {
            console.log("Filtrado con categorías:", categoriasSeleccionadas);
            
          }}
        />
      </div>
    </div>
  );
};

export default PaginaCliente;
