import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Login from './pages/Login';
import RegistroCliente from './pages/RegistroCliente';
import Modal from "./components/Modal";


function App() {
  return (
    <Router>
        <Routes>

          <Route index element={<Modal />} />
            <Route  path="/" element={<Login />} />
          
          <Route path="/registro" element={<RegistroCliente />}/>
      </Routes>
    </Router>
  );
}

{/*   
<RegistroCliente/>       
*/}

export default App;
