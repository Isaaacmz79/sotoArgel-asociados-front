import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../../components/branding/Logo";
import HistoryAdmin from "../../../components/sections/ia/admin/HistoryAdmin";

const AdminHistoryPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("ia_auth") !== "1") {
      navigate("/ia");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("ia_auth");
    navigate("/ia");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-5 md:px-10 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="hidden sm:flex items-center gap-2 ml-3">
            <span className="w-2 h-2 rounded-full bg-blueSecondary inline-block" />
            <span className="text-bluePrimary font-bold text-sm">
              Legal Labor Advisor
            </span>
            <span className="text-customGray text-xs">— Admin</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/ia/admin/history")}
            className="text-xs text-white bg-bluePrimary border border-bluePrimary rounded-lg px-3 py-1.5"
          >
            Historial
          </button>
          <button
            onClick={() => navigate("/ia/admin/feedbacks")}
            className="text-xs text-customGray border border-slate-200 rounded-lg px-3 py-1.5 hover:border-bluePrimary hover:text-bluePrimary transition-colors"
          >
            Feedbacks
          </button>
          <button
            onClick={() => navigate("/ia")}
            className="text-xs text-customGray border border-slate-200 rounded-lg px-3 py-1.5 hover:border-blueSecondary hover:text-blueSecondary transition-colors"
          >
            ← Asesor
          </button>
          <button
            onClick={handleLogout}
            className="text-xs text-customGray border border-slate-200 rounded-lg px-3 py-1.5 hover:border-red-300 hover:text-red-600 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Título de sección */}
      <div className="bg-white border-b border-slate-200 px-5 md:px-10 py-4">
        <h1 className="text-bluePrimary font-bold text-lg">Historial de sesiones</h1>
        <p className="text-customGray text-xs mt-0.5">
          Sesiones de consulta con sus recomendaciones y feedbacks
        </p>
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1">
        <HistoryAdmin />
      </div>

      <footer className="bg-bluePrimary text-white/60 text-center py-3 text-xs">
        Legal Labor Advisor &mdash; Solo para pruebas internas
      </footer>
    </div>
  );
};

export default AdminHistoryPage;
