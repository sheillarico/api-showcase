import { useEffect, useState } from 'react';
import WeatherSection from '@/components/sections/WeatherSection';
import CurrencySection from '@/components/sections/CurrencySection';
import TranslationSection from '@/components/sections/TranslationSection';
import GeolocationSection from '@/components/sections/GeolocationSection';
import CalendarSection from '@/components/sections/CalendarSection';

const NAV = [
  { id: 'weather', label: 'Weather' },
  { id: 'currency', label: 'Currency' },
  { id: 'translation', label: 'Translation' },
  { id: 'geolocation', label: 'Geolocation' },
  { id: 'calendar', label: 'Calendar' },
];

export default function Landing() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 antialiased">
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-4 py-3 text-sm">
          <a href="#top" className="font-bold">
            API Showcase
          </a>
          <div className="ml-auto flex gap-4">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`whitespace-nowrap ${active === n.id ? 'font-semibold text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'}`}
              >
                {n.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="top">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Laravel · React · REST</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Five free APIs, one clean integration.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-600">
            Weather, currency, translation, geolocation and calendar data. Each demo below calls a versioned REST
            endpoint on our own Laravel API, which proxies, validates and caches the upstream provider.
          </p>
          <a
            href="#weather"
            className="mt-8 inline-block rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700"
          >
            Explore the APIs
          </a>

          <div className="mx-auto mt-12 flex max-w-xl items-center justify-center gap-3 text-xs text-neutral-500">
            <span className="rounded-lg border border-neutral-200 px-3 py-2">React</span>
            <span>→</span>
            <span className="rounded-lg border border-neutral-200 px-3 py-2">Laravel /api/v1 + cache</span>
            <span>→</span>
            <span className="rounded-lg border border-neutral-200 px-3 py-2">Free provider</span>
          </div>
        </div>

        <WeatherSection />
        <CurrencySection />
        <TranslationSection />
        <GeolocationSection />
        <CalendarSection />
      </main>

      <footer className="border-t border-neutral-200 py-8 text-center text-sm text-neutral-500">
        Built with Laravel and React. Data from Open-Meteo, Frankfurter, MyMemory, ipwho.is and Nager.Date.
      </footer>
    </div>
  );
}