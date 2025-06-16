import { Routes, Route } from 'react-router-dom';
import PaginaCliente from './Components/Shared/PaginaCliente';
import PaginaInicio from './Components/Shared/PaginaInicio';
import Login from './Components/Shared/Login';
import Soporte from './Components/Shared/Soporte';
import Register from './Components/Shared/Registro';
import Recuperar from './Components/Shared/Recuperar';
import Formulario from './Components/Shared/Formulario'; 
import Informacion from './Components/Shared/Informacion'; 
import PaginaEmprendedor from './Components/Shared/PaginaEmprendedor';
function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/cliente" element={<PaginaCliente />} />
      <Route path="/emprendedor" element={<PaginaEmprendedor />} />
      <Route path="/Login" element={<Login />} />
       <Route path="/Soporte" element={<Soporte />} />
       <Route path="/Register" element={<Register />} />
       <Route path="/Recuperar" element={<Recuperar />} />
       <Route path="/Formulario" element={<Formulario/>}/>
       <Route path="/informacion" element={<Informacion />} />
    </Routes>
  );
}

export default App;
