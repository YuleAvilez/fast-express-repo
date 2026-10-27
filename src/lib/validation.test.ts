import { describe, expect, it } from 'vitest';
import { validateForm, validateWeight, weightBand } from './validation';

describe('validateWeight (BR-02) - EP y BVA', () => {
  it.each([['0.01'], ['1'], ['5'], ['5.01'], ['12,5'], ['19.99'], ['20'], ['20.00']])(
    'acepta %s kg',
    (w) => expect(validateWeight(w)).toBeUndefined(),
  );

  it.each([[''], ['abc'], ['-3'], ['0'], ['0.00'], ['20.01'], ['35'], ['2.555']])(
    'rechaza "%s"',
    (w) => expect(validateWeight(w)).toBeTypeOf('string'),
  );

  it('menciona el límite de 20 kg al excederlo', () => {
    expect(validateWeight('20.01')).toContain('20 kg');
  });
});

describe('weightBand', () => {
  it('clasifica en los límites', () => {
    expect(weightBand('5')).toBe('light');
    expect(weightBand('5.01')).toBe('heavy');
    expect(weightBand('20')).toBe('heavy');
    expect(weightBand('20.01')).toBe('over');
    expect(weightBand('x')).toBe('none');
  });
});

describe('validateForm', () => {
  it('exige todos los campos', () => {
    const e = validateForm({ weight: '', clientType: '', shipmentType: '' });
    expect(Object.keys(e)).toHaveLength(3);
  });
  it('no devuelve errores con datos válidos', () => {
    expect(validateForm({ weight: '4', clientType: 'Vip', shipmentType: 'Express' })).toEqual({});
  });
});
