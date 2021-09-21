/**
 * @jest-environment jsdom
 */

import { render, postDetails } from '../../src/lib/ui';
import { createPost, updatePost, deletePost } from '../../src/lib/data';

jest.mock('../../src/lib/data');
// import { onBtnCrearClick } from '../../src/lib/handlers';

beforeEach(() => {
  document.body.innerHTML = '<div id="root"></div>';
  createPost.mockClear();
  updatePost.mockClear();
  deletePost.mockClear();
});

describe('onBtnCrearClick', () => {
  it('Si el textarea esta vacio, no se ejecuta nada', () => {
    const post = null;
    const editing = true;
    const elem = postDetails({ post, editing });
    // elem.querySelector('textarea').value = ''; // textarea arranca vacio

    elem.querySelector('#btn-crear').dispatchEvent(new Event('click'));

    expect(createPost).not.toHaveBeenCalled();
  });
  it('Si el textarea tiene algo, llama a createPost con ese texto', () => {
    const post = null;
    const editing = true;
    const elem = postDetails({ post, editing });
    elem.querySelector('textarea').value = 'Texto post';

    elem.querySelector('#btn-crear').dispatchEvent(new Event('click'));

    expect(createPost).toHaveBeenCalledWith('Texto post');
  });
});

describe('onBtnGuardarClick', () => {
  it('Llama a updatePost con los valores correctos', () => {
    const post = {
      id: 'id-1',
      text: 'Texto post test',
      dateCreated: {
        toDate: () => new Date(2021, 8, 21, 10, 0, 0),
      },
    };
    const editing = true;
    const elem = postDetails({ post, editing });

    expect(elem.querySelector('input[type=hidden]').value).toBe('id-1');
    expect(elem.querySelector('textarea').value).toBe('Texto post test');

    elem.querySelector('textarea').value = 'Texto post corregido';
    elem.querySelector('#btn-guardar').dispatchEvent(new Event('click'));

    expect(elem.querySelector('input[type=hidden]').value).toBe('id-1');
    expect(elem.querySelector('textarea').value).toBe('');

    expect(updatePost).toHaveBeenCalledWith('id-1', 'Texto post corregido');
  });
  it('Si el textarea esta vacio, no se ejecuta nada', () => {
    const post = {
      id: 'id-1',
      text: 'Texto post test',
      dateCreated: {
        toDate: () => new Date(2021, 8, 21, 10, 0, 0),
      },
    };
    const editing = true;
    const elem = postDetails({ post, editing });
    elem.querySelector('textarea').value = ''; // textarea seteamos como vacio

    elem.querySelector('#btn-guardar').dispatchEvent(new Event('click'));

    expect(createPost).not.toHaveBeenCalled();
  });
});

describe('onBtnCancelarClick', () => {
  it('No se ejecuta nada y el form queda limpio', () => {
    const post = {
      id: 'id-1',
      text: 'Texto post test',
      dateCreated: {
        toDate: () => new Date(2021, 8, 21, 10, 0, 0),
      },
    };
    const editing = true;
    const elem = postDetails({ post, editing });
    render(elem);

    let elemInDom = document.getElementById('root').querySelector('#post-form');

    expect(elemInDom.querySelector('input[type=hidden]').value).toBe('id-1');
    expect(elemInDom.querySelector('textarea').value).toBe('Texto post test');

    elem.querySelector('#btn-cancelar').dispatchEvent(new Event('click'));

    elemInDom = document.getElementById('root').querySelector('#post-form');
    expect(elemInDom.querySelectorAll('input[type=hidden]')).toHaveLength(0);
    expect(elemInDom.querySelector('textarea').value).toBe('');

    expect(createPost).not.toHaveBeenCalled();
    expect(updatePost).not.toHaveBeenCalled();
  });
});

describe('onBtnEditarClick', () => {
  it('Llama a updatePost con los valores correctos', () => {
    const initialDom = postDetails({ post: null, editing: true });
    render(initialDom);

    const post = {
      id: 'id-1',
      text: 'Texto post test',
      dateCreated: {
        toDate: () => new Date(2021, 8, 21, 10, 0, 0),
      },
    };

    let elemInDom = document.getElementById('root').querySelector('#post-form');

    expect(elemInDom.querySelectorAll('input[type=hidden]')).toHaveLength(0);
    expect(elemInDom.querySelector('textarea').value).toBe('');

    const elem = postDetails({ post });
    elem.querySelector('#btn-editar').dispatchEvent(new Event('click'));

    elemInDom = document.getElementById('root').querySelector('#post-form');
    expect(elemInDom.querySelector('input[type=hidden]').value).toBe('id-1');
    expect(elemInDom.querySelector('textarea').value).toBe('Texto post test');
  });
});

describe('onBtnEliminarClick', () => {
  it('Llama a deletePost con los valores correctos', () => {
    const post = {
      id: 'id-1',
      text: 'Texto post test',
      dateCreated: {
        toDate: () => new Date(2021, 8, 21, 10, 0, 0),
      },
    };
    const elem = postDetails({ post });

    // window.confirm = () => true;
    Object.defineProperty(window, 'confirm', {
      writable: true,
      value: jest.fn().mockImplementation(() => true),
    });
    elem.querySelector('#btn-eliminar').dispatchEvent(new Event('click'));

    expect(deletePost).toHaveBeenCalledWith('id-1');
  });

  it('No pasa nada si no se confirma', () => {
    const post = {
      id: 'id-1',
      text: 'Texto post test',
      dateCreated: {
        toDate: () => new Date(2021, 8, 21, 10, 0, 0),
      },
    };
    const elem = postDetails({ post });

    Object.defineProperty(window, 'confirm', {
      writable: true,
      value: jest.fn().mockImplementation(() => false),
    });
    elem.querySelector('#btn-eliminar').dispatchEvent(new Event('click'));

    expect(deletePost).not.toHaveBeenCalled();
  });
});
