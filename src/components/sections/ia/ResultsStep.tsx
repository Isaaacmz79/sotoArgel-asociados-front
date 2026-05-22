import React, { useState } from "react";
import { postFeedback } from "../../../api/legalAI";
import type {
  RecommendData,
  TokenCost,
  IASessionContext,
} from "../../../types/ia";

const COP_PER_USD = 3900;

type FeedbackState = "idle" | "dislike-open" | "sent";

interface ResultsStepProps {
  result: RecommendData;
  ctx: IASessionContext;
  onNewConsulta: () => void;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getRiskClass(nivel: string) {
  const n = nivel.toLowerCase();
  if (n.includes("alto")) return "bg-red-50 text-red-600 border-red-300";
  if (n.includes("medio")) return "bg-yellow-50 text-yellow-700 border-yellow-300";
  if (n.includes("bajo")) return "bg-green-50 text-green-700 border-green-300";
  return "bg-slate-100 text-slate-500 border-slate-300";
}

function CostGrid({
  ctxCost,
  recCost,
}: {
  ctxCost: TokenCost | null;
  recCost: TokenCost;
}) {
  const totalIn =
    (ctxCost?.input_tokens ?? 0) + (recCost.input_tokens ?? 0);
  const totalOut =
    (ctxCost?.output_tokens ?? 0) + (recCost.output_tokens ?? 0);
  const totalUSD = (ctxCost?.cost_usd ?? 0) + (recCost.cost_usd ?? 0);
  const totalCOP = totalUSD * COP_PER_USD;

  const items = [
    { label: "Tokens entrada", value: totalIn.toLocaleString("es-CO") },
    { label: "Tokens salida", value: totalOut.toLocaleString("es-CO") },
    {
      label: "Costo (COP)",
      value:
        "$ " +
        totalCOP.toLocaleString("es-CO", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center"
        >
          <p className="text-xs text-customGray mb-1">{item.label}</p>
          <p className="text-sm font-bold text-bluePrimary">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

const ResultsStep: React.FC<ResultsStepProps> = ({
  result,
  ctx,
  onNewConsulta,
}) => {
  const { info, cost: recCost, response_id } = result;
  const [feedbackState, setFeedbackState] = useState<FeedbackState>("idle");
  const [dislikeText, setDislikeText] = useState("");
  const [fbError, setFbError] = useState("");
  const [fbSuccess, setFbSuccess] = useState("");
  const [fbLoading, setFbLoading] = useState(false);

  const handleFeedback = async (tipo: "like" | "dislike") => {
    if (!response_id) return;
    setFbLoading(true);
    setFbError("");
    setFbSuccess("");

    const payload = {
      response_id,
      tipo,
      ...(tipo === "dislike" && dislikeText.trim()
        ? { descripcion: dislikeText.trim() }
        : {}),
    };

    const { error } = await postFeedback(payload);
    setFbLoading(false);

    if (error) {
      setFbError(error);
      return;
    }

    setFbSuccess(
      tipo === "like"
        ? "¡Gracias por tu valoración!"
        : "Gracias, tu comentario fue registrado."
    );
    setFeedbackState("sent");
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Resumen ejecutivo */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-customGray mb-1">
          Tipo de situación
        </p>
        <p className="text-bluePrimary font-bold text-base mb-4">
          {info.tipo_situacion || "—"}
        </p>

        <p className="text-xs font-bold uppercase tracking-wider text-customGray mb-2">
          Resumen ejecutivo
        </p>
        <div className="bg-blue-50 border-l-4 border-blueSecondary rounded-r-lg px-4 py-3 text-sm leading-relaxed text-gray-800 mb-4">
          {info.resumen_ejecutivo || "—"}
        </div>

        <div className="flex items-center gap-3">
          <p className="text-xs font-bold uppercase tracking-wider text-customGray">
            Nivel de riesgo
          </p>
          <span
            className={`text-xs font-bold uppercase tracking-wider border rounded-full px-3 py-1 ${getRiskClass(
              info.nivel_riesgo_general || ""
            )}`}
          >
            {info.nivel_riesgo_general || "No determinado"}
          </span>
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-bluePrimary font-bold text-lg mb-4">
          Recomendaciones
        </h2>
        {info.recomendaciones.length === 0 ? (
          <p className="text-customGray text-sm">
            No se generaron recomendaciones.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {info.recomendaciones.map((rec, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-200 rounded-lg p-4"
              >
                <div className="flex justify-between items-start gap-2 mb-2">
                  <strong className="text-sm text-bluePrimary">
                    {rec.titulo || `Recomendación ${i + 1}`}
                  </strong>
                  {rec.nivel_riesgo && (
                    <span
                      className={`text-xs font-bold uppercase tracking-wider border rounded-full px-2.5 py-0.5 whitespace-nowrap ${getRiskClass(
                        rec.nivel_riesgo
                      )}`}
                    >
                      {rec.nivel_riesgo}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed mb-2">{rec.accion}</p>
                {rec.fundamento_legal && rec.fundamento_legal.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-1.5">
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
                {rec.plazo_sugerido && (
                  <p className="text-xs text-customGray">
                    🕑 {rec.plazo_sugerido}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Marco normativo */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-customGray mb-2">
          Marco normativo
        </p>
        <div className="bg-blue-50 border-l-4 border-blueSecondary rounded-r-lg px-4 py-3 text-sm leading-relaxed text-gray-800">
          {info.marco_normativo || "—"}
        </div>
      </div>

      {/* Fuentes */}
      {info.fuentes && info.fuentes.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-customGray mb-3">
            Fuentes consultadas
          </p>
          <ul className="divide-y divide-slate-100">
            {info.fuentes.map((f, i) => (
              <li key={i} className="py-2 text-sm text-blueTertiary">
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cálculos de prestaciones */}
      {info.calculos_prestaciones && info.calculos_prestaciones.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-xs font-bold uppercase tracking-wider text-customGray mb-3">
            Cálculo de prestaciones
          </p>
          <div className="flex flex-col gap-3">
            {info.calculos_prestaciones.map((c, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3"
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <strong className="text-sm text-bluePrimary">
                    {c.concepto}
                  </strong>
                  <span className="text-base font-bold text-blueTertiary whitespace-nowrap">
                    ${" "}
                    {Number(c.valor_calculado ?? 0).toLocaleString("es-CO")}
                  </span>
                </div>
                {c.formula && (
                  <p className="text-xs text-customGray">
                    Fórmula: {c.formula}
                  </p>
                )}
                {c.valor_base && (
                  <p className="text-xs text-customGray">Base: {c.valor_base}</p>
                )}
                {c.periodo && (
                  <p className="text-xs text-customGray">Período: {c.periodo}</p>
                )}
                {c.fundamento && (
                  <p className="text-xs text-slate-500 mt-1">{c.fundamento}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-customGray mb-3">
          ¿Fue útil esta recomendación?
        </p>
        {feedbackState === "sent" ? (
          <p className="text-sm bg-green-50 border border-green-300 text-green-700 rounded-lg px-3 py-2">
            {fbSuccess}
          </p>
        ) : (
          <>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => handleFeedback("like")}
                disabled={fbLoading}
                className="border border-slate-300 rounded-lg px-4 py-2 text-sm flex items-center gap-1.5 hover:border-green-400 hover:bg-green-50 hover:text-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                👍 Me fue útil
              </button>
              <button
                onClick={() =>
                  setFeedbackState(
                    feedbackState === "dislike-open" ? "idle" : "dislike-open"
                  )
                }
                disabled={fbLoading}
                className="border border-slate-300 rounded-lg px-4 py-2 text-sm flex items-center gap-1.5 hover:border-red-400 hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                👎 Mejorar respuesta
              </button>
            </div>

            {feedbackState === "dislike-open" && (
              <div className="mt-3">
                <textarea
                  value={dislikeText}
                  onChange={(e) => setDislikeText(e.target.value)}
                  maxLength={1000}
                  placeholder="¿Qué podría mejorarse? (opcional, máximo 1000 caracteres)"
                  className="w-full min-h-[72px] resize-y border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blueSecondary transition-colors"
                />
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => handleFeedback("dislike")}
                    disabled={fbLoading}
                    className="bg-bluePrimary text-white font-semibold rounded-lg px-4 py-1.5 text-sm hover:bg-blueTertiary transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {fbLoading ? "Enviando..." : "Enviar comentario"}
                  </button>
                  <button
                    onClick={() => {
                      setFeedbackState("idle");
                      setDislikeText("");
                    }}
                    className="border border-blueSecondary text-blueSecondary rounded-lg px-4 py-1.5 text-sm font-semibold hover:bg-blueSecondary hover:text-white transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {fbError && (
              <p className="mt-3 text-sm bg-red-50 border border-red-300 text-red-600 rounded-lg px-3 py-2">
                {fbError}
              </p>
            )}
          </>
        )}
      </div>

      {/* Consumo de tokens */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-xs font-bold uppercase tracking-wider text-customGray mb-3">
          Consumo de tokens — esta consulta
        </p>
        <CostGrid ctxCost={ctx.contextCost} recCost={recCost} />
      </div>

      {/* Nueva consulta */}
      <div className="flex justify-center pb-6">
        <button
          onClick={onNewConsulta}
          className="border border-blueSecondary text-blueSecondary rounded-lg px-6 py-2.5 text-sm font-semibold hover:bg-blueSecondary hover:text-white transition-colors"
        >
          ← Nueva consulta
        </button>
      </div>
    </div>
  );
};

export default ResultsStep;
