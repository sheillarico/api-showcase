import { useState, type FormEvent } from 'react';
import Section from '@/components/Section';
import ResponseViewer from '@/components/ResponseViewer';
import { Button, ErrorNote, inputClass, Label } from '@/components/ui';
import { useApi } from '@/hooks/useApi';

interface Forecast {
  location: { name: string; country: string | null };
  current: { temperature_2m: number; weather_code: number; wind_speed_10m: number };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
}

function describe(code: number): { icon: string; label: string } {
  if (code === 0) return { icon: '☀️', label: 'Clear sky' };
  if (code <= 2) return { icon: '🌤️', label: 'Partly cloudy' };
  if (code === 3) return { icon: '☁️', label: 'Overcast' };
  if (code <= 48) return { icon: '🌫️', label: 'Fog' };
  if (code <= 57) return { icon: '🌦️', label: 'Drizzle' };
  if (code <= 67) return { icon: '🌧️', label: 'Rain' };
  if (code <= 77) return { icon: '❄️', label: 'Snow' };
  if (code <= 82) return { icon: '🌧️', label: 'Rain showers' };
  if (code <= 86) return { icon: '🌨️', label: 'Snow showers' };
  return { icon: '⛈️', label: 'Thunderstorm' };
}

const day = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

export default function WeatherSection() {
  const [city, setCity] = useState('Manila');
  const { result, loading, error, run } = useApi<Forecast>();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    run('GET', '/forecasts', { query: { city } });
  };

  const f = result?.data;
  const now = f ? describe(f.current.weather_code) : null;

  return (
    <Section
      id="weather"
      index={1}
      title="Weather Forecast"
      description="Search any city for current conditions and a 7-day forecast. Laravel geocodes the city, then fetches the forecast and caches it for 30 minutes."
      provider="Open-Meteo"
      providerUrl="https://open-meteo.com"
      endpoint="GET /api/v1/forecasts"
    >
      <div>
        <form onSubmit={submit} className="flex items-end gap-2">
          <label className="flex-1">
            <Label>City</Label>
            <input value={city} onChange={(e) => setCity(e.target.value)} maxLength={80} className={inputClass} />
          </label>
          <Button disabled={loading || !city.trim()}>{loading ? 'Loading…' : 'Get forecast'}</Button>
        </form>

        {error && <ErrorNote message={error} />}

        {f && now && (
          <div className="mt-6">
            <div className="hover-lift flex items-center gap-4 rounded-xl border border-neutral-900 bg-neutral-900 p-4 text-white">
              <span className="text-5xl">{now.icon}</span>
              <div>
                <p className="text-sm text-neutral-400">
                  {f.location.name}
                  {f.location.country ? `, ${f.location.country}` : ''}
                </p>
                <p className="text-3xl font-bold text-gold-300">{Math.round(f.current.temperature_2m)}°C</p>
                <p className="text-sm text-neutral-300">
                  {now.label} · wind {f.current.wind_speed_10m} km/h
                </p>
              </div>
            </div>
            <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {f.daily.time.slice(0, 7).map((d, i) => (
                <li
                  key={d}
                  className="hover-lift rounded-lg border border-neutral-900 bg-neutral-900 p-3 text-sm text-white"
                >
                  <p className="text-xs text-neutral-400">{day(d)}</p>
                  <p className="text-xl">{describe(f.daily.weather_code[i]).icon}</p>
                  <p>
                    <span className="text-gold-300">{Math.round(f.daily.temperature_2m_max[i])}°</span> /{' '}
                    {Math.round(f.daily.temperature_2m_min[i])}°
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <ResponseViewer result={result} />
    </Section>
  );
}