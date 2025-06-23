import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Condiciones.css";
import logo from "../../../public/Logo.png";
import TopBar from "./TopBar"; 

const Condiciones = () => {
     const navigate = useNavigate();
  return (
    <div>
      <TopBar />
      <div className="cont">
        <div className="condiciones">
            <button className="btn-volver" onClick={() => navigate(-1)}>←</button>
          <div className="box_logo">
            <img src={logo} alt="Logo" className="Logo7" />
          </div>

          <h2>TÉRMINOS Y CONDICIONES DE USO DEL SERVICIO</h2>
          <h3>Aceptación y responsabilidad del usuario durante el proceso de recuperación</h3>
          <p>
            Al utilizar la funcionalidad de recuperación de contraseña de nuestra plataforma, declaras que:
          </p>
          <ul>
            <li>Eres el legítimo titular de la cuenta asociada al correo electrónico ingresado.</li>
            <li>Aceptas nuestras normas de uso, así como nuestras políticas de privacidad y seguridad.</li>
            <li>No estás intentando suplantar la identidad de otra persona ni acceder de forma no autorizada a cuentas ajenas.</li>
          </ul>

          <h3>Condiciones específicas del proceso de recuperación</h3>
          <ul>
            <li>Este sistema está diseñado exclusivamente para facilitar el acceso a cuentas legítimas. Cualquier uso indebido, intento de violación de seguridad o suplantación será detectado y reportado.</li>
            <li>En algunos casos, la plataforma puede solicitar métodos de verificación adicionales (como autenticación de dos factores o identificación manual).</li>
            <li>No garantizamos el acceso inmediato a la cuenta si los datos proporcionados no coinciden con los registrados. Esta es una medida de protección para evitar accesos no autorizados.</li>
          </ul>

          <h3>Modificaciones y actualizaciones</h3>
          <ul>
            <li>Nos reservamos el derecho de modificar esta funcionalidad o los métodos de validación por motivos de seguridad, mejora del servicio o cumplimiento normativo.</li>
            <li>Las condiciones aquí descritas pueden cambiar con el tiempo. Te notificaremos si realizamos cambios sustanciales en los términos que afecten tu acceso o la seguridad de tu cuenta.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
  
export default Condiciones;