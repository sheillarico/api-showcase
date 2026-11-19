import type { ApiResult } from '@/lib/api';

export default function ResponseViewer({ result }: { result: ApiResult<unknown> | null }) {
  if (!result) {
    return (
      <div className="flex h-full min-h-40 items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-white p-6 text-center text-sm text-neutral-400">
        The request and response will appear here.
      </div>
    );
  }

  return (
    <div className="hover-lift overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <div className="flex flex-wrap items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-2 text-xs">
        <span className="rounded bg-neutral-900 px-1.5 py-0.5 font-semibold text-gold-300">{result.method}</span>
        <code className="break-all text-neutral-700">{result.url}</code>
        <span className="ml-auto whitespace-nowrap font-medium text-gold-700">
          {result.status} · {result.ms} ms
        </span>
      </div>

      {result.body !== undefined && (
        <>
          <p className="px-4 pt-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Request body</p>
          <pre className="max-h-32 overflow-auto px-4 pb-3 pt-1 text-xs text-neutral-700">
            {JSON.stringify(result.body, null, 2)}
          </pre>
        </>
      )}

      <p className="border-t border-neutral-100 px-4 pt-3 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
        Response
      </p>
      <pre className="max-h-80 overflow-auto px-4 pb-4 pt-1 text-xs leading-relaxed text-neutral-800">
        {JSON.stringify(result.raw, null, 2)}
      </pre>
    </div>
  );
}