/* eslint-disable indent */
/* eslint-disable no-use-before-define */
/* eslint-disable no-alert */

import {
 getAllPosts, createPost, updatePost, deletePost,
} from './data.js';

const render = (...components) => {
  const root = document.getElementById('root');
  root.innerHTML = '<div class="max-w-lg mx-auto w-full"></div>';
  const container = root.firstChild;
  components.forEach((c) => {
    container.appendChild(c);
  });
};

export const postDetails = (props) => {
  const { post, editing } = props;

  const newPost = !post && editing;
  const editPost = post && editing;
  const showPost = post && !editing;
  const noShow = !post && !editing;

  const divElem = document.createElement('div');

  const btnClasses = 'my-6 mx-1 w-full border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

  if (!noShow) {
    divElem.innerHTML = `
      <form ${newPost || editPost ? 'id="post-form"' : ''} class="mt-6">
        <h2 class="text-lg font-medium text-gray-900">
          ${newPost ? 'Nuevo post' : ''}
          ${editPost ? 'Editar post' : ''}
          ${showPost ? `Post del ${post.dateCreated.toDate().toISOString().slice(0, 10)}` : ''}
        </h2>

        ${post && post.id
          ? `<input id="post-id" type="hidden" value="${post.id}"></input>`
          : ''
        }
        ${editing
          ? (`
            <textarea id="post-text" name="post-text"
              class="mt-6 block w-full border-gray-300 rounded-xs p-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >${(post && post.text) || ''}</textarea>`
          )
          : (
            `<p class="mt-6 w-full p-1">${post && post.text}</p>`
          )
        }


        <div class="flex">
          ${newPost ? `<button id="btn-crear" class="${btnClasses} bg-indigo-600 hover:bg-indigo-700 text-white">Crear</button>` : ''}
          ${editPost ? `<button id="btn-guardar" class="${btnClasses} bg-indigo-600 hover:bg-indigo-700 text-white">Guardar</button>` : ''}
          ${editPost ? `<button id="btn-cancelar" class="${btnClasses} bg-gray-300 hover:bg-gray-400 text-black">Cancelar</button>` : ''}
          ${showPost ? `<button id="btn-editar" class="${btnClasses} bg-gray-300 hover:bg-gray-400 text-black">Editar</button>` : ''}
          ${showPost ? `<button id="btn-eliminar" class="${btnClasses} bg-gray-300 hover:bg-gray-400 text-black">Eliminar</button>` : ''}
        </div>
      </form>
    `;

    if (newPost) {
      divElem.querySelector('#btn-crear').addEventListener('click', (e) => {
        e.preventDefault();
        const textArea = divElem.querySelector('#post-text');
        if (textArea.value.trim()) {
          createPost(textArea.value).then(renderAll);
          textArea.value = '';
        }
      });
    }

    if (editPost) {
      divElem.querySelector('#btn-guardar').addEventListener('click', (e) => {
        e.preventDefault();
        const textArea = divElem.querySelector('#post-text');
        const idInput = divElem.querySelector('#post-id');
        if (textArea.value.trim()) {
          updatePost(idInput.value, textArea.value).then(renderAll);
          textArea.value = '';
        }
      });
      divElem.querySelector('#btn-cancelar').addEventListener('click', (e) => {
        e.preventDefault();
        const root = document.getElementById('root');
        const oldForm = root.querySelector('#post-form');
        const newForm = postDetails({ post: null, editing: true });
        oldForm.parentNode.replaceChild(newForm, oldForm);
      });
    }

    if (showPost) {
      divElem.querySelector('#btn-editar').addEventListener('click', (e) => {
        e.preventDefault();
        const root = document.getElementById('root');
        const oldForm = root.querySelector('#post-form');
        const newForm = postDetails({ post, editing: true });
        oldForm.parentNode.replaceChild(newForm, oldForm);
      });
      divElem.querySelector('#btn-eliminar').addEventListener('click', (e) => {
        e.preventDefault();
        const result = window.confirm('¿Eliminar?');
        if (result) {
          const idInput = divElem.querySelector('#post-id');
          deletePost(idInput.value).then(renderAll);
        }
      });
    }
  }
  return divElem;
};

export const postList = (props) => {
  const { posts } = props;

  const divElem = document.createElement('div');
  divElem.innerHTML = `
    <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Posts</h1>
    ${posts && posts.length
      ? (
        `<ul role="list" class="border-t border-b border-gray-200 divide-y divide-gray-200">
        </ul>`
      )
      : (
        '<p class="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">No hay posts</p>'
      )
    }
  `;

  const ul = divElem.querySelector('ul');
  posts.forEach((p) => {
    const li = document.createElement('li');
    li.innerHTML = '<li class="flex py-1"></li>';
    li.appendChild(postDetails({ post: p }));
    ul.appendChild(li);
  });
  return divElem;
};

export const renderAll = () => {
  getAllPosts().then((posts) => {
    const domNewPost = postDetails({ item: null, editing: true });
    const domPostList = postList({ posts });
    render(domNewPost, domPostList);
  });
};
