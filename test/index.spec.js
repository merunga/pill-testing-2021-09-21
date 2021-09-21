// importamos la funcion que vamos a testear
import { init } from '../src/lib/index';

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof init).toBe('function');
  });
});
