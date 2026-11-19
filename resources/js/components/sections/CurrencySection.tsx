import { useState, type FormEvent } from 'react';
import Section from '@/components/Section';
import ResponseViewer from '@/components/ResponseViewer';
import { Button, ErrorNote, inputClass, Label } from '@/components/ui';
import { useApi } from '@/hooks/useApi';

interface Conversion {
  from: string;
  to: string;
  amount: number;
  rate: number;
  result: number;
  date: string;
}

const CURRENCIES = ['USD', 'EUR', 'PHP', 'JPY', 'GBP', 'AUD', 'CAD', 'SGD', 'KRW', 'CNY', 'CHF', 'INR'];

const money = (value: number, currency: string) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(value);

export default function CurrencySection() {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('PHP');
  const { result, loading, error, run } = useApi<Conversion>();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    run('GET', '/conversions', { query: { from, to, amount } });
  };

  const c = result?.data;

  return (
    <Section
      id="currency"
      index={2}
      title="Currency Converter"
      description="Convert between major currencies using European Central Bank reference rates, cached for one hour."
      provider="Frankfurter"
      providerUrl="https://frankfurter.dev"
      endpoint="GET /api/v1/conversions"
    >
      <div>
        <form onSubmit={submit} className="grid grid-cols-2 gap-3">
          <label className="col-span-2">
            <Label>Amount</Label>
            <input
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={inputClass}
            />
          </label>
          <label>
            <Label>From</Label>
            <select value={from} onChange={(e) => setFrom(e.target.value)} className={inputClass}>
              {CURRENCIES.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            <Label>To</Label>
            <select value={to} onChange={(e) => setTo(e.target.value)} className={inputClass}>
              {CURRENCIES.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <div className="col-span-2 flex gap-2">
            <Button disabled={loading || !amount}>{loading ? 'Converting…' : 'Convert'}</Button>
            <button
              type="button"
              onClick={() => {
                setFrom(to);
                setTo(from);
              }}
              className="rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm transition hover:border-gold-400 hover:bg-gold-50 active:scale-95"
            >
              ⇄ Swap
            </button>
          </div>
        </form>

        {error && <ErrorNote message={error} />}

        {c && (
          <div className="hover-lift mt-6 rounded-xl border border-neutral-200 bg-white p-5">
            <p className="text-sm text-neutral-500">{money(c.amount, c.from)} =</p>
            <p className="text-3xl font-bold">{money(c.result, c.to)}</p>
            <p className="mt-2 text-sm text-neutral-500">
              1 {c.from} = {c.rate} {c.to} · rates from {c.date}
            </p>
          </div>
        )}
      </div>
      <ResponseViewer result={result} />
    </Section>
  );
}