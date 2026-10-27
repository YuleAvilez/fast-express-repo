import { useState } from 'react';
import QuoteForm from './components/QuoteForm';
import ResultCard from './components/ResultCard';
import type { QuoteResult } from './types';

export default function App() {
  const [result, setResult] = useState<QuoteResult | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-ink-50">
      <header className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-6">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-ink-900 text-route-500">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" /><path d="M3 8l9 5 9-5M12 13v8" />
          </svg>
        </div>
        <span className="font-display text-xl font-extrabold tracking-tight">FastExpress</span>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 pt-6">
        <h1 className="max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Cotiza tu envío en segundos
        </h1>
        <p className="mt-3 max-w-xl text-lg text-ink-600">
          Indica el peso, tu tipo de cliente y la velocidad de entrega. Te mostramos el costo desglosado.
        </p>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.15fr_1fr]">
          <section aria-labelledby="form-title" className="rounded-2xl bg-white p-6 shadow-panel ring-1 ring-ink-100 sm:p-8">
            <h2 id="form-title" className="mb-6 font-display text-xl font-bold">Datos del envío</h2>
            <QuoteForm onQuoted={setResult} />
          </section>
          <aside aria-live="polite" className="lg:sticky lg:top-6">
            <ResultCard result={result} />
          </aside>
        </div>
      </main>
    </div>
  );
}
