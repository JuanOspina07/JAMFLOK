import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/Reseñas.css";
import { Star, StarOff } from "lucide-react";

const Reseñas = () => {
  const { idNegocio } = useParams();
  const navigate = useNavigate();

  const [estrellas, setEstrellas] = useState(0);
  const [texto, setTexto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (estrellas === 0 || texto.trim().length === 0) {
      setError("Debes ingresar estrellas y un comentario.");
      return;
    }
    setEnviando(true);
    try {
      await axios.post("http://localhost:4000/api/resenas", {
        ID_CALIFICACION: estrellas,
        ID_NEGOCIO: idNegocio,
        Descripcion: texto.trim(),
      });
      navigate(-1); // volver atrás después de enviar
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al enviar la reseña.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="resenas-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Volver
      </button>
      <h2>Escribir una reseña</h2>
      <form className="resenas-form" onSubmit={handleSubmit}>
        <div className="stars-input">
          {[1,2,3,4,5].map((n) => (
            <span key={n} onClick={() => setEstrellas(n)} className="star">
              {n <= estrellas ? (
                <Star fill="#facc15" stroke="#facc15" size={32} />
              ) : (
                <StarOff stroke="#ccc" size={32} />
              )}
            </span>
          ))}
        </div>

        <textarea
        className="resenaclient"
          rows="5"
          placeholder="Escribe tu reseña..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar reseña"}
        </button>
      </form>
    </div>
  );
};

export default Reseñas;
