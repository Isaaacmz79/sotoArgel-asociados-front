import React, { useState } from "react";
import { postRefine } from "../../../api/legalAI";
import type { RefineData, TokenCost } from "../../../types/ia";

const MAX_ITERACIONES = 2;

interface RefineHistoryItem {
  comentario: string;
  data: RefineData;
}

interface RefineSectionProps {
  responseId: string;
  onRefineComplete: (item: RefineHistoryItem) => void;
  historial: RefineHistoryItem[];
  loading: boolean;
  setLoading: (v: boolean) => void;
}

function getRiskClass(nivel: string) {
  const n = nivel.toLowerCase();
  if (n.includes("alto")) return "bg-red-50 text-red-600 border-red-300";
  if (n.includes("medio"))
    return "bg-yellow-50 text-yellow-700 border-yellow-300";
  if (n.includes("bajo"))
    return "bg-green-50 text-green-700 border-green-300";
  return "bg-slate-100 text-slate-500 border-slate-300";
}

const RefineSection: React.FC<RefineSectionProps> = ({
  responseId,
  onRefineComplete,
  historial,
  loading,
  setLoading,
}) => {
  const [comentario, setComentario] = useState("");
  const [error, setError] = useState("");

  const remaining = MAX_ITERACIONES - historial.length;
  const canRefine = remaining > 0;

  const handleSubmit = async () => {
    if (!comentario.trim() || !canRefine) return;
    setLoading(true);
    setError("");

    const { data, error: apiError } = await postRefine({
      response_id: responseId,
      comentario: comentario.trim(),
    });

    setLoading(false);

    if (apiError || !data) {
      setError(apiError || "Error al procesar el ajuste.");
      return;
    }

    onRefineComplete({ comentario: comentario.trim(), data: data.data });
    setComentario("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold uppercase tracking-wider text-customGray">
          Ajustes / Aclaraciones
        </p>
        <span className="text-xs text-customGray">
          {remaining} de {MAX_ITERACIONES} disponibles
        </span>
      </div>

      {/* Historial de ajustes */}
      {historial.length > 0 && (
        <div className="flex flex-col gap-4 mb-4">
          {historial.map((item, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-lg overflow-hidden"
            >
              {/* Comentario del usuario */}
              <div className="bg-blue-50 px-4 py-2.5 border-b border-slate-200">
                <p className="text-xs text-customGray mb-0.5">
                  Tu comentario #{idx + 1}
                </p>
                <p className="text-sm text-bluePrimary">{item.comentario}</p>
              </div>

              {/* Respuesta */}
              <div className="px-4 py-3">
                {item.data.info.resumen_ajuste && (
                  <p className="text-sm font-medium text-bluePrimary mb-2">
                    {item.data.info.resumen_ajuste}
                  </p>
                )}

                {item.data.info.aclaracion && (
                  <div className="bg-slate-50 border-l-4 border-blueSecondary rounded-r-lg px-3 py-2 text-sm leading-relaxed text-gray-800 mb-3">
                    {item.data.info.aclaracion}
                  </div>
                )}

                {/* Recomendaciones ajustadas */}
                {item.data.info.recomendaciones.length > 0 && (
                  <div className="flex flex-col gap-2 mb-2">
                    {item.data.info.recomendaciones.map((rec, i) => (
                      <div
                        key={i}
                        className="bg-slate-50 border border-slate-200 rounded-lg p-3"
                      >
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <strong className="text-sm text-bluePrimary">
                            {rec.titulo}
                          </strong>
                          {rec.nivel_riesgo && (
                            <span
                              className={`text-xs font-bold uppercase border rounded-full px-2 py-0.5 whitespace-nowrap ${getRiskClass(
                                rec.nivel_riesgo
                              )}`}
                            >
                              {rec.nivel_riesgo}
                            </span>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed">{rec.accion}</p>
                        {rec.fundamento_legal &&
                          rec.fundamento_legal.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {rec.fundamento_legal.map((f, j) => (
                                <span
                                  key={j}
                                  className="bg-blue-50 border border-blue-200 text-blueTertiary text-xs rounded px-2 py-0.5"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Cálculos */}
                {item.data.info.calculos_prestaciones &&
                  item.data.info.calculos_prestaciones.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {item.data.info.calculos_prestaciones.map((c, i) => (
                        <div
                          key={i}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"
                        >
                          <div className="flex justify-between items-start gap-2">
                            <strong className="text-sm text-bluePrimary">
                              {c.concepto}
                            </strong>
                            <span className="text-sm font-bold text-blueTertiary whitespace-nowrap">
                              ${" "}
                              {Number(c.valor_calculado ?? 0).toLocaleString(
                                "es-CO"
                              )}
                            </span>
                          </div>
                          {c.periodo && (
                            <p className="text-xs text-customGray">
                              Período: {c.periodo}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input para nuevo ajuste */}
      {canRefine ? (
        <div>
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            maxLength={2000}
            placeholder="Escribe un ajuste, aclaración o pregunta sobre la recomendación..."
            className="w-full min-h-[72px] resize-y border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blueSecondary transition-colors"
            disabled={loading}
          />
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={handleSubmit}
              disabled={loading || !comentario.trim()}
              className="bg-bluePrimary text-white font-semibold rounded-lg px-4 py-1.5 text-sm hover:bg-blueTertiary transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Procesando..." : "Enviar ajuste"}
            </button>
            <span className="text-xs text-customGray">
              {comentario.length}/2000
            </span>
          </div>
          {error && (
            <p className="mt-2 text-sm bg-red-50 border border-red-300 text-red-600 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </div>
      ) : (
        <p className="text-sm text-customGray bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
          Has alcanzado el máximo de ajustes para esta recomendación.
        </p>
      )}
    </div>
  );
};

export default RefineSection;
export type { RefineHistoryItem };
