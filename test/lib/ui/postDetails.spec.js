/**
 * @jest-environment jsdom
 */
import { render } from '../../../src/lib/ui/utils';
import postDetails from '../../../src/lib/ui/postDetails';
import { createPost, updatePost, deletePost } from '../../../src/lib/data';

jest.mock('../../../src/lib/data');

describe('postDetails UI', () => {
  it('Si no hay post y no editing === true no muestra nada', () => {
    const elem = postDetails({ post: null });
    expect(elem.innerHTML).toBe('');
  });
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

describe('postDetails Events', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    createPost.mockClear();
    updatePost.mockClear();
    deletePost.mockClear();
  });

  it('Crear: Si el textarea esta vacio, no se ejecuta nada', () => {
    const post = null;
    const editing = true;
    const elem = postDetails({ post, editing });
    // elem.querySelector('textarea').value = ''; // textarea arranca vacio

    elem.querySelector('#btn-crear').dispatchEvent(new Event('click'));

    expect(createPost).not.toHaveBeenCalled();
  });
  it('Crear: Si el textarea tiene algo, llama a createPost con ese texto', () => {
    const post = null;
    const editing = true;
    const elem = postDetails({ post, editing });
    elem.querySelector('textarea').value = 'Texto post';

    elem.querySelector('#btn-crear').dispatchEvent(new Event('click'));

    expect(createPost).toHaveBeenCalledWith('Texto post');
  });

  it('Guardar: Llama a updatePost con los valores correctos', () => {
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
  it('Guardar: Si el textarea esta vacio, no se ejecuta nada', () => {
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

  it('Cancelar: No se ejecuta nada y el form queda limpio', () => {
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

  it('Editar: rellena el formulario', () => {
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

  it('Eliminar: Llama a deletePost con los valores correctos', () => {
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

  it('Eliminar: No pasa nada si no se confirma', () => {
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
