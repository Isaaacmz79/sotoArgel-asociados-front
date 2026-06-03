import React, { useEffect, useState } from "react";
import { postRecommend } from "../../../api/legalAI";
import type { IASessionContext, RecommendData } from "../../../types/ia";

interface ContextStepProps {
  ctx: IASessionContext;
  onSuccess: (result: RecommendData) => void;
  onBack: () => void;
}

const ContextStep: React.FC<ContextStepProps> = ({ ctx, onSuccess, onBack }) => {
  const [respuestas, setRespuestas] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Si no hay preguntas, proceder automáticamente
  useEffect(() => {
    if (ctx.skipQuestions || ctx.preguntas.length === 0) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const respuestasMap: Record<string, string> = {};
    ctx.preguntas.forEach((pregunta, i) => {
      const val = respuestas[i]?.trim();
      if (val) respuestasMap[pregunta] = val;
    });

    const payload = {
      consulta: ctx.consulta,
      session_id: ctx.sessionId,
      fuente: ctx.fuente,
      ...(Object.keys(respuestasMap).length > 0 && {
        respuestas: respuestasMap,
      }),
    };

    const { data, error: apiError } = await postRecommend(payload);

    if (apiError || !data) {
      setError(apiError ?? "Error inesperado al contactar el servidor.");
      setLoading(false);
      return;
    }

    onSuccess(data.data);
  };

  // Vista de carga automática (sin preguntas)
  if (ctx.skipQuestions || ctx.preguntas.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 w-full flex flex-col items-center justify-center min-h-40">
        {error ? (
          <p className="text-sm bg-red-50 border border-red-300 text-red-600 rounded-lg px-3 py-2 w-full text-center">
            {error}
          </p>
        ) : (
          <div className="flex items-center gap-3 text-blueTertiary">
            <span className="w-5 h-5 border-[3px] border-blueTertiary/30 border-t-blueTertiary rounded-full animate-spin" />
            <span className="text-sm font-semibold">
              Generando recomendaciones...
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Consulta original */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-bluePrimary font-bold text-lg mb-3">Tu consulta</h2>
        <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
          {ctx.consulta}
        </div>
      </div>

      {/* Preguntas de contexto */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-bluePrimary font-bold text-lg mb-1">
          Preguntas de contexto
        </h2>
        <p className="text-customGray text-sm mb-5">
          Responde las siguientes preguntas para que el asesor pueda darte una
          recomendación más precisa. Puedes dejar en blanco las que no apliquen.
        </p>

        <div className="flex flex-col gap-4 mb-5">
          {ctx.preguntas.map((pregunta, i) => (
            <div key={i}>
              <label className="block text-sm font-semibold text-blueTertiary mb-1.5">
                {i + 1}.{" "}
                <span className="font-normal text-gray-800">{pregunta}</span>{" "}
                <span className="text-customGray font-normal">(opcional)</span>
              </label>
              <textarea
                value={respuestas[i] ?? ""}
                onChange={(e) =>
                  setRespuestas((prev) => ({ ...prev, [i]: e.target.value }))
                }
                placeholder="Tu respuesta..."
                className="w-full min-h-[72px] resize-y border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blueSecondary transition-colors"
              />
            </div>
          ))}
        </div>

        {error && (
          <p className="mb-4 text-sm bg-red-50 border border-red-300 text-red-600 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-bluePrimary text-white font-semibold rounded-lg px-6 py-2.5 text-sm hover:bg-blueTertiary transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {loading ? "Procesando..." : "Obtener recomendación"}
          </button>
          <button
            onClick={onBack}
            disabled={loading}
            className="border border-blueSecondary text-blueSecondary rounded-lg px-5 py-2 text-sm font-semibold hover:bg-blueSecondary hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Nueva consulta
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContextStep;
