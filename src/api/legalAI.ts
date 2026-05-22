import type {
  ContextRequest,
  ContextResponse,
  RecommendRequest,
  RecommendResponse,
  FeedbackRequest,
} from "../types/ia";

const BASE_URL = "http://54.236.240.63";

const ENDPOINTS = {
  context: `${BASE_URL}/api/v1/advisor/context`,
  recommend: `${BASE_URL}/api/v1/advisor/recommend`,
  feedback: `${BASE_URL}/api/v1/advisor/feedback`,
} as const;

// ── Error parser ──────────────────────────────────────────────────────────────

function parseApiError(res: Response, data: unknown): string | null {
  if (!res.ok) {
    if (data && typeof data === "object" && "detail" in data) {
      const detail = (data as { detail: unknown }).detail;
      if (Array.isArray(detail)) {
        return detail
          .map((e: unknown) =>
            typeof e === "object" && e !== null && "msg" in e
              ? String((e as { msg: unknown }).msg)
              : String(e)
          )
          .join(" · ");
      }
    }
    const msg =
      data &&
      typeof data === "object" &&
      ("detail" in data || "messages" in data)
        ? ((data as Record<string, unknown>).detail as string) ||
          ((data as Record<string, unknown>).messages as string)
        : null;
    return msg || `Error del servidor (${res.status})`;
  }
  if (!data) return "El servidor no devolvió una respuesta válida.";
  if (
    typeof data === "object" &&
    "code" in data &&
    (data as { code: number }).code !== 200 &&
    (data as { code: number }).code !== 204
  ) {
    return (
      ((data as Record<string, unknown>).messages as string) ||
      "El servidor rechazó la consulta."
    );
  }
  return null;
}

// ── Context ───────────────────────────────────────────────────────────────────

export async function postContext(
  payload: ContextRequest
): Promise<{ data: ContextResponse; error: null } | { data: null; error: string }> {
  try {
    const res = await fetch(ENDPOINTS.context, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data: unknown = null;
    try {
      data = await res.json();
    } catch (_) {
      // no-op
    }

    const err = parseApiError(res, data);
    if (err) return { data: null, error: err };

    return { data: data as ContextResponse, error: null };
  } catch {
    return {
      data: null,
      error: "No se pudo conectar con el servidor. Verifica tu conexión e intenta nuevamente.",
    };
  }
}

// ── Recommend ─────────────────────────────────────────────────────────────────

export async function postRecommend(
  payload: RecommendRequest
): Promise<{ data: RecommendResponse; error: null } | { data: null; error: string }> {
  try {
    const res = await fetch(ENDPOINTS.recommend, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data: unknown = null;
    try {
      data = await res.json();
    } catch (_) {
      // no-op
    }

    const err = parseApiError(res, data);
    if (err) return { data: null, error: err };

    return { data: data as RecommendResponse, error: null };
  } catch {
    return {
      data: null,
      error: "No se pudo conectar con el servidor. Verifica tu conexión e intenta nuevamente.",
    };
  }
}

// ── Feedback ──────────────────────────────────────────────────────────────────

export async function postFeedback(
  payload: FeedbackRequest
): Promise<{ error: null } | { error: string }> {
  try {
    const res = await fetch(ENDPOINTS.feedback, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    let data: unknown = null;
    try {
      data = await res.json();
    } catch (_) {
      // no-op
    }

    if (
      !res.ok ||
      (data &&
        typeof data === "object" &&
        "code" in data &&
        (data as { code: number }).code !== 200)
    ) {
      const msg =
        data &&
        typeof data === "object" &&
        "messages" in data
          ? String((data as { messages: unknown }).messages)
          : "No se pudo registrar el feedback.";
      return { error: msg };
    }

    return { error: null };
  } catch {
    return { error: "Error de red al enviar el feedback." };
  }
}
