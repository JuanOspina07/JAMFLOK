// src/RoutesApp.jsx
import { Routes, Route } from 'react-router-dom';
import PaginaInicio from './Components/Shared/PaginaInicio';
import Recuperar from './Components/Shared/Recuperar';

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<PaginaInicio />} />
      <Route path="/recuperar" element={<Recuperar />} />
    </Routes>
  );
};

export default RoutesApp;