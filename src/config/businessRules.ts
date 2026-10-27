/**
 * Reglas de negocio de FastExpress (documento PROYECTO_INTEGRADOR).
 * El backend es la fuente de verdad; aquí solo se usan para validar y orientar al usuario.
 */
export const RULES = {
  /** BR-01: costo base por orden (USD) */
  BASE_FEE: 5,
  /** BR-02: peso mínimo aceptado (kg) */
  WEIGHT_MIN: 0.01,
  /** BR-02: hasta este peso se cobra la tarifa liviana */
  WEIGHT_LIGHT_MAX: 5.0,
  /** BR-02: peso máximo aceptado (kg); por encima se rechaza el envío */
  WEIGHT_MAX: 20.0,
  WEIGHT_DECIMALS: 2,
  RATE_LIGHT: 2, // USD por kg (0.01 a 5.00)
  RATE_HEAVY: 4, // USD por kg (5.01 a 20.00)
} as const;

/** BR-03. `value` es exactamente lo que espera el API. */
export const CLIENT_TYPES = [
  { value: 'Nuevo', label: 'Nuevo', hint: 'Sin descuento' },
  { value: 'Frecuente', label: 'Frecuente', hint: '10 % de descuento' },
  { value: 'Vip', label: 'VIP', hint: '20 % de descuento' },
] as const;

/** BR-04. `value` es exactamente lo que espera el API. */
export const SHIPMENT_TYPES = [
  { value: 'Estandar', label: 'Estándar', hint: 'Sin recargo' },
  { value: 'Express', label: 'Express', hint: '25 % de recargo' },
] as const;

export type ClientType = (typeof CLIENT_TYPES)[number]['value'];
export type ShipmentType = (typeof SHIPMENT_TYPES)[number]['value'];
