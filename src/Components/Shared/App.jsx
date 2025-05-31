import { useState } from 'react'

import { Routes, Route } from 'react-router-dom';
import PanelAjustes from './PanelAjustes';
import EditarPanel from './EditarPanel'; 
import Reseñas from './Reseñas';








function App() {
  
  return ( 
    <Routes>
   <Route path="/"element = {<PanelAjustes/>}/>
   <Route path="/Editar panel"element = {<EditarPanel/>}/>
   <Route path="/reseñas" element={<Reseñas />} />
   </Routes>
   

  );
}

export default App;
