import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../public/Logo.png";
import TopBar from "./TopBar"; 
import "../Styles/Privacidad.css";
const Privacidad = () => {
  return (
    <div>
      <TopBar />
      <div className="cont">
        <div className="privacidad">
          <div className="box_logo">
            <img src={logo} alt="Logo" className="Logo7" />
          </div>

          <h2>POLÍTICA DE PRIVACIDAD</h2>
          <h3>Protección de tus datos personales durante la recuperación de contraseña</h3>
          <p>
            La privacidad de nuestros usuarios es una prioridad fundamental. Durante el proceso de recuperación de contraseña, recopilamos únicamente los datos estrictamente necesarios para validar tu identidad y facilitar el acceso seguro a tu cuenta. Esta información incluye, entre otros, tu dirección de correo electrónico, tu dirección IP y detalles técnicos mínimos que permitan proteger la integridad del proceso.
          </p>

          <p>
            Toda la información recabada se utiliza exclusivamente con los siguientes fines:
          </p>
          <ul>
            <li>Verificar que eres el titular legítimo de la cuenta.</li>
            <li>Enviarte de forma segura las instrucciones para restablecer tu contraseña.</li>
            <li>Prevenir accesos no autorizados o fraudes relacionados con el proceso de autenticación.</li>
          </ul>

          <h3>Tratamiento y almacenamiento de los datos</h3>
          <ul>
            <li>Los datos que ingresas se transmiten a través de canales cifrados utilizando el protocolo HTTPS, garantizando que terceros no puedan interceptarlos.</li>
            <li>No almacenamos contraseñas en texto plano. Utilizamos algoritmos de cifrado seguros, como bcrypt o SHA-256 con salt.</li>
            <li>El acceso a los datos está limitado al personal autorizado, y nuestros sistemas están protegidos por medidas de seguridad robustas.</li>
          </ul>

          <h3>Terceros y uso compartido de la información</h3>
          <p>
            No compartimos tu información personal con terceros ajenos al servicio, excepto cuando sea legalmente requerido o estrictamente necesario para la prestación del servicio (por ejemplo, en plataformas de envío de correo transaccional).
          </p>

          <p>
            Para más información detallada sobre cómo manejamos tu información, derechos sobre tus datos, y cómo ejercerlos, consulta nuestra [Política de Privacidad completa].
          </p>
        </div>
      </div>
    </div>
  );
};
  
export default Privacidad;