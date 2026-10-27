import type { QuoteResult } from '../types';

const money = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

export default function ResultCard({ result }: { result: QuoteResult | null }) {
  if (!result) {
    return (
      <div className="flex h-full min-h-[260px] flex-col justify-center rounded-2xl border border-dashed border-ink-200 p-8 text-center">
        <p className="font-display text-lg font-bold text-ink-800">Tu cotización aparecerá aquí</p>
        <p className="mx-auto mt-1 max-w-xs text-sm text-ink-600">
          Completa los datos del paquete y calcula el costo de envío al instante.
        </p>
      </div>
    );
  }

  const discountPct = result.porcentajeDescuentoCliente;
  const surchargePct = Math.round((result.multiplicadorEnvio - 1) * 100);

  const rows: { label: string; value: string; good?: boolean }[] = [
    { label: `Paquete de ${result.pesoKg} kg (tarifa base)`, value: money(result.tarifaBase) },
    { label: `Cliente ${result.tipoCliente}`, value: discountPct > 0 ? `-${discountPct} %` : 'Sin descuento', good: discountPct > 0 },
    { label: `Envío ${result.tipoEnvio}`, value: surchargePct > 0 ? `+${surchargePct} %` : 'Sin recargo' },
  ];

  return (
    <div className="rounded-2xl bg-ink-900 p-8 text-white" role="status" data-testid="result-card">
      <p className="text-sm text-ink-200">Costo total del envío</p>
      <p className="mt-1 font-display text-5xl font-extrabold tracking-tight text-route-500" data-testid="total">
        {money(result.tarifaFinal)}
      </p>
      <dl className="mt-6 divide-y divide-white/10 text-sm">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between py-2.5">
            <dt className="text-ink-200">{r.label}</dt>
            <dd className={r.good ? 'text-route-500' : ''}>{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
