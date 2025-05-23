import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/PaginaInicio.css"; // Asegúrate de que la ruta sea correcta
import fondo from "../../../public/Fondo1.jpg"; // Asegúrate de que la ruta sea correcta
import logo from "../../../public/Logo.png"; // Asegúrate de que la ruta sea correcta
import facebook from "../../../public/Facebook.png"; // Asegúrate de que la ruta sea correcta
import instagram from "../../../public/Instagram.png"; // Asegúrate de que la ruta sea correcta
import tiktok from "../../../public/TikTok.png"; // Asegúrate de que la ruta sea correcta
import linkedin from "../../../public/Linkedin.png"; // Asegúrate de que la ruta sea correcta
export const PaginaInicio = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    // Redirige a la ruta /login (ajusta si tienes otra ruta)
    navigate("/login");
  };

  return (
    <div className="pagina-inicio">
      <div className="head">
        <h1 className="tittle">JAMFLOK</h1>
        <div className="menu">
          <button className="options">Inicio</button>
          <button className="options">Soporte</button>
          <button className="options">Información</button>
        </div>
      </div>
      <div className="bienvenida">
        <img className="Logo" src={logo} alt="" />
        <p className="eslogan">Vende fácil, compra mejor.</p>
        <button className="sesion" onClick={handleClick}>
          Iniciar sesión
        </button>
        <p className="text">
          ¿No tienes una cuenta?{" "}
          <a
            href="instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            crea una aquí
          </a>
        </p>
      </div>
      <div className="redes">
        <p className="redes_text">Redes sociales</p>
        <div className="botones_redes">
          <a href="#">
            <button className="botones">
              <img src={facebook} alt="Facebook" />
            </button>
          </a>
          <a href="#">
            <button className="botones">
              <img src={instagram} alt="Instagram" />
            </button>
          </a>
          <a href="#">
            <button className="botones">
              <img src={tiktok} alt="TikTok" />
            </button>
          </a>
          <a href="#">
            <button className="botones">
              <img src={linkedin} alt="Linkedin" />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaginaInicio;