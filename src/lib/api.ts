import type { ApiErrorBody, QuoteRequest, QuoteResult } from '../types';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public field?: 'weight' | 'clientType' | 'shipmentType',
  ) {
    super(message);
  }
}

/**
 * En desarrollo, Vite reenvía /api al backend (ver vite.config.ts), así se evita CORS.
 * En producción define VITE_API_URL (ej. https://mi-tunel.example.com).
 */
const BASE = import.meta.env.VITE_API_URL ?? '';
const ENDPOINT = `${BASE}/api/v1/quotes/calculate`;

/** Nombre de los campos del request tal como los define el Swagger. */
function toPayload(r: QuoteRequest) {
  return { peso: r.weightKg, tipoCliente: r.clientType, tipoEnvio: r.shipmentType };
}

export async function requestQuote(req: QuoteRequest, signal?: AbortSignal): Promise<QuoteResult> {
  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(toPayload(req)),
      signal,
    });
  } catch (e) {
    if ((e as Error).name === 'AbortError') throw e;
    throw new ApiError(0, 'No pudimos conectar con el servidor. Revisa que el túnel del API esté activo e inténtalo de nuevo.');
  }

  if (res.ok) return (await res.json()) as QuoteResult;

  const body = (await res.json().catch(() => ({}))) as ApiErrorBody;
  const message = body.message ?? 'Los datos enviados no son válidos.';

  if (res.status === 400 || res.status === 422) {
    // Los errores de regla de negocio (peso fuera de rango) se asocian al campo peso.
    const looksLikeWeight = /peso|weight|kg|l[ií]mite/i.test(`${body.code ?? ''} ${message}`);
    throw new ApiError(res.status, message, body.code, looksLikeWeight ? 'weight' : undefined);
  }
  throw new ApiError(res.status, 'Ocurrió un error en el servidor. Inténtalo más tarde.', body.code);
}
