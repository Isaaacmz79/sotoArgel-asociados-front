import React from "react";
import type { ResearchData } from "../../../types/ia";

interface ResearchResultsStepProps {
  result: ResearchData;
  onNewConsulta: () => void;
}

const ResearchResultsStep: React.FC<ResearchResultsStepProps> = ({
  result,
  onNewConsulta,
}) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-bluePrimary font-bold text-xl mb-1">
              Resultados de investigación
            </h2>
            <p className="text-customGray text-sm break-words">
              {result.consulta}
            </p>
          </div>
          <span className="text-xs bg-blue-100 text-blueTertiary font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
            {result.chunks_indexados} fragmentos indexados
          </span>
        </div>
      </div>

      {/* Resumen */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-bluePrimary font-bold text-base mb-3">
          Resumen ejecutivo
        </h3>
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
          {result.resumen}
        </p>
      </div>

      {/* Hallazgos */}
      {result.hallazgos.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-bluePrimary font-bold text-base mb-4">
            Hallazgos ({result.hallazgos.length})
          </h3>
          <div className="flex flex-col gap-4">
            {result.hallazgos.map((h, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-lg p-4"
              >
                <p className="font-semibold text-sm text-blueTertiary mb-1">
                  {i + 1}. {h.titulo}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed mb-2 whitespace-pre-wrap">
                  {h.contenido}
                </p>
                <a
                  href={h.fuente.startsWith("http") ? h.fuente : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs break-all ${
                    h.fuente.startsWith("http")
                      ? "text-blueSecondary hover:underline"
                      : "text-customGray"
                  }`}
                >
                  {h.fuente}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fuentes */}
      {result.fuentes_consultadas.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-bluePrimary font-bold text-base mb-3">
            Fuentes consultadas
          </h3>
          <ul className="flex flex-col gap-1.5">
            {result.fuentes_consultadas.map((f, i) => {
              const urlMatch = f.match(/https?:\/\/[^\s]+/);
              const url = urlMatch ? urlMatch[0] : null;
              return (
                <li key={i} className="text-xs text-customGray break-all">
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blueSecondary hover:underline"
                    >
                      {f}
                    </a>
                  ) : (
                    f
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Cost */}
      <div className="bg-slate-50 rounded-xl border border-slate-200 px-5 py-3 text-xs text-customGray flex flex-wrap gap-4">
        <span>Modelo: {result.cost.modelo ?? "—"}</span>
        <span>Tokens entrada: {result.cost.input_tokens.toLocaleString()}</span>
        <span>Tokens salida: {result.cost.output_tokens.toLocaleString()}</span>
        <span>Costo: ${result.cost.cost_usd.toFixed(6)} USD</span>
      </div>

      {/* Action */}
      <button
        onClick={onNewConsulta}
        className="self-start inline-flex items-center gap-2 bg-bluePrimary text-white font-semibold rounded-lg px-6 py-2.5 text-sm hover:bg-blueTertiary transition-colors"
      >
        Nueva consulta
      </button>
    </div>
  );
};

export default ResearchResultsStep;
