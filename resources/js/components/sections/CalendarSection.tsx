import { useState, type FormEvent } from 'react';
import Section from '@/components/Section';
import ResponseViewer from '@/components/ResponseViewer';
import { Button, ErrorNote, inputClass, Label } from '@/components/ui';
import { useApi } from '@/hooks/useApi';

interface Holiday {
  date: string;
  name: string;
  local_name: string;
  global: boolean;
  types: string[];
}

const COUNTRIES: [string, string][] = [
  ['PH', 'Philippines'],
  ['US', 'United States'],
  ['GB', 'United Kingdom'],
  ['JP', 'Japan'],
  ['AU', 'Australia'],
  ['CA', 'Canada'],
  ['SG', 'Singapore'],
  ['DE', 'Germany'],
  ['FR', 'France'],
];

const fmt = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

export default function CalendarSection() {
  const [country, setCountry] = useState('PH');
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const { result, loading, error, run } = useApi<Holiday[]>();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    run('GET', `/countries/${country}/holidays`, { query: { year } });
  };

  const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD

  return (
    <Section
      id="calendar"
      index={5}
      title="Public Holiday Calendar"
      description="List public holidays by country and year. Holidays are a nested resource of a country, and upcoming ones are highlighted."
      provider="Nager.Date"
      providerUrl="https://date.nager.at"
      endpoint="GET /api/v1/countries/{code}/holidays"
    >
      <div>
        <form onSubmit={submit} className="grid grid-cols-3 gap-3">
          <label className="col-span-2">
            <Label>Country</Label>
            <select value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass}>
              {COUNTRIES.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <Label>Year</Label>
            <input
              type="number"
              min="1975"
              max="2075"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={inputClass}
            />
          </label>
          <div className="col-span-3">
            <Button disabled={loading || !year}>{loading ? 'Loading…' : 'Show holidays'}</Button>
          </div>
        </form>

        {error && <ErrorNote message={error} />}

        {result && (
          <ul className="mt-6 max-h-96 divide-y divide-neutral-200 overflow-auto rounded-xl border border-neutral-200 bg-white text-sm">
            {result.data.length === 0 && <li className="px-4 py-3 text-neutral-500">No holidays found.</li>}
            {result.data.map((h) => (
              <li
                key={h.date + h.name}
                className={`flex justify-between gap-4 px-4 py-2.5 transition-colors ${
                  h.date >= today ? 'text-neutral-900 hover:bg-gold-50' : 'text-neutral-400 hover:bg-neutral-50'
                }`}
              >
                <span>
                  <span className="font-medium">{h.name}</span>
                  {h.local_name !== h.name && <span className="block text-xs">{h.local_name}</span>}
                </span>
                <span className={`whitespace-nowrap ${h.date >= today ? 'font-medium text-gold-700' : ''}`}>
                  {fmt(h.date)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ResponseViewer result={result} />
    </Section>
  );
}