import Reveal from '@/components/Reveal';

const GROUPS = [
  {
    title: 'Frontend',
    items: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4'],
  },
  {
    title: 'Backend',
    items: ['PHP 8.3', 'Laravel 13', 'REST API (/api/v1)', 'Laravel Cache', 'PHPUnit + Http::fake'],
  },
  {
    title: 'Free APIs (no key)',
    items: ['Open-Meteo', 'Frankfurter', 'MyMemory', 'ipwho.is', 'Nager.Date'],
  },
];

export default function TechStack() {
  return (
    <section id="stack" className="scroll-mt-20 border-y border-neutral-300 bg-neutral-100 py-14">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">Tech stack</p>
          <h2 className="mt-2 border-l-4 border-gold-400 pl-3 text-2xl font-bold tracking-tight">
            What this project is built with
          </h2>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 120}>
              <div className="h-full rounded-xl border border-neutral-900 bg-neutral-900 p-5">
                <h3 className="text-sm font-semibold text-gold-300">{g.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="cursor-default rounded-full border border-neutral-600 px-3 py-1 text-xs font-medium text-neutral-100 transition-colors duration-200 hover:border-gold-400 hover:text-gold-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}