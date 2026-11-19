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
    <section id="stack" className="scroll-mt-20 border-y border-gold-200 bg-gold-50/60 py-14">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">Tech stack</p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">What this project is built with</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {GROUPS.map((g) => (
            <div key={g.title} className="rounded-xl border border-gold-200 bg-white p-5">
              <h3 className="text-sm font-semibold text-neutral-900">{g.title}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-gold-200 bg-gold-50 px-3 py-1 text-xs font-medium text-gold-700"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}