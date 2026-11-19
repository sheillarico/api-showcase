import { useState, type FormEvent } from 'react';
import Section from '@/components/Section';
import ResponseViewer from '@/components/ResponseViewer';
import { Button, ErrorNote, inputClass, Label } from '@/components/ui';
import { useApi } from '@/hooks/useApi';

interface Translation {
  source: string;
  target: string;
  text: string;
  translation: string;
}

const LANGUAGES: [string, string][] = [
  ['en', 'English'],
  ['tl', 'Filipino'],
  ['es', 'Spanish'],
  ['fr', 'French'],
  ['de', 'German'],
  ['it', 'Italian'],
  ['pt', 'Portuguese'],
  ['ja', 'Japanese'],
  ['ko', 'Korean'],
  ['zh-CN', 'Chinese (Simplified)'],
];

const MAX = 500;

export default function TranslationSection() {
  const [text, setText] = useState('Good morning! How are you today?');
  const [source, setSource] = useState('en');
  const [target, setTarget] = useState('tl');
  const { result, loading, error, run } = useApi<Translation>();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    run('POST', '/translations', { body: { text, source, target } });
  };

  return (
    <Section
      id="translation"
      index={3}
      title="Translation"
      description="Translate short text between languages. This is a POST that creates a translation resource and returns 201. Results are cached for 24 hours."
      provider="MyMemory"
      providerUrl="https://mymemory.translated.net"
      endpoint="POST /api/v1/translations"
    >
      <div>
        <form onSubmit={submit} className="grid grid-cols-2 gap-3">
          <label>
            <Label>From</Label>
            <select value={source} onChange={(e) => setSource(e.target.value)} className={inputClass}>
              {LANGUAGES.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <Label>To</Label>
            <select value={target} onChange={(e) => setTarget(e.target.value)} className={inputClass}>
              {LANGUAGES.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label className="col-span-2">
            <Label>
              Text ({text.length}/{MAX})
            </Label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={MAX}
              rows={4}
              className={inputClass}
            />
          </label>
          <div className="col-span-2 flex gap-2">
            <Button disabled={loading || !text.trim() || source === target}>
              {loading ? 'Translating…' : 'Translate'}
            </Button>
            <button
              type="button"
              onClick={() => {
                setSource(target);
                setTarget(source);
              }}
              className="rounded-lg border border-neutral-900 bg-white px-4 py-2 text-sm font-medium transition hover:border-gold-400 hover:bg-gold-50 active:scale-95"
            >
              ⇄ Swap
            </button>
          </div>
          {source === target && <p className="col-span-2 text-xs text-neutral-600">Choose two different languages.</p>}
        </form>

        {error && <ErrorNote message={error} />}

        {result && (
          <div className="hover-lift mt-6 rounded-xl border border-neutral-900 bg-neutral-900 p-5 text-white">
            <p className="text-xs uppercase tracking-wider text-neutral-400">Translation</p>
            <p className="mt-1 text-xl font-semibold text-gold-300">{result.data.translation}</p>
          </div>
        )}
      </div>
      <ResponseViewer result={result} />
    </Section>
  );
}