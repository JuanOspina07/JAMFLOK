// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import PaginaInicio from './Components/Shared/PaginaInicio';
import Login from './Components/Shared/Login';
import Register from './Components/Shared/Registro';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
