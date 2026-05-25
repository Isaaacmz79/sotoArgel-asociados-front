// ── Requests ──────────────────────────────────────────────────────────────────

export interface ContextRequest {
  consulta: string;
}

export interface RecommendRequest {
  consulta: string;
  session_id: string;
  respuestas?: Record<string, string>;
}

export interface FeedbackRequest {
  response_id: string;
  tipo: "like" | "dislike";
  descripcion?: string;
}

// ── API cost ──────────────────────────────────────────────────────────────────

export interface TokenCost {
  input_tokens: number;
  output_tokens: number;
  cost_usd: number;
}

// ── Context response ──────────────────────────────────────────────────────────

export interface ContextData {
  session_id: string;
  preguntas: string[];
  cost: TokenCost;
}

export interface ContextResponse {
  code: 200 | 204;
  messages: string;
  data: ContextData;
}

// ── Recommend response ────────────────────────────────────────────────────────

export interface Recomendacion {
  titulo: string;
  accion: string;
  nivel_riesgo: string;
  fundamento_legal: string[];
  plazo_sugerido?: string;
}

export interface CalculoPrestacion {
  concepto: string;
  valor_calculado: number;
  formula?: string;
  valor_base?: string;
  periodo?: string;
  fundamento?: string;
}

export interface RecommendInfo {
  tipo_situacion: string;
  resumen_ejecutivo: string;
  nivel_riesgo_general: string;
  recomendaciones: Recomendacion[];
  marco_normativo: string;
  fuentes: string[];
  calculos_prestaciones?: CalculoPrestacion[];
}

export interface RecommendData {
  response_id: string;
  info: RecommendInfo;
  cost: TokenCost;
}

export interface RecommendResponse {
  code: number;
  messages: string;
  data: RecommendData;
}

// ── IA Page state ─────────────────────────────────────────────────────────────

export type IAStep = "login" | "consulta" | "context" | "results";

export interface IASessionContext {
  consulta: string;
  sessionId: string;
  preguntas: string[];
  contextCost: TokenCost | null;
  skipQuestions: boolean;
}

// ── Admin types ───────────────────────────────────────────────────────────────

export interface AdminSession {
  session_id: string;
  consulta: string;
  preguntas: string[];
  recommendation_count: number;
  feedback_count: number;
  created_at: string;
}

export interface AdminRecommendation {
  response_id: string;
  session_id: string;
  consulta: string;
  respuestas: Record<string, string>;
  tipo_situacion: string;
  nivel_riesgo: string;
  detalle: RecommendInfo;
  created_at: string;
}

export interface SessionFeedback {
  feedback_id: number;
  response_id: string;
  tipo: "like" | "dislike";
  descripcion: string | null;
  created_at: string;
}

export interface AdminFeedback {
  feedback_id: number;
  response_id: string;
  tipo: "like" | "dislike";
  descripcion: string | null;
  consulta: string;
  tipo_situacion: string;
  nivel_riesgo: string;
  detalle: RecommendInfo | null;
  created_at: string;
}
