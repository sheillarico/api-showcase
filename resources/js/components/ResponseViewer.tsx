import type { ApiResult } from '@/lib/api';

export default function ResponseViewer({ result }: { result: ApiResult<unknown> | null }) {
  if (!result) {
    return (
      <div className="flex h-full min-h-40 items-center justify-center rounded-xl border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-400">
        The request and response will appear here.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-950 text-neutral-100">
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-800 px-4 py-2 text-xs">
        <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-semibold text-emerald-300">{result.method}</span>
        <code className="break-all text-neutral-300">{result.url}</code>
        <span className="ml-auto whitespace-nowrap text-neutral-400">
          {result.status} · {result.ms} ms
        </span>
      </div>
      {result.body !== undefined && (
        <pre className="max-h-32 overflow-auto border-b border-neutral-800 px-4 py-3 text-xs text-sky-300">
          {JSON.stringify(result.body, null, 2)}
        </pre>
      )}
      <pre className="max-h-80 overflow-auto px-4 py-3 text-xs leading-relaxed">
        {JSON.stringify(result.raw, null, 2)}
      </pre>
    </div>
  );
}