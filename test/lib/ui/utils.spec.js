/**
 * @jest-environment jsdom
 */

import { render } from '../../../src/lib/ui/utils';

describe('render', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  it('Inyecta en el root todos los elementos q se entreguen en orden', () => {
    const elem1 = document.createElement('small');
    const elem2 = document.createElement('em');
    const elem3 = document.createElement('section');
    const elem4 = document.createElement('ol');

    render(elem1, elem2, elem3, elem4);

    expect(document.body.innerHTML)
      .toBe(
        /* eslint-disable prefer-template */
        '<div id="root">'
          + '<div class="max-w-lg mx-auto w-full">'
            + elem1.outerHTML
            + elem2.outerHTML
            + elem3.outerHTML
            + elem4.outerHTML
          + '</div>'
        + '</div>',
        /* eslint-enable prefer-template */
      );
  });
});
