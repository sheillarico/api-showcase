import Section from '@/components/Section';
import ResponseViewer from '@/components/ResponseViewer';
import { Button, ErrorNote } from '@/components/ui';
import { useApi } from '@/hooks/useApi';

interface Location {
  ip: string;
  city: string | null;
  region: string | null;
  country: string | null;
  country_code: string | null;
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
}

export default function GeolocationSection() {
  const { result, loading, error, run } = useApi<Location>();
  const l = result?.data;

  const rows: [string, string | null][] = l
    ? [
        ['IP address', l.ip],
        ['City', l.city],
        ['Region', l.region],
        ['Country', l.country ? `${l.country} (${l.country_code})` : null],
        ['Coordinates', l.latitude != null ? `${l.latitude.toFixed(3)}, ${l.longitude?.toFixed(3)}` : null],
        ['Timezone', l.timezone],
      ]
    : [];

  return (
    <Section
      id="geolocation"
      index={4}
      title="Geolocation"
      description="Find the approximate location of the requesting IP address. IP lookups are city-level at best, not exact."
      provider="ipwho.is"
      providerUrl="https://ipwho.is"
      endpoint="GET /api/v1/locations/current"
    >
      <div>
        <Button onClick={() => run('GET', '/locations/current')} disabled={loading}>
          {loading ? 'Locating…' : 'Detect my location'}
        </Button>
        <p className="mt-2 text-xs text-neutral-500">Your IP is sent to the lookup provider only when you click.</p>

        {error && <ErrorNote message={error} />}

        {l && (
          <>
            <dl className="mt-6 divide-y divide-neutral-200 rounded-xl border border-neutral-200 text-sm">
              {rows.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-4 py-2.5">
                  <dt className="text-neutral-500">{k}</dt>
                  <dd className="font-medium">{v ?? '—'}</dd>
                </div>
              ))}
            </dl>
            {l.latitude != null && (
              <a
                href={`https://www.openstreetmap.org/?mlat=${l.latitude}&mlon=${l.longitude}#map=11/${l.latitude}/${l.longitude}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm underline hover:text-neutral-600"
              >
                View on OpenStreetMap ↗
              </a>
            )}
          </>
        )}
      </div>
      <ResponseViewer result={result} />
    </Section>
  );
}