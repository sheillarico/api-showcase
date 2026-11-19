import { useCallback, useState } from 'react';
import { apiRequest, type ApiResult, type RequestOptions } from '@/lib/api';

export function useApi<T>() {
  const [result, setResult] = useState<ApiResult<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (method: 'GET' | 'POST', path: string, opts?: RequestOptions) => {
      setLoading(true);
      setError(null);
      try {
        setResult(await apiRequest<T>(method, path, opts));
      } catch (e) {
        setResult(null);
        setError(e instanceof Error ? e.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { result, loading, error, run };
}