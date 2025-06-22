import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Ayuda.css";
import logo from "../../../public/Logo.png";
import TopBar from "./TopBar"; 

const Ayuda = () => {
  return (
    <div>
      <TopBar />
      <div className="cont">
        <div className="ayuda">
          <div className="box_logo">
            <img src={logo} alt="Logo" className="Logo7" />
          </div>

          <h2>AYUDA Y SOPORTE DURANTE LA RECUPERACIÓN DE CONTRASEÑA</h2>
          <p className="intro">
            ¿Tienes problemas para restablecer tu contraseña? Te orientamos paso a paso.
          </p>

          <p>
            Sabemos lo frustrante que puede ser perder el acceso a tu cuenta. Por eso, ponemos a tu disposición este apartado con las preguntas frecuentes y recomendaciones más importantes:
          </p>

          <h3>¿No recibiste el correo de recuperación?</h3>
          <ul>
            <li>Asegúrate de haber ingresado correctamente tu dirección de correo electrónico asociada a tu cuenta.</li>
            <li>Revisa también la carpeta de spam, promociones o correo no deseado.</li>
            <li>En algunos casos, el proveedor de correo electrónico puede tardar unos minutos en entregar el mensaje. Espera entre 5 y 15 minutos y, si aún no lo recibes, vuelve a intentarlo o solicita el reenvío.</li>
          </ul>

          <h3>¿Ya no tienes acceso al correo electrónico vinculado?</h3>
          <ul>
            <li>Si no puedes acceder a tu correo electrónico registrado, puedes iniciar un proceso de verificación alternativa.</li>
            <li>Este proceso puede incluir la verificación por número telefónico, documento de identidad, preguntas de seguridad u otros métodos habilitados previamente.</li>
            <li>Contáctanos directamente desde el botón "No tengo acceso a mi correo" para que nuestro equipo revise tu caso.</li>
          </ul>

          <h3>¿Tu cuenta fue comprometida?</h3>
          <ul>
            <li>Si sospechas que alguien ha cambiado tu contraseña sin autorización, te recomendamos restablecerla de inmediato y notificar a nuestro equipo de soporte.</li>
            <li>También es aconsejable activar la verificación en dos pasos para una mayor seguridad.</li>
          </ul>

          <h3>Soporte personalizado</h3>
          <p>
            Si ninguna de estas soluciones resuelve tu problema, puedes contactar a nuestro equipo de asistencia técnica:
          </p>
          <ul className="contacto">
            <li><strong>Correo electrónico:</strong> soportejamflok@gmail.com</li>
            <li><strong>Horario de atención:</strong> Lunes a viernes de 8:00 a.m. a 6:00 p.m. (hora local)</li>
            <li><strong>Tiempo de respuesta estimado:</strong> entre 24 y 48 horas hábiles</li>
          </ul>

          <p>
            También puedes acceder a nuestro menu de soporte donde encontrarás artículos detallados sobre gestión de cuentas, contraseñas, seguridad y recuperación de acceso.
          </p>
        </div>
      </div>
    </div>
  );
};
  
export default Ayuda;