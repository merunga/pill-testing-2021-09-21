/**
 * @jest-environment jsdom
 */

import { init } from '../../src/lib';

jest.mock('../../src/lib/data');

global.firebase = {
  initializeApp: jest.fn(() => ({})),
};

describe('init', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('Inyecta en el root el estado inicial', () => {
    init().then(() => {
      expect(document.querySelectorAll('#post-form')).toHaveLength(1);
      expect(document.querySelector('p').innerHTML).toBe('No hay posts');
    });
  });
});
