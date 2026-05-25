import React, { useEffect, useState } from "react";
import { getAdminFeedbacks } from "../../../../api/legalAI";
import type { AdminFeedback } from "../../../../types/ia";
import FeedbackModal from "./FeedbackModal";

type FilterType = "all" | "like" | "dislike";

function getRiskClass(nivel: string): string {
  const n = nivel.toLowerCase();
  if (n.includes("alto")) return "bg-red-50 text-red-600 border-red-300";
  if (n.includes("medio")) return "bg-yellow-50 text-yellow-700 border-yellow-300";
  if (n.includes("bajo")) return "bg-green-50 text-green-700 border-green-300";
  return "bg-slate-100 text-slate-500 border-slate-300";
}

const FeedbacksAdmin: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<AdminFeedback[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<AdminFeedback | null>(null);

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    setLoading(true);
    setError("");
    const { data, error: apiError } = await getAdminFeedbacks();
    if (apiError || !data) {
      setError(apiError ?? "Error al cargar los feedbacks.");
    } else {
      setFeedbacks(data);
    }
    setLoading(false);
  };

  const filtered =
    filter === "all" ? feedbacks : feedbacks.filter((f) => f.tipo === filter);

  const filterButtons: { key: FilterType; label: string }[] = [
    { key: "all", label: "Todos" },
    { key: "like", label: "👍 Like" },
    { key: "dislike", label: "👎 Dislike" },
  ];

  return (
    <>
      {/* Barra de filtros */}
      <div className="bg-white border-b border-slate-200 px-5 md:px-10 py-3 flex items-center gap-3 flex-wrap">
        <span className="text-xs text-customGray">
          {loading ? "Cargando…" : `${filtered.length} feedback(s)`}
        </span>
        <div className="flex gap-2 ml-auto">
          {filterButtons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setFilter(btn.key)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                filter === btn.key
                  ? "bg-bluePrimary text-white border-bluePrimary"
                  : "bg-white text-customGray border-slate-300 hover:border-bluePrimary"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 overflow-x-auto px-5 md:px-10 py-6">
        {error && (
          <p className="text-sm bg-red-50 border border-red-300 text-red-600 rounded-lg px-4 py-3 mb-4">
            {error}
          </p>
        )}

        {loading && (
          <div className="flex items-center justify-center py-16 text-customGray text-sm gap-3">
            <span className="w-5 h-5 border-2 border-slate-300 border-t-bluePrimary rounded-full animate-spin" />
            Cargando feedbacks…
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-customGray text-sm italic text-center py-16">
            No hay feedback registrado.
          </p>
        )}

        {!loading && filtered.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-bluePrimary text-white text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 text-left font-semibold">Tipo</th>
                  <th className="px-4 py-3 text-left font-semibold">Observación</th>
                  <th className="px-4 py-3 text-left font-semibold">Consulta</th>
                  <th className="px-4 py-3 text-left font-semibold">Situación</th>
                  <th className="px-4 py-3 text-left font-semibold">Riesgo</th>
                  <th className="px-4 py-3 text-left font-semibold">Fecha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((fb) => (
                  <tr
                    key={fb.feedback_id}
                    onClick={() => setSelected(fb)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    {/* Tipo */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                          fb.tipo === "like"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-red-50 text-red-600 border-red-200"
                        }`}
                      >
                        {fb.tipo === "like" ? "👍 Like" : "👎 Dislike"}
                      </span>
                    </td>

                    {/* Observación */}
                    <td className="px-4 py-3 max-w-[200px]">
                      <p className="truncate text-customGray text-xs">
                        {fb.descripcion ?? "—"}
                      </p>
                    </td>

                    {/* Consulta */}
                    <td className="px-4 py-3 max-w-[260px]">
                      <p className="truncate text-gray-800">
                        {fb.consulta ?? ""}
                      </p>
                    </td>

                    {/* Situación */}
                    <td className="px-4 py-3">
                      <span className="bg-slate-100 text-slate-600 text-xs rounded px-2 py-0.5 whitespace-nowrap">
                        {fb.tipo_situacion || "—"}
                      </span>
                    </td>

                    {/* Riesgo */}
                    <td className="px-4 py-3">
                      {fb.nivel_riesgo ? (
                        <span
                          className={`text-xs font-bold uppercase tracking-wider border rounded-full px-2.5 py-0.5 whitespace-nowrap ${getRiskClass(
                            fb.nivel_riesgo
                          )}`}
                        >
                          {fb.nivel_riesgo}
                        </span>
                      ) : (
                        <span className="text-customGray text-xs">—</span>
                      )}
                    </td>

                    {/* Fecha */}
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-customGray">
                      {new Date(fb.created_at).toLocaleString("es-CO")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de detalle */}
      {selected && (
        <FeedbackModal feedback={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};

export default FeedbacksAdmin;
