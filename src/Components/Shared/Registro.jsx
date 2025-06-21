
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import TopBar from "./TopBar";
import "../Styles/Registro.css";

function Registro () {
  const navigate = useNavigate();
  const [paises, setPaises] = useState([]);
  const [selectedPais, setSelectedPais] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [selectedDepartamento, setSelectedDepartamento] = useState(""); 
  const [ciudades, setCiudades] = useState([]);
  const [tiposDocumento, setTiposDocumento] = useState([]);
  const [selectedTipoDocumento, setSelectedTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [primerNombre, setPrimerNombre] = useState("");
  const [segundoNombre, setSegundoNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [edad, setEdad] = useState("");
  const [selectedCiudad, setSelectedCiudad] = useState("");
  const [celular, setCelular] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const[role, setRole] = useState([]); 
  const[selecRoles,setSelectRol]= useState("");
 useEffect(() => {
    fetch("http://localhost:4000/api/paises")
      .then((response) => response.json())
      .then((data) => {
        console.log("Países recibidos:", data);
        setPaises(data);
      })
      .catch((error) => console.error("Error al obtener los países:", error));
  }, []);
  

  useEffect(() => {
    if (selectedPais) {
      fetch(`http://localhost:4000/api/departamentos/${selectedPais}`)
        .then((response) => response.json())
        .then((data) => setDepartamentos(data))
        .catch((error) =>
          console.error("Error al obtener los departamentos:", error)
        );
    } else {
      setDepartamentos([]);
      setCiudades([]); 
    }
  }, [selectedPais]);


  useEffect(() => {
    if (selectedDepartamento) {
      fetch(`http://localhost:4000/api/ciudades/${selectedDepartamento}`)
        .then((response) => response.json())
        .then((data) => setCiudades(data))
        .catch((error) =>
          console.error("Error al obtener las ciudades:", error)
        );
    } else {
      setCiudades([]); 
    }
  }, [selectedDepartamento]);

  useEffect(() => {
    fetch("http://localhost:4000/api/tipos-documento")
      .then((response) => response.json())
      .then((data) => {
        console.log("Tipos de documento recibidos:", data);
        setTiposDocumento(data);
      })
      .catch((error) => console.error("Error al obtener los tipos de documento:", error));
  }, []);
   useEffect(() => {
    fetch("http://localhost:4000/api/rol")
      .then((response) => response.json())
      .then((data) => {
        console.log("Tipos de Roles recibidos:", data);
        setRole(data);
      })
      .catch((error) => console.error("Error al obtener los Roles:", error));
  }, []);


  
  

  const handleRegister = async (event) => {
    event.preventDefault();

    if (isNaN(edad) || edad <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Edad inválida',
        text: 'Por favor, ingrese una edad válida.',
        confirmButtonColor: '#d4af37'
      });
      return;
    }
  
    const usuarioData = {
      numeroDocumento,
      idTipoDocumento: Number(selectedTipoDocumento),
      nombreUsuario,
      correo,
      contraseña,
      primerNombre,
      segundoNombre,
      primerApellido,
      segundoApellido,
      edad: Number(edad),
      idCiudad: Number(selectedCiudad),
      celular,
      fechaNacimiento,
      rol: Number(selecRoles),
    };
  
    try {
      const response = await fetch("http://localhost:4000/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      await Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Tu cuenta ha sido creada correctamente.',
        confirmButtonColor: '#d4af37'
      });
      navigate("/login");
    } catch (error) {
      console.error("Error en el registro:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: error.message,
        confirmButtonColor: '#d4af37'
      });
    }
  };
  

  const handleSoporte = () => {
  navigate("/Soporte");}


  return (
    <div className="login-page">
      <TopBar/>

      <main className="Register-container">
        <div className="Register-box">
          <h2>REGISTER</h2>
          <div className="UserBox2">
            <input type="text" value={primerNombre} onChange={(e) => setPrimerNombre(e.target.value)} required className="inputfield2" />
            <label className="label2">Primer Nombre</label>
          </div>
          <div className="UserBox2">
            <input type="text" value={segundoNombre} onChange={(e) => setSegundoNombre(e.target.value)} className="inputfield2" />
            <label className="label2">Segundo Nombre</label>
          </div>
          <div className="UserBox2">
            <input type="text" value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} required className="inputfield2" />
            <label className="label2">Primer Apellido</label>
          </div>
          <div className="UserBox2">
            <input type="text" value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} required className="inputfield2" />
            <label className="label2">Segundo Apellido</label>
          </div>
          <div className="UserBox2">
            <input type="number" value={edad} onChange={(e) => { const valor = e.target.value.replace(/\D/g, ""); // Elimina cualquier caracter no numérico
  setEdad(valor);}} onKeyDown={(e) => {
    if (e.key === "e" || e.key === "E" || e.key === "-" || e.key === "+") {
      e.preventDefault();
    }
  }} required className="inputfield2" />
            <label className="label2">Edad</label>
          </div>
          <div className="UserBox2">
            <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required className="inputfield2" />
            <label className="label2">Fecha de Nacimiento</label>
          </div>
          <div className="UserBox2">
              <select
                required
                className="inputfield2"
                value={selectedTipoDocumento}
                onChange={(e) => setSelectedTipoDocumento(e.target.value)}
              >
                <option value="">Seleccione un tipo de documento</option>
                {tiposDocumento.map((tipo) => (
                  <option key={tipo.ID_TIPO_DOCUMENTO} value={tipo.ID_TIPO_DOCUMENTO}>
                    {tipo.Nombre}
                  </option>
                ))}
              </select>
              <label className="label2">Tipo de Documento</label>
            </div>
          <div className="UserBox2">
            <input type="number" value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} required className="inputfield2" />
            <label className="label2">Identificación</label>
          </div>
          <div className="UserBox2">
            <input type="tel" value={celular} onChange={(e) => setCelular(e.target.value)}  required className="inputfield2" />
            <label className="label2">Celular</label>
          </div>
          <div className="UserBox2">
              <select
                required
                className="inputfield2"
                value={selectedPais}
                onChange={(e) => setSelectedPais(e.target.value)} 
              >
                <option value="">Seleccione un país</option>
                {paises.map((pais) => (
                  <option key={pais.ID_PAIS} value={pais.ID_PAIS}>
                    {pais.Nombre} 
                  </option>
                ))}
              </select>
              <label className="label2">País</label>
          </div>

          <div className="UserBox2">
            <select
              required
              className="inputfield2"
              value={selectedDepartamento} 
              onChange={(e) => setSelectedDepartamento(e.target.value)} 
            >
              <option value="">Seleccione un departamento</option>
              {departamentos.map((depto) => (
                <option key={depto.ID_DEPARTAMENTO} value={depto.ID_DEPARTAMENTO}>
                  {depto.Nombre}
                </option>
              ))}
            </select>
            <label className="label2">Departamento</label>
          </div>

          <div className="UserBox2">
            <select
              required
              className="inputfield2"
              value={selectedCiudad}
              onChange={(e) => setSelectedCiudad(e.target.value)}
            >
              <option value="">Seleccione una ciudad</option>
              {ciudades.map((ciudad) => (
                <option key={ciudad.ID_CIUDAD} value={ciudad.ID_CIUDAD}>
                  {ciudad.Nombre}
                </option>
              ))}
            </select>
            <label className="label2">Ciudad</label>
          </div>
          <div className="UserBox2">
              <select
                required
                className="inputfield2"
                value={selecRoles}
                onChange={(e) => setSelectRol(e.target.value)}
              >
                <option value="">Seleccione el Rol que deseas</option>
                {role.map((roles) => (
                  <option key={roles.ID_ROL} value={roles.ID_ROL}>
                    {roles.Nombre}
                  </option>
                ))}
              </select>
              <label className="label2">Rol</label>
            </div>
          <div className="UserBox2">
            <input type="text" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required className="inputfield2" />
            <label className="label2">UserName</label>
          </div>
          <div className="UserBox2">
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required className="inputfield2" />
            <label className="label2">Correo</label>
          </div>
          <div className="UserBox2">
            <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required className="inputfield2" />
            <label className="label2">Password</label>
          </div>
          <button className="btresg" type="submit" onClick={handleRegister}>Register</button>
        </div>
      </main>
    </div>
  );
};

export default Registro;
