interface Option<T extends string> { value: T; label: string; hint: string }

interface Props<T extends string> {
  legend: string;
  name: string;
  options: readonly Option<T>[];
  value: T | '';
  error?: string;
  onChange: (v: T) => void;
}

export default function OptionGroup<T extends string>({ legend, name, options, value, error, onChange }: Props<T>) {
  const errId = `${name}-error`;
  return (
    <fieldset aria-describedby={error ? errId : undefined}>
      <legend className="mb-2 text-sm font-semibold text-ink-800">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-3" role="radiogroup">
        {options.map((o) => {
          const selected = value === o.value;
          return (
            <label
              key={o.value}
              className={`cursor-pointer rounded-xl border p-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-route-500 ${
                selected ? 'border-route-500 bg-route-50' : 'border-ink-200 bg-white hover:border-ink-400'
              } ${error && !selected ? 'border-red-300' : ''}`}
            >
              <input
                type="radio"
                name={name}
                value={o.value}
                checked={selected}
                onChange={() => onChange(o.value)}
                className="sr-only"
                data-testid={`${name}-${o.value}`}
              />
              <span className="block text-sm font-semibold">{o.label}</span>
              <span className="block text-xs text-ink-600">{o.hint}</span>
            </label>
          );
        })}
      </div>
      {error && <p id={errId} className="mt-2 text-sm text-red-600">{error}</p>}
    </fieldset>
  );
}
