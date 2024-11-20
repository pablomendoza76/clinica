import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import "../css/loggin.css"; // Asegúrate de tener los estilos adecuados aquí

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // Definir useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí debes validar las credenciales (puedes hacer una validación a través de una API o función)
    const isValid = validateCredentials(email, password);

    if (isValid) {
      // Redirigir a la página de inicio si las credenciales son correctas
      navigate("/inicio");
    } else {
      // Mostrar mensaje de error si las credenciales son incorrectas
      setError(true);
    }
  };

  const validateCredentials = (email, password) => {
    // Lógica para validar las credenciales, puedes hacer una llamada a una API o una validación local
    // Por ahora solo simularé que las credenciales son correctas si coinciden con valores específicos
    if (email === "usuario@ejemplo.com" && password === "123456") {
      return true;
    }
    return false;
  };

  return (
    <div className="contenedor-login">
      <h1>¡Bienvenido a la Clínica San José!</h1>
      <form className="formulario" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Ingrese su correo aquí"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="seccion-recordar">
          <label>
            <input type="checkbox" /> Recuérdame
          </label>
          <span className="olvido-contrasena">¿Olvidó su contraseña?</span>
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p className="error">Credenciales incorrectas, intente nuevamente.</p>}
    </div>
  );
};

export default Login;
