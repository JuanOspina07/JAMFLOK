// Formulario.jsx
import React from 'react';
import {useNavigate} from "react-router-dom"
import '../Styles/Formulario.CSS'; // Asegúrate de crear este archivo con el CSS abajo

const Formulario = () => { 

  return (
    <div className="body">
      <h1 className="titulo">Formulario de Emprendimiento</h1>

      <div className="formulario">
        <h2>Información del Proyecto</h2>

        <form>
          <h3>Información básica</h3>

          <label htmlFor="inicio">¿Hace cuánto comenzaste?</label>
          <input type="text" id="inicio" name="inicio" required />

          <label htmlFor="equipo">¿Trabajas solo o en equipo?</label>
          <input type="text" id="equipo" name="equipo" required />

          <label>¿Tienes redes sociales?</label>
          <div className="radios">
            <label>
              <input type="radio" name="redes" value="si" required /> Sí
            </label>
            <label>
              <input type="radio" name="redes" value="no" /> No
            </label>
          </div>

          <h3>Motivación y Visión</h3>

          <label htmlFor="motivo">¿Por qué decidiste emprender?</label>
          <input type="text" id="motivo" name="motivo" required />

          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
