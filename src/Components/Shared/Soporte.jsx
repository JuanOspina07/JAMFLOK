import React, { useState } from 'react';
import "../Styles/Soporte.css";
import Carrito from './Carrito';
import { useNavigate } from 'react-router-dom';

const preguntasCompradores = [
  {
    pregunta: '¿Cómo creo una cuenta?',
    respuesta: 'Para crear una cuenta, dirígete a la página de registro y completa los datos requeridos.'
  },
  {
    pregunta: '¿Cómo actualizo mis datos personales?',
    respuesta: 'Puedes actualizar tus datos desde tu perfil en la sección de configuración.'
  },
  {
    pregunta: 'Olvidé mi contraseña, ¿cómo la recupero?',
    respuesta: 'Haz clic en "Olvidé mi contraseña" en la pantalla de inicio de sesión y sigue las instrucciones.'
  },
  {
    pregunta: '¿Cómo hago una compra?',
    respuesta: 'Navega por los productos, agrégalos al carrito y sigue el proceso de pago.'
  },
  {
    pregunta: '¿Qué hago si mi pedido no ha llegado?',
    respuesta: 'Revisa el estado de tu pedido en tu perfil o contacta con soporte.'
  },
  {
    pregunta: '¿Puedo cancelar o modificar una compra después de pagar?',
    respuesta: 'Depende del estado del pedido. Contacta con soporte lo antes posible.'
  },
  {
    pregunta: '¿Qué métodos de pago están disponibles?',
    respuesta: 'Aceptamos tarjetas de crédito, débito, y otros métodos locales según tu país.'
  }
];

const preguntasEmprendedores = [
  {
    pregunta: '¿Cómo creo mi tienda o perfil de negocio?',
    respuesta: 'Ve a la sección de emprendedores y sigue los pasos para crear tu tienda.'
  },
  {
    pregunta: '¿Dónde veo mis ventas y estadísticas?',
    respuesta: 'Puedes ver tus ventas y estadísticas desde el panel de control de tu cuenta.'
  },
  {
    pregunta: '¿Cómo publico un producto?',
    respuesta: 'Entra al panel de emprendedor y usa la opción "Publicar producto".'
  },
  {
    pregunta: '¿Cómo agrego imágenes o descripciones a mis productos?',
    respuesta: 'Al publicar o editar un producto, tendrás opciones para subir imágenes y añadir descripciones.'
  },
  {
    pregunta: '¿Puedo editar un producto ya publicado?',
    respuesta: 'Sí, puedes editar cualquier producto desde tu panel de control.'
  }
];

const Soporte = () => {
  const [seccion, setSeccion] = useState('');
  const [preguntaActiva, setPreguntaActiva] = useState(null);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const navigate = useNavigate();

  const renderPreguntas = (preguntas) => (
    <div className="preguntas">
      {preguntas.map((item, index) => (
        <div key={index} className="pregunta-item">
          <button 
            className="pregunta" 
            onClick={() => setPreguntaActiva(index === preguntaActiva ? null : index)}
          >
            {item.pregunta}
            <span className="checkmark"></span>
          </button>
          {preguntaActiva === index && <div className="respuesta">{item.respuesta}</div>}
        </div>
      ))}
    </div>
  );

  return (
    <div className="soporte-container">
      <header className="main-header">
        <h1 className="main-logo">JAMFLOK</h1>
        <nav className="main-nav">
          <button 
            className="nav-button" 
            onClick={() => navigate('/')}
          >
            Inicio
          </button>
          <button 
            className="nav-button active" 
            onClick={() => navigate('/soporte')}
          >
            Soporte
          </button>
          <button 
            className="nav-button"
            onMouseEnter={() => setMostrarCarrito(true)}
            onMouseLeave={() => setMostrarCarrito(false)}
          >
            Carrito
          </button>
        </nav>
      </header>

      {mostrarCarrito && (
        <div 
          className="carrito-hover"
          onMouseEnter={() => setMostrarCarrito(true)}
          onMouseLeave={() => setMostrarCarrito(false)}
        >
          <Carrito />
        </div>
      )}

      <div className="content">
        <h2 className="titulo">Temas de ayuda</h2>
        
        <div className="help-section">
          <div 
            className={`section-header ${seccion === 'compradores' ? 'active' : ''}`}
            onClick={() => { 
              setSeccion(seccion === 'compradores' ? '' : 'compradores'); 
              setPreguntaActiva(null); 
            }}
          >
            <span>Compradores</span>
            <span className="checkmark">v</span>
          </div>
          {seccion === 'compradores' && renderPreguntas(preguntasCompradores)}
        </div>

        <div className="help-section">
          <div 
            className={`section-header ${seccion === 'emprendedores' ? 'active' : ''}`}
            onClick={() => { 
              setSeccion(seccion === 'emprendedores' ? '' : 'emprendedores'); 
              setPreguntaActiva(null); 
            }}
          >
            <span>Emprendedores</span>
            <span className="checkmark">v</span>
          </div>
          {seccion === 'emprendedores' && renderPreguntas(preguntasEmprendedores)}
        </div>

        <div className="contacto">
          <h3>¿Aun no resolvimos tu duda?</h3>
          <button className="contacto-btn">Contáctanos</button>
        </div>
      </div>
    </div>
  );
};

export default Soporte;
