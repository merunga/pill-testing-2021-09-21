/**
 * @jest-environment jsdom
 */

import postList from '../../../src/lib/ui/postList';

describe('postList', () => {
  it('Muestra un elemento por cada posts', () => {
    const posts = [
      {
        id: 'id-1',
        text: 'Texto post test 1',
        dateCreated: {
          toDate: () => new Date(2021, 8, 21, 10, 0, 0),
        },
      },
      {
        id: 'id-2',
        text: 'Texto post test 2',
        dateCreated: {
          toDate: () => new Date(2021, 8, 21, 10, 0, 0),
        },
      },
      {
        id: 'id-3',
        text: 'Texto post test 3',
        dateCreated: {
          toDate: () => new Date(2021, 8, 21, 10, 0, 0),
        },
      },
    ];
    const elem = postList({ posts });
    expect(elem.querySelectorAll('ul > li')).toHaveLength(3);
  });

  it('Si no hay posts, muestra mensaje', () => {
    const posts = [];
    const elem = postList({ posts });
    expect(elem.querySelectorAll('ul')).toHaveLength(0);
    expect(elem.querySelector('p').textContent.trim()).toBe('No hay posts');
  });
});
