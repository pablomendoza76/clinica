import React from "react";
import "../css/inicio.css";

// Importar las imágenes
import crearPacienteImg from "../img2/usuario.png";
import gestionHistoriasImg from "../img2/historia.png";
import tratamientosImg from "../img2/tratamiento.png";

const Inicio = () => {
  return (
    <div className="inicio-container">
      <h1>¡Bienvenido a la Clínica San José!</h1>
      <p>Elija una acción según sus necesidades haciendo clic en la opción correspondiente para continuar.</p>
      <div className="modulos-container">
        <div className="modulo">
          <img src={crearPacienteImg} alt="Crear Paciente" />
          <p>Crear Paciente</p>
        </div>
        <div className="modulo">
          <img src={gestionHistoriasImg} alt="Gestión Historias" />
          <p>Gestión de Historias</p>
        </div>
        <div className="modulo">
          <img src={tratamientosImg} alt="Tratamientos" />
          <p>Tratamientos</p>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
