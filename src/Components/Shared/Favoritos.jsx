import React, { useState, useEffect } from 'react';
import '../Styles/Favoritos.css';
import Sidebar from './SideBarCliente';

const Favoritos = () => {
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userId = localStorage.getItem("idUsuario"); // ⬅️ Aquí lo tomamos

  useEffect(() => {
    const cargarFavoritos = async () => {
      if (!userId) {
        setError('ID de usuario no válido');
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/favoritos/${userId}`);
        if (!res.ok) throw new Error('Error al cargar favoritos');
        const data = await res.json();
        setFavoritos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    cargarFavoritos();
  }, [userId]);

  return (
    <div className="fav-wrapper">
            <Sidebar onLogout={() => localStorage.removeItem("idUsuario")} />

        
      <h1 className="fav-title">Negocios Favoritos</h1>

      {loading && <div className="fav-message">Cargando...</div>}
      {error && <div className="fav-error">{error}</div>}

      {!loading && !error && favoritos.length === 0 && (
        <div className="fav-message">No tienes negocios favoritos aún.</div>
      )}

      {!loading && !error && favoritos.length > 0 && (
        <div className="fav-grid">
          {favoritos.map((bus) => (
            <div key={bus.ID_NEGOCIOS} className="fav-card">
              <div className="fav-card-img">
                <img
                  src={bus.Logo || 'https://via.placeholder.com/400x250?text=Sin+Imagen'}
                  alt={bus.NombreNegocio}
                />
              </div>
              <div className="fav-card-content">
                <h2>{bus.NombreNegocio}</h2>
                <p>{bus.Descripcion?.slice(0, 100) || 'Sin descripción'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favoritos;
