export interface ApiResult<T> {
  data: T;
  status: number;
  ms: number;
  method: string;
  url: string;
  body?: unknown;
  raw: unknown;
}

export interface RequestOptions {
  query?: Record<string, string | number>;
  body?: unknown;
}

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const BASE = '/api/v1';

export async function apiRequest<T>(
  method: 'GET' | 'POST',
  path: string,
  opts: RequestOptions = {},
): Promise<ApiResult<T>> {
  const qs = opts.query
    ? '?' + new URLSearchParams(Object.entries(opts.query).map(([k, v]) => [k, String(v)]))
    : '';
  const url = `${BASE}${path}${qs}`;
  const started = performance.now();

  let res: Response;
  try {
    res = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        ...(opts.body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });
  } catch {
    throw new ApiError('Network error. Is the server running?', 0);
  }

  const ms = Math.round(performance.now() - started);
  const raw = await res.json().catch(() => null);

  if (!res.ok) {
    const errors = raw?.errors as Record<string, string[]> | undefined;
    const message = errors
      ? Object.values(errors).flat().join(' ')
      : (raw?.message ?? `Request failed (${res.status})`);
    throw new ApiError(message, res.status);
  }

  return { data: raw.data as T, status: res.status, ms, method, url, body: opts.body, raw };
}