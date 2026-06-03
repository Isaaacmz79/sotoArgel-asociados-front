// ── Requests ──────────────────────────────────────────────────────────────────

export type FuenteConsulta = "pdf" | "gerencie" | "senado_cst" | "investigacion" | "mixto";

export interface ContextRequest {
  consulta: string;
  fuente: FuenteConsulta;
}

export interface RecommendRequest {
  consulta: string;
  session_id: string;
  respuestas?: Record<string, string>;
  fuente: FuenteConsulta;
}

export interface FeedbackRequest {
  response_id: string;
  tipo: "like" | "dislike";
  descripcion?: string;
}

export interface RefineRequest {
  response_id: string;
  comentario: string;
}

// ── Refine response ───────────────────────────────────────────────────────────

export interface RefineInfo {
  resumen_ajuste: string;
  recomendaciones: Recomendacion[];
  calculos_prestaciones?: CalculoPrestacion[];
  aclaracion: string;
}

export interface RefineData {
  response_id: string;
  iteracion: number;
  max_iteraciones: number;
  cost: TokenCost;
  cost_acumulado: TokenCost;
  info: RefineInfo;
}

export interface RefineResponse {
  code: number;
  messages: string;
  data: RefineData;
}

// ── Research ──────────────────────────────────────────────────────────────────

export interface ResearchRequest {
  consulta: string;
  sitios: Array<"gerencie" | "senado_cst">;
}

export interface Hallazgo {
  titulo: string;
  contenido: string;
  fuente: string;
}

export interface ResearchData {
  research_id: string;
  consulta: string;
  resumen: string;
  hallazgos: Hallazgo[];
  fuentes_consultadas: string[];
  chunks_indexados: number;
  cost: TokenCost;
}

export interface ResearchResponse {
  code: number;
  messages: string;
  data?: ResearchData;
}

// ── API cost ──────────────────────────────────────────────────────────────────

export interface TokenCost {
  modelo?: string;
  proveedor?: string;
  total_tokens?: number;
  input_tokens: number;
  output_tokens: number;
  cached_tokens?: number;
  cache_creation_tokens?: number;
  reasoning_tokens?: number;
  cost_usd: number;
  duration_seconds?: number;
  intentos?: number;
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

export type IAStep = "login" | "consulta" | "context" | "results" | "research-results";

export interface IASessionContext {
  consulta: string;
  sessionId: string;
  preguntas: string[];
  contextCost: TokenCost | null;
  skipQuestions: boolean;
  fuente: FuenteConsulta;
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
