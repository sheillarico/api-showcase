import { useEffect, useState } from 'react';
import TechStack from '@/components/TechStack';
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
          <a href="#top" className="flex items-center gap-2 font-bold">
            <span className="h-2.5 w-2.5 rounded-full bg-gold-500" />
            API Showcase
          </a>
          <div className="ml-auto flex gap-4">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`whitespace-nowrap border-b-2 pb-0.5 ${
                  active === n.id
                    ? 'border-gold-500 font-semibold text-neutral-900'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {n.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main id="top">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
            Laravel · React · REST
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Five free APIs, <span className="text-gold-600">one clean integration.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600">
            API Showcase is a working reference for{' '}
            <strong className="font-semibold text-neutral-900">integrating third-party APIs the right way</strong>.
            Instead of calling providers from the browser, the{' '}
            <strong className="font-semibold text-neutral-900">React</strong> frontend talks only to our own versioned{' '}
            <strong className="font-semibold text-neutral-900">Laravel REST API</strong>, which validates input,{' '}
            <strong className="font-semibold text-neutral-900">caches results</strong> to stay within free-tier limits,
            maps upstream failures to proper HTTP status codes, and keeps every provider swappable behind an
            interface. Each demo is live and shows the real request and response.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#weather"
              className="rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-gold-600"
            >
              Explore the APIs
            </a>
            <a
              href="#stack"
              className="rounded-lg border border-gold-300 px-6 py-3 text-sm font-medium text-gold-700 transition hover:bg-gold-50"
            >
              See the tech stack
            </a>
          </div>

          <div className="mx-auto mt-12 flex max-w-xl flex-wrap items-center justify-center gap-3 text-xs text-neutral-500">
            <span className="rounded-lg border border-neutral-200 px-3 py-2">React</span>
            <span className="text-gold-500">→</span>
            <span className="rounded-lg border border-gold-200 bg-gold-50 px-3 py-2 text-gold-700">
              Laravel /api/v1 + cache
            </span>
            <span className="text-gold-500">→</span>
            <span className="rounded-lg border border-neutral-200 px-3 py-2">Free provider</span>
          </div>
        </div>

        <TechStack />

        <WeatherSection />
        <CurrencySection />
        <TranslationSection />
        <GeolocationSection />
        <CalendarSection />
      </main>

      <footer className="border-t border-gold-200 py-8 text-center text-sm text-neutral-500">
        Built with Laravel and React. Data from Open-Meteo, Frankfurter, MyMemory, ipwho.is and Nager.Date.
      </footer>
    </div>
  );
}