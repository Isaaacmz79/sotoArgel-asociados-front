import React, { useState } from "react";
import { postFeedback } from "../../../api/legalAI";

interface FeedbackModalProps {
  responseId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  responseId,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [tipo, setTipo] = useState<"like" | "dislike" | null>(null);
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!tipo) return;
    setLoading(true);
    setError("");

    const payload = {
      response_id: responseId,
      tipo,
      ...(descripcion.trim() ? { descripcion: descripcion.trim() } : {}),
    };

    const { error: apiError } = await postFeedback(payload);
    setLoading(false);

    if (apiError) {
      setError(apiError);
      return;
    }

    onSuccess();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6 animate-in fade-in">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-bluePrimary">
            Dar feedback
          </h3>
          <button
            onClick={onClose}
            className="text-customGray hover:text-bluePrimary transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <p className="text-sm text-customGray mb-4">
          ¿Cómo evalúas esta recomendación?
        </p>

        {/* Tipo selector */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setTipo("like")}
            className={`flex-1 border rounded-lg px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              tipo === "like"
                ? "border-green-400 bg-green-50 text-green-700"
                : "border-slate-300 hover:border-green-400 hover:bg-green-50 hover:text-green-700"
            }`}
          >
            👍 Me fue útil
          </button>
          <button
            onClick={() => setTipo("dislike")}
            className={`flex-1 border rounded-lg px-4 py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              tipo === "dislike"
                ? "border-red-400 bg-red-50 text-red-600"
                : "border-slate-300 hover:border-red-400 hover:bg-red-50 hover:text-red-600"
            }`}
          >
            👎 Puede mejorar
          </button>
        </div>

        {/* Descripción */}
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          maxLength={1000}
          placeholder="Comentarios adicionales (opcional, máx. 1000 caracteres)"
          className="w-full min-h-[80px] resize-y border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blueSecondary transition-colors mb-1"
        />
        <p className="text-xs text-customGray text-right mb-4">
          {descripcion.length}/1000
        </p>

        {error && (
          <p className="text-sm bg-red-50 border border-red-300 text-red-600 rounded-lg px-3 py-2 mb-3">
            {error}
          </p>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="border border-slate-300 text-customGray rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!tipo || loading}
            className="bg-bluePrimary text-white font-semibold rounded-lg px-5 py-2 text-sm hover:bg-blueTertiary transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : "Enviar feedback"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
