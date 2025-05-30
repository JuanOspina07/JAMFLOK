// Carrito.js
import React from 'react';
import "../styles/Carrito.css";

const Carrito = () => {
  return (
    <div className="carrito-container">
      <h3>Tu Carrito</h3>
      <div className="carrito-item">
        <p>Smartwatch para Hombres y Mujeres-Inalámbrico</p>
        <p>Funcionalidad de Llamadas, Más de 120 Modos...</p>
        <p>Color: Blanco</p>
        <div className="carrito-precio">
          <span>$214.000</span>
          <span>Cant: 1</span>
        </div>
      </div>
      
      <div className="carrito-item">
        <p>Silla de bolsa de frijol naranja suave y acogedora-PVC transpirable</p>
        <p>Color: Blanco</p>
        <div className="carrito-precio">
          <span>$140.000</span>
          <span>Cant: 1</span>
        </div>
      </div>
      
      <div className="carrito-item">
        <p>Soporte Ajustable de Plástico para Portátil</p>
        <p>Color: Gris</p>
        <div className="carrito-precio">
          <span>$40.000</span>
          <span>Cant: 1</span>
        </div>
      </div>
      
      <div className="carrito-total">
        <strong>Total: $394.000</strong>
      </div>
      
      <button className="carrito-pagar-btn">Ir a pagar</button>
    </div>
  );
};

export default Carrito;