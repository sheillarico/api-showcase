import type { ReactNode } from 'react';

interface Props {
  id: string;
  index: number;
  title: string;
  description: string;
  provider: string;
  providerUrl: string;
  endpoint: string;
  children: ReactNode;
}

export default function Section({ id, index, title, description, provider, providerUrl, endpoint, children }: Props) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-neutral-200 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
          {String(index).padStart(2, '0')} · {endpoint}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">{title}</h2>
        <p className="mt-2 max-w-2xl text-neutral-600">{description}</p>
        <p className="mt-1 text-sm text-neutral-500">
          Powered by{' '}
          <a href={providerUrl} target="_blank" rel="noreferrer" className="underline hover:text-neutral-900">
            {provider}
          </a>
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">{children}</div>
      </div>
    </section>
  );
}