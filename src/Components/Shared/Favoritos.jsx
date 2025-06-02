import React from 'react';
import "../Styles/Favoritos.css";
import logo from "../../../public/Logo.png";
import ajustes from "../../../public/Ajustes.png";
import casita from "../../../public/Casita.png";
import regresar from "../../../public/Regresar.png";

const Favoritos = () => {
    return (
        <div>
            <div className="head">
                <img src={logo} alt="Logo" className="Logo" />
                <div className="opciones">
                    <a href="Inicio.html">
                        <button className="button_inicio">
                            <img className="imagen1" src={ajustes} alt="Ajustes" />
                        </button>
                    </a>
                    <a href="Informacion.html">
                        <button className="button_inicio">
                            <img className="imagen2" src={casita} alt="Inicio" />
                        </button>
                    </a>
                </div>
            </div>

            <div>
                <h1>Productos favoritos</h1>
            </div>

            <div className="regresar_box">
                <a href="Inicio.html">
                    <button className="regresar">
                        <img src={regresar} alt="Regresar" />
                    </button>
                </a>
            </div>
        </div>
    );
};

export default Favoritos;
