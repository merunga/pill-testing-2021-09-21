/**
 * @jest-environment jsdom
 */

import { postDetails } from '../../src/lib/ui';

describe('postDetails', () => {
  it('Muestra informacion post', () => {
    const post = {
      text: 'Texto post test',
      dateCreated: {
        toDate: () => new Date(2021, 8, 21, 10, 0, 0),
      },
    };
    const elem = postDetails({ post });

    expect(elem.querySelector('h2').textContent.trim()).toBe('Post creado el 2021-09-21 a las 08:00');
    expect(elem.querySelectorAll('small')).toHaveLength(0); // no hay leyenda de fecha de edicion
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
    expect(elem.querySelector('textarea').value.trim()).toBe('');
    expect(elem.querySelectorAll('p')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-editar')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-eliminar')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-crear')).toHaveLength(1);
    expect(elem.querySelectorAll('#btn-guardar')).toHaveLength(0);
  });

  it('Muestra formulario pre-llenado si editing === true y si hay post', () => {
    const post = {
      text: 'Texto post test',
      dateCreated: {
        toDate: () => new Date(),
      },
    };
    const editing = true;
    const elem = postDetails({ post, editing });

    expect(elem.querySelector('h2').textContent.trim()).toBe('Editar post');
    expect(elem.querySelector('textarea').value.trim()).toBe('Texto post test');
    expect(elem.querySelectorAll('p')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-editar')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-eliminar')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-crear')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-guardar')).toHaveLength(1);
  });

  it('Muestra informacion de edicion si post fue previamente editado', () => {
    const post = {
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
    expect(elem.querySelectorAll('textarea')).toHaveLength(0);
    expect(elem.querySelector('p').textContent.trim()).toBe('Texto post test');
    expect(elem.querySelectorAll('#btn-editar')).toHaveLength(1);
    expect(elem.querySelectorAll('#btn-eliminar')).toHaveLength(1);
    expect(elem.querySelectorAll('#btn-crear')).toHaveLength(0);
    expect(elem.querySelectorAll('#btn-guardar')).toHaveLength(0);
  });
});

// describe('postList', () => {
//   postList;
// });
