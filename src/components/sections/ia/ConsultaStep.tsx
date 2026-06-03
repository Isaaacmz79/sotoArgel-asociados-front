import React, { useState } from "react";
import { postContext, postResearch } from "../../../api/legalAI";
import type { FuenteConsulta, IASessionContext, ResearchData } from "../../../types/ia";

const MAX_CHARS = 2000;
const WARN_THRESHOLD = 1800;

const FUENTES: { value: FuenteConsulta; label: string; desc: string }[] = [
  {
    value: "pdf",
    label: "Documentos indexados",
    desc: "PDFs legales cargados en la base de conocimiento",
  },
  {
    value: "gerencie",
    label: "Gerencie.com",
    desc: "Artículos laborales de Gerencie (pre-indexados)",
  },
  {
    value: "senado_cst",
    label: "CST — Senado",
    desc: "Código Sustantivo del Trabajo (secretariasenado.gov.co)",
  },
  {
    value: "mixto",
    label: "Análisis mixto",
    desc: "Documentos + Gerencie + CST del Senado en una sola consulta",
  },
  {
    value: "investigacion",
    label: "Investigación web",
    desc: "Búsqueda en vivo en Gerencie y/o el CST del Senado",
  },
];

const SITIOS_OPTIONS: { value: "gerencie" | "senado_cst"; label: string }[] = [
  { value: "gerencie", label: "Gerencie.com" },
  { value: "senado_cst", label: "CST del Senado" },
];

interface ConsultaStepProps {
  onSuccess: (ctx: IASessionContext) => void;
  onResearchSuccess: (data: ResearchData) => void;
}

const ConsultaStep: React.FC<ConsultaStepProps> = ({
  onSuccess,
  onResearchSuccess,
}) => {
  const [consulta, setConsulta] = useState("");
  const [fuente, setFuente] = useState<FuenteConsulta>("pdf");
  const [sitios, setSitios] = useState<Array<"gerencie" | "senado_cst">>([
    "gerencie",
    "senado_cst",
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleSitio = (s: "gerencie" | "senado_cst") => {
    setSitios((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

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
    if (fuente === "investigacion" && sitios.length === 0) {
      setError("Selecciona al menos un sitio para la investigación.");
      return;
    }

    setLoading(true);
    setError("");

    if (fuente === "investigacion") {
      const { data, error: apiError } = await postResearch({
        consulta: trimmed,
        sitios,
      });
      setLoading(false);
      if (apiError || !data) {
        setError(apiError ?? "Error inesperado al contactar el servidor.");
        return;
      }
      if (!data.data) {
        setError(data.messages ?? "No se encontró información en las fuentes consultadas.");
        return;
      }
      onResearchSuccess(data.data);
      return;
    }

    const { data, error: apiError } = await postContext({
      consulta: trimmed,
      fuente,
    });

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
      fuente,
    });
  };

  const charCount = consulta.length;
  const isWarn = charCount > WARN_THRESHOLD;

  return (
    <div className="bg-white rounded-xl shadow-md p-8 w-full">
      <h2 className="text-bluePrimary font-bold text-xl mb-1">Consulta Legal</h2>
      <p className="text-customGray text-sm mb-5">
        Describe tu situación laboral y elige la fuente de conocimiento.
      </p>

      {/* Source selector */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-blueTertiary uppercase tracking-wide mb-2">
          Fuente de análisis
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {FUENTES.map((f) => (
            <label
              key={f.value}
              className={`flex items-start gap-3 border rounded-lg px-3 py-2.5 cursor-pointer transition-colors ${
                fuente === f.value
                  ? "border-blueSecondary bg-blue-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <input
                type="radio"
                name="fuente"
                value={f.value}
                checked={fuente === f.value}
                onChange={() => setFuente(f.value)}
                className="mt-0.5 accent-blueSecondary"
              />
              <span className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">
                  {f.label}
                </span>
                <span className="text-xs text-customGray">{f.desc}</span>
              </span>
            </label>
          ))}
        </div>

        {/* Site checkboxes for research mode */}
        {fuente === "investigacion" && (
          <div className="mt-3 flex gap-4">
            {SITIOS_OPTIONS.map((s) => (
              <label
                key={s.value}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={sitios.includes(s.value)}
                  onChange={() => toggleSitio(s.value)}
                  className="accent-blueSecondary"
                />
                {s.label}
              </label>
            ))}
          </div>
        )}
      </div>

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
        {loading
          ? fuente === "investigacion"
            ? "Investigando..."
            : "Analizando..."
          : fuente === "investigacion"
          ? "Iniciar investigación"
          : "Analizar consulta"}
      </button>

      <div className="mt-5 bg-blue-50 rounded-lg px-4 py-3 text-xs text-blueTertiary leading-relaxed">
        <strong className="block mb-1">¿Cómo funciona?</strong>
        {fuente === "investigacion" ? (
          <>
            Paso 1 — Escribe tu consulta y elige qué sitios buscar.
            <br />
            Paso 2 — El sistema busca en vivo, indexa lo encontrado y sintetiza los hallazgos.
            <br />
            Paso 3 — Recibes un resumen con las fuentes consultadas.
          </>
        ) : (
          <>
            Paso 1 — Escribes tu consulta y el sistema analiza el contexto legal.
            <br />
            Paso 2 — Respondes unas preguntas cortas para precisar el caso.
            <br />
            Paso 3 — Recibes recomendaciones detalladas basadas en la normativa colombiana.
          </>
        )}
      </div>
    </div>
  );
};

export default ConsultaStep;
