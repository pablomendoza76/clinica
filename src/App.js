import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login"; // Importa el componente Login
import Inicio from "./components/inicio"; // Importa el componente Inicio

function App() {
  return (
    // Aquí envolvemos todo el contenido con Router para habilitar el uso de navegación
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Ruta de login */}
        <Route path="/inicio" element={<Inicio />} /> {/* Ruta de inicio */}
      </Routes>
    </Router>
  );
}

export default App;
