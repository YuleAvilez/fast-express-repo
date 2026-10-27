import { useState, type FormEvent } from 'react';
import { CLIENT_TYPES, RULES, SHIPMENT_TYPES } from '../config/businessRules';
import { ApiError, requestQuote } from '../lib/api';
import { parseWeight, validateForm, validateWeight, type FormErrors, type FormValues } from '../lib/validation';
import type { QuoteResult } from '../types';
import OptionGroup from './OptionGroup';
import WeightGauge from './WeightGauge';

interface Props { onQuoted: (r: QuoteResult | null) => void }

export default function QuoteForm({ onQuoted }: Props) {
  const [values, setValues] = useState<FormValues>({ weight: '', clientType: '', shipmentType: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const set = <K extends keyof FormValues>(key: K, v: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setServerError(null);
    onQuoted(null);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const found = validateForm(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    setServerError(null);
    try {
      const result = await requestQuote({
        weightKg: parseWeight(values.weight)!,
        clientType: values.clientType as NonNullable<FormValues['clientType']>,
        shipmentType: values.shipmentType as NonNullable<FormValues['shipmentType']>,
      });
      onQuoted(result);
    } catch (err) {
      onQuoted(null);
      if (err instanceof ApiError) {
        if (err.field) setErrors((prev) => ({ ...prev, [err.field!]: err.message }));
        setServerError(err.message);
      } else {
        setServerError('Algo salió mal. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  const weightError = errors.weight;

  return (
    <form onSubmit={submit} noValidate className="space-y-7" data-testid="quote-form">
      {serverError && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" data-testid="server-error">
          <p className="font-semibold">No pudimos calcular la cotización</p>
          <p className="mt-1">{serverError}</p>
        </div>
      )}

      <div>
        <label htmlFor="weight" className="text-sm font-semibold text-ink-800">Peso del paquete</label>
        <div className="relative mt-2">
          <input
            id="weight"
            inputMode="decimal"
            autoComplete="off"
            placeholder="Ej. 2.5"
            value={values.weight}
            onChange={(e) => set('weight', e.target.value)}
            onBlur={() => setErrors((p) => ({ ...p, weight: validateWeight(values.weight) }))}
            aria-invalid={!!weightError}
            aria-describedby={weightError ? 'weight-error' : 'weight-help'}
            data-testid="weight-input"
            className={`w-full rounded-xl border bg-white px-4 py-3 pr-12 font-display text-xl font-bold transition-colors placeholder:font-sans placeholder:text-base placeholder:font-normal placeholder:text-ink-400 ${
              weightError ? 'border-red-400 bg-red-50/40' : 'border-ink-200 hover:border-ink-400'
            }`}
          />
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-ink-400">kg</span>
        </div>
        {weightError ? (
          <p id="weight-error" role="alert" className="mt-2 flex gap-2 text-sm text-red-600" data-testid="weight-error">
            <svg className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 6h2v5H9V6zm0 6h2v2H9v-2z" clipRule="evenodd" />
            </svg>
            {weightError}
          </p>
        ) : (
          <p id="weight-help" className="mt-2 text-sm text-ink-600">
            Entre {RULES.WEIGHT_MIN.toFixed(2)} y {RULES.WEIGHT_MAX} kg, con hasta {RULES.WEIGHT_DECIMALS} decimales.
          </p>
        )}
        <WeightGauge raw={values.weight} />
      </div>

      <OptionGroup legend="Tipo de cliente" name="clientType" options={CLIENT_TYPES}
        value={values.clientType} error={errors.clientType} onChange={(v) => set('clientType', v)} />
      <OptionGroup legend="Tipo de envío" name="shipmentType" options={SHIPMENT_TYPES}
        value={values.shipmentType} error={errors.shipmentType} onChange={(v) => set('shipmentType', v)} />

      <button
        type="submit"
        disabled={loading}
        data-testid="submit-btn"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 px-6 py-3.5 font-display text-base font-bold text-white transition-colors hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />}
        {loading ? 'Calculando…' : 'Calcular cotización'}
      </button>
    </form>
  );
}
