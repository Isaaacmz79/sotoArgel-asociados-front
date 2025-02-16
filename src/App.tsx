import { BrowserRouter, Routes, Route } from "react-router-dom";
import Consulta from "./pages/consulta/index"; 
import Home from "./pages/index"; 
import Custom404 from "./pages/404"; // Importa tu componente 404
import PrivacyPolicies from "./pages/legal/politica-de-tratamiento-de-datos/index";
import DataProcessingAuthorization from "./pages/legal/autorizacion-tratamiento-de-datos/index";
import "./styles/globals.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/legal/politica-de-tratamiento-de-datos" element={<PrivacyPolicies />} />
        <Route path="/legal/autorizacion-tratamiento-de-datos" element={<DataProcessingAuthorization />} />
        <Route path="/consulta" element={<Consulta />} />
        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<Custom404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
