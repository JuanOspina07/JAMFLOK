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
import RestablecerCon from './Components/Shared/RestablecerCon';
import AgregarNegocio from './Components/Shared/AgregarNegocio';
import DetalleNegocio from './Components/Shared/NegocioDetalle';
import AgregarProducto from './Components/Shared/AgregarProducto';
import ProductosNegocio from './Components/Shared/ProductosNegocio';
import PanelAjustes from './Components/Shared/PanelAjustes';
import EditarPanel from './Components/Shared/EditarPanel';
import Reseñas from './Components/Shared/Reseñas';
function App() {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/cliente" element={<PaginaCliente />} />
      <Route path="/emprendedor" element={<PaginaEmprendedor />} />
      <Route path="/ajustes" element={<PanelAjustes />} />
      <Route path="/editar-panel" element={<EditarPanel />} />
      <Route path="/Reseñas" element={<Reseñas />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Soporte" element={<Soporte />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Recuperar" element={<Recuperar />} />
      <Route path="/recuperar/:token" element={<Recuperar />} />
      <Route path="/restablecer/:token" element={<RestablecerCon />} /> 
      <Route path="/Formulario" element={<Formulario/>}/>
      <Route path="/informacion" element={<Informacion />} />
      <Route path="/nuevo-negocio" element={<AgregarNegocio />} />
      <Route path="/negocio/:id" element={<DetalleNegocio />} />
      <Route path="/agregar-producto/:id" element={<AgregarProducto />} />
      <Route path="/ProductoNegocio/:id" element={<ProductosNegocio />} />

    </Routes>
  );
}

export default App;
