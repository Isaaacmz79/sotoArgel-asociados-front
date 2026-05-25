import React, { useEffect, useState } from "react";
import {
  getAdminHistory,
  getSessionRecommendations,
  getSessionFeedbacks,
} from "../../../../api/legalAI";
import type {
  AdminSession,
  AdminRecommendation,
  SessionFeedback,
} from "../../../../types/ia";

interface SessionDetail {
  recommendations: AdminRecommendation[];
  feedbacks: SessionFeedback[];
  loading: boolean;
  error: string;
}

function getRiskClass(nivel: string): string {
  const n = nivel.toLowerCase();
  if (n.includes("alto")) return "bg-red-50 text-red-600 border-red-300";
  if (n.includes("medio")) return "bg-yellow-50 text-yellow-700 border-yellow-300";
  if (n.includes("bajo")) return "bg-green-50 text-green-700 border-green-300";
  return "bg-slate-100 text-slate-500 border-slate-300";
}

const HistoryAdmin: React.FC = () => {
  const [sessions, setSessions] = useState<AdminSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, SessionDetail>>({});

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    setError("");
    const { data, error: apiError } = await getAdminHistory();
    if (apiError || !data) {
      setError(apiError ?? "Error al cargar el historial.");
    } else {
      setSessions(data);
    }
    setLoading(false);
  };

  const toggleSession = async (sessionId: string) => {
    if (expandedId === sessionId) {
      setExpandedId(null);
      return;
    }

    setExpandedId(sessionId);

    if (details[sessionId]) return; // ya cargado

    setDetails((prev) => ({
      ...prev,
      [sessionId]: { recommendations: [], feedbacks: [], loading: true, error: "" },
    }));

    const [recsResult, fbsResult] = await Promise.all([
      getSessionRecommendations(sessionId),
      getSessionFeedbacks(sessionId),
    ]);

    setDetails((prev) => ({
      ...prev,
      [sessionId]: {
        recommendations: recsResult.data ?? [],
        feedbacks: fbsResult.data ?? [],
        loading: false,
        error: recsResult.error ?? fbsResult.error ?? "",
      },
    }));
  };

  return (
    <div className="flex-1 overflow-x-auto px-5 md:px-10 py-6">
      {error && (
        <p className="text-sm bg-red-50 border border-red-300 text-red-600 rounded-lg px-4 py-3 mb-4">
          {error}
        </p>
      )}

      {loading && (
        <div className="flex items-center justify-center py-16 text-customGray text-sm gap-3">
          <span className="w-5 h-5 border-2 border-slate-300 border-t-bluePrimary rounded-full animate-spin" />
          Cargando historial…
        </div>
      )}

      {!loading && !error && sessions.length === 0 && (
        <p className="text-customGray text-sm italic text-center py-16">
          No hay sesiones registradas.
        </p>
      )}

      {!loading && sessions.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-bluePrimary text-white text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left font-semibold">Consulta</th>
                <th className="px-4 py-3 text-center font-semibold">Recomendaciones</th>
                <th className="px-4 py-3 text-center font-semibold">Feedbacks</th>
                <th className="px-4 py-3 text-left font-semibold">Fecha</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {sessions.map((session) => (
                <React.Fragment key={session.session_id}>
                  {/* Fila principal */}
                  <tr
                    onClick={() => toggleSession(session.session_id)}
                    className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 max-w-sm">
                      <p className="truncate text-gray-800">{session.consulta}</p>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="bg-blue-50 text-blueTertiary text-xs font-semibold border border-blue-200 rounded-full px-2.5 py-0.5">
                        {session.recommendation_count}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="bg-slate-100 text-slate-600 text-xs font-semibold rounded-full px-2.5 py-0.5">
                        {session.feedback_count}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-customGray">
                      {new Date(session.created_at).toLocaleString("es-CO")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-customGray text-xs">
                        {expandedId === session.session_id ? "▲" : "▼"}
                      </span>
                    </td>
                  </tr>

                  {/* Fila de detalle expandible */}
                  {expandedId === session.session_id && (
                    <tr>
                      <td colSpan={5} className="bg-slate-50 border-b border-slate-200">
                        <div className="px-6 py-5">
                          {details[session.session_id]?.loading && (
                            <div className="flex items-center gap-2 text-customGray text-sm py-4">
                              <span className="w-4 h-4 border-2 border-slate-300 border-t-bluePrimary rounded-full animate-spin" />
                              Cargando detalle…
                            </div>
                          )}

                          {details[session.session_id]?.error && (
                            <p className="text-red-600 text-sm py-2">
                              {details[session.session_id].error}
                            </p>
                          )}

                          {!details[session.session_id]?.loading && (
                            <>
                              {/* Preguntas de contexto */}
                              {session.preguntas && session.preguntas.length > 0 && (
                                <div className="mb-4">
                                  <p className="text-xs font-bold uppercase tracking-wider text-customGray mb-2">
                                    Preguntas de contexto
                                  </p>
                                  <ul className="flex flex-col gap-1">
                                    {session.preguntas.map((p, i) => (
                                      <li
                                        key={i}
                                        className="text-xs text-gray-600 flex gap-2"
                                      >
                                        <span className="text-blueTertiary font-semibold">
                                          {i + 1}.
                                        </span>
                                        {p}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Recomendaciones */}
                              {details[session.session_id]?.recommendations.length > 0 && (
                                <div className="mb-4">
                                  <p className="text-xs font-bold uppercase tracking-wider text-customGray mb-2">
                                    Recomendaciones
                                  </p>
                                  <div className="flex flex-col gap-2">
                                    {details[session.session_id].recommendations.map(
                                      (rec) => (
                                        <div
                                          key={rec.response_id}
                                          className="bg-white border border-slate-200 rounded-lg p-3"
                                        >
                                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="text-xs font-semibold text-bluePrimary">
                                              {rec.tipo_situacion}
                                            </span>
                                            {rec.nivel_riesgo && (
                                              <span
                                                className={`text-xs font-bold uppercase tracking-wider border rounded-full px-2 py-0.5 ${getRiskClass(
                                                  rec.nivel_riesgo
                                                )}`}
                                              >
                                                {rec.nivel_riesgo}
                                              </span>
                                            )}
                                            <span className="text-xs text-customGray ml-auto whitespace-nowrap">
                                              {new Date(rec.created_at).toLocaleString(
                                                "es-CO"
                                              )}
                                            </span>
                                          </div>
                                          {rec.detalle?.resumen_ejecutivo && (
                                            <p className="text-xs text-gray-600 leading-relaxed">
                                              {rec.detalle.resumen_ejecutivo}
                                            </p>
                                          )}
                                          {/* Respuestas del usuario */}
                                          {rec.respuestas &&
                                            Object.keys(rec.respuestas).length > 0 && (
                                              <div className="mt-2 flex flex-col gap-1">
                                                {Object.entries(rec.respuestas).map(
                                                  ([pregunta, respuesta], i) => (
                                                    <p
                                                      key={i}
                                                      className="text-xs text-customGray"
                                                    >
                                                      <span className="font-semibold text-blueTertiary">
                                                        {pregunta}:
                                                      </span>{" "}
                                                      {respuesta}
                                                    </p>
                                                  )
                                                )}
                                              </div>
                                            )}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Feedbacks de la sesión */}
                              {details[session.session_id]?.feedbacks.length > 0 && (
                                <div>
                                  <p className="text-xs font-bold uppercase tracking-wider text-customGray mb-2">
                                    Feedbacks
                                  </p>
                                  <div className="flex flex-col gap-2">
                                    {details[session.session_id].feedbacks.map((fb) => (
                                      <div
                                        key={fb.feedback_id}
                                        className={`rounded-lg p-3 text-xs flex items-start gap-3 ${
                                          fb.tipo === "like"
                                            ? "bg-green-50 border border-green-200"
                                            : "bg-red-50 border border-red-200"
                                        }`}
                                      >
                                        <span
                                          className={`font-bold ${
                                            fb.tipo === "like"
                                              ? "text-green-700"
                                              : "text-red-600"
                                          }`}
                                        >
                                          {fb.tipo === "like" ? "👍" : "👎"}
                                        </span>
                                        <div>
                                          {fb.descripcion && (
                                            <p className="text-gray-600 mb-0.5">
                                              {fb.descripcion}
                                            </p>
                                          )}
                                          <p className="text-customGray">
                                            {new Date(fb.created_at).toLocaleString(
                                              "es-CO"
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {details[session.session_id]?.recommendations.length === 0 &&
                                details[session.session_id]?.feedbacks.length === 0 && (
                                  <p className="text-customGray text-xs italic">
                                    Sin recomendaciones ni feedbacks en esta sesión.
                                  </p>
                                )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryAdmin;
