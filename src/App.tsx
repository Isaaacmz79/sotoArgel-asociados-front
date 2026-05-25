import { BrowserRouter, Routes, Route } from "react-router-dom";
import Consulta from "./pages/consulta/index"; 
import Home from "./pages/index"; 
import Custom404 from "./pages/404"; // Importa tu componente 404
import PrivacyPolicies from "./pages/legal/politica-de-tratamiento-de-datos/index";
import DataProcessingAuthorization from "./pages/legal/autorizacion-tratamiento-de-datos/index";
import IAPage from "./pages/ia/index";
import AdminFeedbacksPage from "./pages/ia/admin/feedbacks";
import AdminHistoryPage from "./pages/ia/admin/history";
import "./styles/globals.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/legal/politica-de-tratamiento-de-datos" element={<PrivacyPolicies />} />
        <Route path="/legal/autorizacion-tratamiento-de-datos" element={<DataProcessingAuthorization />} />
        <Route path="/consulta" element={<Consulta />} />
        {/* Rutas internas IA — acceso solo por URL */}
        <Route path="/ia" element={<IAPage />} />
        <Route path="/ia/admin/feedbacks" element={<AdminFeedbacksPage />} />
        <Route path="/ia/admin/history" element={<AdminHistoryPage />} />
        {/* Ruta para páginas no encontradas */}
        <Route path="*" element={<Custom404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
