import type { ClientType, ShipmentType } from './config/businessRules';

export interface QuoteRequest {
  weightKg: number;
  clientType: ClientType;
  shipmentType: ShipmentType;
}

/** Respuesta de POST /api/v1/quotes/calculate */
export interface QuoteResult {
  pesoKg: number;
  tipoCliente: string;
  tipoEnvio: string;
  tarifaBase: number;
  factorCliente: number;
  porcentajeDescuentoCliente: number;
  multiplicadorEnvio: number;
  tarifaFinal: number;
}

/** Error del API: { code, message, type } */
export interface ApiErrorBody {
  code?: string;
  message?: string;
  type?: string;
}
