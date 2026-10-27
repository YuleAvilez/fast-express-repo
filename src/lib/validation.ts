import { RULES, type ClientType, type ShipmentType } from '../config/businessRules';

export interface FormValues {
  weight: string;
  clientType: ClientType | '';
  shipmentType: ShipmentType | '';
}
export type FormErrors = Partial<Record<keyof FormValues, string>>;

/** Convierte el texto del input a número. Acepta coma o punto decimal. */
export function parseWeight(raw: string): number | null {
  const text = raw.trim().replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(text)) return null;
  return Number(text);
}

/** BR-02. Devuelve el mensaje de error o undefined si el peso es válido. */
export function validateWeight(raw: string): string | undefined {
  if (raw.trim() === '') return 'Ingresa el peso del paquete.';
  const value = parseWeight(raw);
  if (value === null) return 'Usa solo números, por ejemplo 2.5.';
  const decimals = raw.trim().replace(',', '.').split('.')[1]?.length ?? 0;
  if (decimals > RULES.WEIGHT_DECIMALS) {
    return `Usa como máximo ${RULES.WEIGHT_DECIMALS} decimales.`;
  }
  if (value < RULES.WEIGHT_MIN) return `El peso mínimo es ${RULES.WEIGHT_MIN.toFixed(2)} kg.`;
  if (value > RULES.WEIGHT_MAX) {
    return `El paquete supera el límite de ${RULES.WEIGHT_MAX} kg. Divídelo en envíos de hasta ${RULES.WEIGHT_MAX} kg o contacta a un asesor.`;
  }
  return undefined;
}

export function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const weightError = validateWeight(values.weight);
  if (weightError) errors.weight = weightError;
  if (!values.clientType) errors.clientType = 'Selecciona el tipo de cliente.';
  if (!values.shipmentType) errors.shipmentType = 'Selecciona el tipo de envío.';
  return errors;
}

export type WeightBand = 'light' | 'heavy' | 'over' | 'none';

/** Clasifica el peso en su partición de equivalencia (útil para la UI y para QA). */
export function weightBand(raw: string): WeightBand {
  const v = parseWeight(raw);
  if (v === null || v < RULES.WEIGHT_MIN) return 'none';
  if (v <= RULES.WEIGHT_LIGHT_MAX) return 'light';
  if (v <= RULES.WEIGHT_MAX) return 'heavy';
  return 'over';
}
