import React, { useState } from "react";
import { postContext } from "../../../api/legalAI";
import type { IASessionContext } from "../../../types/ia";

const MAX_CHARS = 2000;
const WARN_THRESHOLD = 1800;

interface ConsultaStepProps {
  onSuccess: (ctx: IASessionContext) => void;
}

const ConsultaStep: React.FC<ConsultaStepProps> = ({ onSuccess }) => {
  const [consulta, setConsulta] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const trimmed = consulta.trim();
    if (!trimmed) {
      setError("Por favor escribe tu consulta antes de continuar.");
      return;
    }

    setLoading(true);
    setError("");

    const { data, error: apiError } = await postContext({ consulta: trimmed });

    if (apiError || !data) {
      setError(apiError ?? "Error inesperado al contactar el servidor.");
      setLoading(false);
      return;
    }

    onSuccess({
      consulta: trimmed,
      sessionId: data.data.session_id,
      preguntas: data.data.preguntas ?? [],
      contextCost: data.data.cost ?? null,
      skipQuestions: data.code === 204,
    });
  };

  const charCount = consulta.length;
  const isWarn = charCount > WARN_THRESHOLD;

  return (
    <div className="bg-white rounded-xl shadow-md p-8 w-full">
      <h2 className="text-bluePrimary font-bold text-xl mb-1">
        Consulta Legal
      </h2>
      <p className="text-customGray text-sm mb-5">
        Describe tu situación laboral. El sistema te hará preguntas adicionales
        para brindarte una asesoría más precisa.
      </p>

      <textarea
        value={consulta}
        onChange={(e) => setConsulta(e.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={MAX_CHARS}
        placeholder="Ej: Fui despedido sin justa causa después de 3 años en la empresa. ¿Qué derechos tengo?"
        className="w-full min-h-32 resize-y border border-slate-300 rounded-lg px-3 py-3 text-sm outline-none focus:border-blueSecondary transition-colors"
      />
      <p
        className={`text-xs text-right mt-1 ${
          isWarn ? "text-red-600" : "text-customGray"
        }`}
      >
        {charCount} / {MAX_CHARS}
      </p>

      {error && (
        <p className="mt-3 text-sm bg-red-50 border border-red-300 text-red-600 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 inline-flex items-center gap-2 bg-bluePrimary text-white font-semibold rounded-lg px-6 py-2.5 text-sm hover:bg-blueTertiary transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading && (
          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        )}
        {loading ? "Analizando..." : "Analizar consulta"}
      </button>

      <div className="mt-5 bg-blue-50 rounded-lg px-4 py-3 text-xs text-blueTertiary leading-relaxed">
        <strong className="block mb-1">¿Cómo funciona?</strong>
        Paso 1 — Escribes tu consulta y el sistema analiza el contexto legal.
        <br />
        Paso 2 — Respondes unas preguntas cortas para precisar el caso.
        <br />
        Paso 3 — Recibes recomendaciones detalladas basadas en la normativa
        colombiana.
      </div>
    </div>
  );
};

export default ConsultaStep;
