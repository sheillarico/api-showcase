import { useEffect, useState } from 'react';
import TechStack from '@/components/TechStack';
import { ButtonLink } from '@/components/ui';
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
      <header className="sticky top-0 z-10 border-b border-neutral-300 bg-white/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-4 py-3 text-sm">
          <a href="#top" className="group flex items-center gap-2 font-bold">
            <span className="h-2.5 w-2.5 rounded-full bg-gold-500 transition-transform duration-300 group-hover:scale-150" />
            API Showcase
          </a>
          <div className="ml-auto flex gap-5">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative whitespace-nowrap py-1 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:bg-gold-500 after:transition-transform after:duration-300 hover:text-neutral-900 hover:after:scale-x-100 motion-reduce:after:transition-none ${
                  active === n.id ? 'font-semibold text-neutral-900 after:scale-x-100' : 'text-neutral-600 after:scale-x-0'
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
          <p className="animate-fade-up text-xs font-semibold uppercase tracking-widest text-gold-600">
            Laravel · React · REST
          </p>
          <h1
            className="animate-fade-up mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl"
            style={{ animationDelay: '100ms' }}
          >
            Five free APIs, <span className="text-gold-600">one clean integration.</span>
          </h1>

          <p
            className="animate-fade-up mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-neutral-700"
            style={{ animationDelay: '200ms' }}
          >
            API Showcase is a working reference for integrating third-party APIs the right way. Instead of calling
            providers from the browser, the React frontend talks only to our own versioned Laravel REST API, which
            validates input, caches results to stay within free-tier limits, maps upstream failures to proper HTTP
            status codes, and keeps every provider swappable behind an interface. Each demo is live and shows the real
            request and response.
          </p>

          <div
            className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: '300ms' }}
          >
            <ButtonLink href="#weather">Explore the APIs</ButtonLink>
            <ButtonLink href="#stack" variant="outline">
              See the tech stack
            </ButtonLink>
          </div>

          <div
            className="animate-fade-up mx-auto mt-12 flex max-w-xl flex-wrap items-center justify-center gap-3 text-xs"
            style={{ animationDelay: '400ms' }}
          >
            <span className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-700">React</span>
            <span className="text-gold-500">→</span>
            <span className="rounded-lg border border-neutral-900 bg-neutral-900 px-3 py-2 text-gold-300">
              Laravel /api/v1 + cache
            </span>
            <span className="text-gold-500">→</span>
            <span className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-700">
              Free provider
            </span>
          </div>
        </div>

        <TechStack />

        <WeatherSection />
        <CurrencySection />
        <TranslationSection />
        <GeolocationSection />
        <CalendarSection />
      </main>

      <footer className="border-t border-neutral-300 bg-neutral-100 py-8 text-center text-sm text-neutral-600">
        Built with Laravel and React. Data from Open-Meteo, Frankfurter, MyMemory, ipwho.is and Nager.Date.
      </footer>
    </div>
  );
}