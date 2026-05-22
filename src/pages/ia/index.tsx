import React, { useEffect, useState } from "react";
import LoginIA from "../../components/sections/ia/LoginIA";
import ConsultaStep from "../../components/sections/ia/ConsultaStep";
import ContextStep from "../../components/sections/ia/ContextStep";
import ResultsStep from "../../components/sections/ia/ResultsStep";
import { Logo } from "../../components/branding/Logo";
import type { IASessionContext, IAStep, RecommendData } from "../../types/ia";

const IAPage: React.FC = () => {
  const [step, setStep] = useState<IAStep>("login");
  const [ctx, setCtx] = useState<IASessionContext | null>(null);
  const [result, setResult] = useState<RecommendData | null>(null);

  // Verificar si ya hay sesión activa al cargar
  useEffect(() => {
    if (sessionStorage.getItem("ia_auth") === "1") {
      setStep("consulta");
    }
  }, []);

  const handleLogin = () => {
    setStep("consulta");
  };

  const handleContextSuccess = (newCtx: IASessionContext) => {
    setCtx(newCtx);
    setStep("context");
  };

  const handleRecommendSuccess = (data: RecommendData) => {
    setResult(data);
    setStep("results");
  };

  const handleNewConsulta = () => {
    setCtx(null);
    setResult(null);
    setStep("consulta");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("ia_auth");
    setCtx(null);
    setResult(null);
    setStep("login");
  };

  if (step === "login") {
    return <LoginIA onLogin={handleLogin} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header interno */}
      <header className="bg-white shadow-sm px-5 md:px-10 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="hidden sm:flex items-center gap-2 ml-3">
            <span className="w-2 h-2 rounded-full bg-blueSecondary inline-block" />
            <span className="text-bluePrimary font-bold text-sm">
              Legal Labor Advisor
            </span>
            <span className="text-customGray text-xs">
              — Asesoría en Derecho Laboral
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs text-customGray border border-slate-200 rounded-lg px-3 py-1.5 hover:border-red-300 hover:text-red-600 transition-colors"
        >
          Cerrar sesión
        </button>
      </header>

      {/* Contenido */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-5 py-8 md:py-10">
        {step === "consulta" && (
          <ConsultaStep onSuccess={handleContextSuccess} />
        )}

        {step === "context" && ctx && (
          <ContextStep
            ctx={ctx}
            onSuccess={handleRecommendSuccess}
            onBack={handleNewConsulta}
          />
        )}

        {step === "results" && result && ctx && (
          <ResultsStep
            result={result}
            ctx={ctx}
            onNewConsulta={handleNewConsulta}
          />
        )}
      </main>

      <footer className="bg-bluePrimary text-white/60 text-center py-3 text-xs">
        Legal Labor Advisor &mdash; Solo para pruebas internas
      </footer>
    </div>
  );
};

export default IAPage;
