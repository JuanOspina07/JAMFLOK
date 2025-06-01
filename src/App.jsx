import { Routes, Route } from 'react-router-dom';
import PaginaCliente from './Components/Shared/PaginaCliente';
import PaginaInicio from './Components/Shared/PaginaInicio';
import Login from './Components/Shared/Login';
import Soporte from './Components/Shared/Soporte';
import Register from './Components/Shared/Registro';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/cliente" element={<PaginaCliente />} />
      <Route path="/Login" element={<Login />} />
       <Route path="/Soporte" element={<Soporte />} />
       <Route path="/Register" element={<Register />} />
    </Routes>
  );
}

export default App;
