import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/PaginaEmprendedor.css";
import Sidebar from "./SideBar";

const MisNegocios = ({ idUsuario: propIdUsuario }) => {
  const [negocios, setNegocios] = useState([]);
  const navigate = useNavigate();
  const idUsuario = propIdUsuario || localStorage.getItem("idUsuario");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const obtenerMisNegocios = async () => {
    if (!idUsuario) return;
    try {
      const res = await axios.get(
        `http://localhost:4000/api/negocios/${idUsuario}`
      );
      setNegocios(res.data);
    } catch (error) {
      console.error("Error al obtener los negocios:", error);
    }
  };

  useEffect(() => {
    obtenerMisNegocios();
  }, [idUsuario]);

  return (
    <div className="mis-negocios-container">
      <Sidebar onLogout={() => localStorage.removeItem("idUsuario")} />

      {negocios.length === 0 ? (
        <p className="texto-vacio">No tienes negocios registrados todavía.</p>
      ) : (
        <div className="tarjetas-grid">
          {negocios.map((negocio) => (
            <div
              key={negocio.ID_NEGOCIOS}
              className="tarjeta-negocio"
              onClick={() => navigate(`/negocio/${negocio.ID_NEGOCIOS}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={negocio.Imagen}
                alt={negocio.NombreNegocio}
                className="imagen-negocio"
              />
              <div className="contenido">
                <h3 className="nombre">{negocio.NombreNegocio}</h3>
                <p className="descripcion">
                  {negocio.Descripcion?.length > 100
                    ? negocio.Descripcion.substring(0, 100) + "..."
                    : negocio.Descripcion}
                </p>
                <p className="info">
                  <strong>Ciudad:</strong> {negocio.Ciudad}
                </p>
                <p className="info">
                  <strong>Dirección:</strong> {negocio.Direccion}
                </p>
                <p className="info">
                  <strong>Horario:</strong> {negocio.Horario}
                </p>
                <p className="info">
                  <strong>Teléfono:</strong> {negocio.Telefono}
                </p>
                <p className="info">
                  <strong>RUT:</strong> {negocio.RUT}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisNegocios;
