import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export const inputClass =
  'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition hover:border-neutral-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-400/30';

// Black button; a gold fill slides in from the left on hover.
const base =
  'group relative inline-block overflow-hidden rounded-lg text-center text-sm font-medium transition duration-300 ' +
  'before:absolute before:inset-0 before:-translate-x-full before:bg-gold-400 before:transition-transform before:duration-300 ' +
  'hover:before:translate-x-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ' +
  'disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:before:transition-none';

const solid = 'bg-neutral-900 text-white hover:text-neutral-900';
const outline = 'border border-neutral-900 text-neutral-900 hover:border-gold-400';

export function Button({ className = '', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`${base} ${solid} px-4 py-2 ${className}`}>
      <span className="relative">{children}</span>
    </button>
  );
}

export function ButtonLink({
  variant = 'solid',
  className = '',
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: 'solid' | 'outline' }) {
  return (
    <a {...props} className={`${base} ${variant === 'solid' ? solid : outline} px-6 py-3 ${className}`}>
      <span className="relative">{children}</span>
    </a>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return <span className="mb-1 block text-xs font-medium text-neutral-500">{children}</span>;
}

export function ErrorNote({ message }: { message: string }) {
  return (
    <p role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
      {message}
    </p>
  );
}