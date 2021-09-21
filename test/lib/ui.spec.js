/**
 * @jest-environment jsdom
 */

import { postDetails, postList } from '../../src/lib/ui';

describe('postDetails', () => {
  it('Muestra informacion post', () => {
    const post = {
      id: 'id-1',
      text: 'Texto post test',
      dateCreated: {
        toDate: () => new Date(2021, 8, 21, 10, 0, 0),
      },
    };
    const elem = postDetails({ post });

    expect(elem.querySelector('h2').textContent.trim()).toBe('Post creado el 2021-09-21 a las 08:00');
    expect(elem.querySelectorAll('small')).toHaveLength(0); // no hay leyenda de fecha de edicion
    expect(elem.querySelector('input[type=hidden]').value).toBe('id-1');
    expect(elem.querySelectorAll('textarea')).toHaveLength(0);
    expect(elem.querySelector('p').textContent.trim()).toBe('Texto post test');
    expect(elem.querySelectorAll('#btn-editar')).toHaveLength(1);
    expect(elem.querySelectorAll('#btn-eliminar')).toHaveLength(1);
    expect(elem.querySelectorAll('#btn-crear')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-guardar')).toHaveLength(0);
  });

  it('Muestra formulario vacio si editing === true y no hay post', () => {
    const post = null;
    const editing = true;
    const elem = postDetails({ post, editing });

    expect(elem.querySelector('h2').textContent.trim()).toBe('Nuevo post');
    expect(elem.querySelectorAll('input[type=hidden]')).toHaveLength(0);
    expect(elem.querySelector('textarea').value.trim()).toBe('');
    expect(elem.querySelectorAll('p')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-editar')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-eliminar')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-crear')).toHaveLength(1);
    expect(elem.querySelectorAll('#btn-guardar')).toHaveLength(0);
  });

  it('Muestra formulario pre-llenado si editing === true y si hay post', () => {
    const post = {
      id: 'id-1',
      text: 'Texto post test',
      dateCreated: {
        toDate: () => new Date(),
      },
    };
    const editing = true;
    const elem = postDetails({ post, editing });

    expect(elem.querySelector('h2').textContent.trim()).toBe('Editar post');
    expect(elem.querySelector('input[type=hidden]').value).toBe('id-1');
    expect(elem.querySelector('textarea').value.trim()).toBe('Texto post test');
    expect(elem.querySelectorAll('p')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-editar')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-eliminar')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-crear')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-guardar')).toHaveLength(1);
  });

  it('Muestra informacion de edicion si post fue previamente editado', () => {
    const post = {
      id: 'id-1',
      text: 'Texto post test',
      dateCreated: {
        toDate: () => new Date(2021, 8, 21, 10, 0, 0),
      },
      dateLastEdited: {
        toDate: () => new Date(2021, 8, 21, 15, 0, 0),
      },
    };
    const elem = postDetails({ post });

    expect(elem.querySelector('h2').childNodes[0].nodeValue.trim()).toBe('Post creado el 2021-09-21 a las 08:00');
    expect(elem.querySelector('small').textContent.trim()).toBe('Última edición: 2021-09-21 a las 13:00');
    expect(elem.querySelector('input[type=hidden]').value).toBe('id-1');
    expect(elem.querySelectorAll('textarea')).toHaveLength(0);
    expect(elem.querySelector('p').textContent.trim()).toBe('Texto post test');
    expect(elem.querySelectorAll('#btn-editar')).toHaveLength(1);
    expect(elem.querySelectorAll('#btn-eliminar')).toHaveLength(1);
    expect(elem.querySelectorAll('#btn-crear')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-guardar')).toHaveLength(0);
  });
});

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
});
