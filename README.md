# FastExpress - Frontend (React + TypeScript + Tailwind)

## Ejecutar
```bash
npm install
npm run dev            # http://localhost:5173
npm test               # pruebas unitarias de validación (Vitest)
npm run test:coverage  # reporte de cobertura
```

## Backend
Se conecta a `POST /api/v1/quotes/calculate`.
- Body: `{ "peso": number, "tipoCliente": "Nuevo|Frecuente|Vip", "tipoEnvio": "Estandar|Express" }`
- 200: `{ pesoKg, tipoCliente, tipoEnvio, tarifaBase, factorCliente, porcentajeDescuentoCliente, multiplicadorEnvio, tarifaFinal }`
- 400/422: `{ code, message, type }`

En desarrollo Vite hace proxy de `/api` hacia `BACKEND_URL` (archivo `.env`), así no hay problemas de CORS.
Si cambia la IP o el túnel, edita `BACKEND_URL` y reinicia `npm run dev`.

## Mapeo con la guía (Sección C)
| Requisito de la guía | Dónde está |
|---|---|
| Validación en cliente como usabilidad, no seguridad | `lib/validation.ts` + el backend vuelve a validar; el cliente muestra errores del servidor (`QuoteForm`, `api.ts`) |
| Retroalimentación visual al superar BR-02 (20 kg) | Borde rojo, mensaje con `role="alert"`, medidor `WeightGauge` en rojo, mensaje con la salida |
| Límites BVA 5.00 / 5.01 / 20.00 kg | `validation.test.ts` y `weightBand()` |
| Evidencia para QA | atributos `data-testid` en inputs, errores y resultado |
