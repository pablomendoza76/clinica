import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Recuperar from "./components/recuperar"; // Asegúrate de importar la página de recuperación

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recuperar" element={<Recuperar />} />
        <Route path="/inicio" element={<inicio />} />
      </Routes>
    </Router>
  );
}

export default App;
