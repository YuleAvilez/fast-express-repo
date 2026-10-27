import { RULES } from '../config/businessRules';
import { parseWeight, weightBand } from '../lib/validation';

const MAX_SCALE = 25; // la escala visual llega a 25 kg para mostrar el exceso

export default function WeightGauge({ raw }: { raw: string }) {
  const value = parseWeight(raw) ?? 0;
  const band = weightBand(raw);
  const pct = Math.min((value / MAX_SCALE) * 100, 100);
  const lightPct = (RULES.WEIGHT_LIGHT_MAX / MAX_SCALE) * 100;
  const maxPct = (RULES.WEIGHT_MAX / MAX_SCALE) * 100;

  const fill = band === 'over' ? 'bg-red-500' : band === 'heavy' ? 'bg-signal-500' : 'bg-route-500';
  const label =
    band === 'light' ? 'Paquete liviano (hasta 5 kg, 2 USD por kg)'
    : band === 'heavy' ? 'Paquete pesado (5.01 a 20 kg, 4 USD por kg)'
    : band === 'over' ? 'Excede el máximo de 20 kg'
    : 'Escribe el peso para ver su categoría';

  return (
    <div aria-hidden="true" className="mt-3">
      <div className="relative h-2 rounded-full bg-ink-100">
        <div className={`h-2 rounded-full transition-all duration-300 ${fill}`} style={{ width: `${pct}%` }} />
        <span className="absolute -top-1 h-4 w-px bg-ink-400" style={{ left: `${lightPct}%` }} />
        <span className="absolute -top-1 h-4 w-px bg-red-400" style={{ left: `${maxPct}%` }} />
      </div>
      <div className="relative mt-1 h-4 text-xs text-ink-400">
        <span className="absolute left-0">0</span>
        <span className="absolute -translate-x-1/2" style={{ left: `${lightPct}%` }}>5 kg</span>
        <span className="absolute -translate-x-1/2" style={{ left: `${maxPct}%` }}>20 kg</span>
      </div>
      <p className="mt-1 text-sm text-ink-600">{label}</p>
    </div>
  );
}
