import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Login from './pages/Login';
import RegistroCliente from './pages/RegistroCliente';
import ProductosEmpresa from "../src/pages/ProductosEmpresas"

function App() {
  return (
    <Router>
        <Routes>
          <Route index element = {<ProductosEmpresa />} />
          <Route  path="/Login" element={<Login />} />
          <Route path="/registro" element={<RegistroCliente />}/>
      </Routes>
    </Router>
  );
}
export default App;
