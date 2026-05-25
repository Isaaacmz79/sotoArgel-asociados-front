import React from "react";
import type { AdminFeedback } from "../../../../types/ia";

interface FeedbackModalProps {
  feedback: AdminFeedback;
  onClose: () => void;
}

function getRiskClass(nivel: string): string {
  const n = nivel.toLowerCase();
  if (n.includes("alto")) return "bg-red-50 text-red-600 border-red-300";
  if (n.includes("medio")) return "bg-yellow-50 text-yellow-700 border-yellow-300";
  if (n.includes("bajo")) return "bg-green-50 text-green-700 border-green-300";
  return "bg-slate-100 text-slate-500 border-slate-300";
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ feedback, onClose }) => {
  const d = feedback.detalle;
  const isLike = feedback.tipo === "like";

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 overflow-y-auto flex justify-center items-start p-4 md:p-8"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 md:p-8 my-4">
        {/* Header */}
        <div className="flex justify-between items-start gap-3 mb-5">
          <p className="text-bluePrimary font-semibold text-sm leading-snug max-w-xl">
            {feedback.consulta.length > 120
              ? feedback.consulta.slice(0, 120) + "…"
              : feedback.consulta}
          </p>
          <button
            onClick={onClose}
            className="text-2xl text-customGray leading-none hover:text-gray-800 flex-shrink-0 px-1"
          >
            ×
          </button>
        </div>

        {/* Feedback highlight */}
        <div
          className={`rounded-lg p-4 mb-5 ${
            isLike
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <p
            className={`font-bold text-base mb-1 ${
              isLike ? "text-green-700" : "text-red-700"
            }`}
          >
            {isLike ? "👍 Like" : "👎 Dislike"}
          </p>
          {feedback.descripcion && (
            <p className="text-sm text-gray-600">{feedback.descripcion}</p>
          )}
          <p className="text-xs text-customGray mt-2">
            {new Date(feedback.created_at).toLocaleString("es-CO")}
          </p>
        </div>

        {d ? (
          <>
            {/* Resumen ejecutivo */}
            {d.resumen_ejecutivo && (
              <>
                <p className="text-xs font-bold uppercase tracking-wider text-customGray mb-2">
                  Resumen ejecutivo
                </p>
                <div className="bg-slate-50 rounded-lg px-4 py-3 text-sm leading-relaxed text-gray-700 mb-4">
                  {d.resumen_ejecutivo}
                </div>
              </>
            )}

            {/* Recomendaciones */}
            {d.recomendaciones && d.recomendaciones.length > 0 && (
              <>
                <p className="text-xs font-bold uppercase tracking-wider text-customGray mb-2">
                  Recomendaciones
                </p>
                <div className="flex flex-col gap-2 mb-4">
                  {d.recomendaciones.map((rec, i) => (
                    <div
                      key={i}
                      className="border border-slate-200 rounded-lg p-3"
                    >
                      <p className="font-semibold text-sm text-bluePrimary mb-1">
                        {rec.titulo}
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed mb-2">
                        {rec.accion}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {rec.fundamento_legal?.map((f, j) => (
                          <span
                            key={j}
                            className="bg-blue-50 border border-blue-200 text-blueTertiary text-xs rounded px-2 py-0.5"
                          >
                            {f}
                          </span>
                        ))}
                        {rec.nivel_riesgo && (
                          <span
                            className={`text-xs font-bold uppercase tracking-wider border rounded-full px-2.5 py-0.5 ${getRiskClass(
                              rec.nivel_riesgo
                            )}`}
                          >
                            {rec.nivel_riesgo}
                          </span>
                        )}
                        {rec.plazo_sugerido && (
                          <span className="text-xs text-customGray bg-slate-100 rounded px-2 py-0.5">
                            🕑 {rec.plazo_sugerido}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Cálculos de prestaciones */}
            {d.calculos_prestaciones && d.calculos_prestaciones.length > 0 && (
              <>
                <p className="text-xs font-bold uppercase tracking-wider text-customGray mb-2">
                  Cálculos de prestaciones
                </p>
                <div className="flex flex-col gap-2 mb-4">
                  {d.calculos_prestaciones.map((c, i) => (
                    <div
                      key={i}
                      className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 text-sm"
                    >
                      <p className="font-semibold text-bluePrimary mb-0.5">
                        {c.concepto}
                      </p>
                      {c.formula && (
                        <p className="text-customGray text-xs">{c.formula}</p>
                      )}
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-customGray text-xs">{c.periodo}</p>
                        <p className="font-bold text-blueTertiary">
                          {Number(c.valor_calculado ?? 0).toLocaleString("es-CO")}{" "}
                          COP
                        </p>
                      </div>
                      {c.valor_base && (
                        <p className="text-xs text-customGray mt-1">
                          {c.valor_base}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Marco normativo */}
            {d.marco_normativo && (
              <>
                <p className="text-xs font-bold uppercase tracking-wider text-customGray mb-2">
                  Marco normativo
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {d.marco_normativo}
                </p>
              </>
            )}
          </>
        ) : (
          <p className="text-customGray text-sm italic mt-2">
            No hay detalle disponible para esta recomendación.
          </p>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
