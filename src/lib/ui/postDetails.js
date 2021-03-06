import { renderPage } from './utils.js';
import { createPost, updatePost, deletePost } from '../data.js';

const postDetails = (props) => {
  const { post, editing } = props;

  const newPost = !post && editing;
  const editPost = post && editing;
  const showPost = post && !editing;
  const noShow = !post && !editing;

  const formElem = document.createElement('form');
  formElem.classList.add('mt-2');
  if (newPost || editPost) {
    formElem.id = 'post-form';
  }

  const btnClasses = 'my-6 mx-1 w-full border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

  if (!noShow) {
    formElem.innerHTML = `
      <h2 class="text-lg font-medium text-gray-900">
        ${newPost ? 'Nuevo post' : ''}
        ${editPost ? 'Editar post' : ''}
        ${showPost
    ? `Post creado el ${post.dateCreated.toDate().toISOString().slice(0, 16).replace('T', ' a las ')}
            ${post && post.dateLastEdited
    ? `<br /><small class="text-sm">Última edición: ${post.dateLastEdited.toDate().toISOString().slice(0, 16).replace('T', ' a las ')}</small>`
    : ''
}
            `
    : ''
}
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
      `<p class="mt-6 w-full p-1 text-xl">${post && post.text}</p>`
    )
}


      <div class="flex">
        ${newPost ? `<button id="btn-crear" class="${btnClasses} bg-indigo-600 hover:bg-indigo-700 text-white">Crear</button>` : ''}
        ${editPost ? `<button id="btn-guardar" class="${btnClasses} bg-indigo-600 hover:bg-indigo-700 text-white">Guardar</button>` : ''}
        ${editPost ? `<button id="btn-cancelar" class="${btnClasses} bg-gray-300 hover:bg-gray-400 text-black">Cancelar</button>` : ''}
        ${showPost ? `<button id="btn-editar" class="${btnClasses} bg-gray-300 hover:bg-gray-400 text-black">Editar</button>` : ''}
        ${showPost ? `<button id="btn-eliminar" class="${btnClasses} bg-gray-300 hover:bg-gray-400 text-black">Eliminar</button>` : ''}
      </div>
    `;

    if (newPost) {
      formElem.querySelector('#btn-crear').addEventListener('click', (e) => {
        e.preventDefault();
        const textArea = formElem.querySelector('#post-text');
        if (textArea.value.trim()) {
          createPost(textArea.value).then(renderPage);
          textArea.value = '';
        }
      });
    }

    if (editPost) {
      formElem.querySelector('#btn-guardar').addEventListener('click', (e) => {
        e.preventDefault();
        const textArea = formElem.querySelector('#post-text');
        const idInput = formElem.querySelector('#post-id');
        if (textArea.value.trim()) {
          updatePost(idInput.value, textArea.value).then(renderPage);
          textArea.value = '';
        }
      });
      formElem.querySelector('#btn-cancelar').addEventListener('click', (e) => {
        e.preventDefault();
        const root = document.getElementById('root');
        const oldForm = root.querySelector('#post-form');
        const newForm = postDetails({ post: null, editing: true });
        oldForm.parentNode.replaceChild(newForm, oldForm);
      });
    }

    if (showPost) {
      formElem.querySelector('#btn-editar').addEventListener('click', (e) => {
        e.preventDefault();
        const root = document.getElementById('root');
        const oldForm = root.querySelector('#post-form');
        const newForm = postDetails({ post, editing: true });
        oldForm.parentNode.replaceChild(newForm, oldForm);
      });
      formElem.querySelector('#btn-eliminar').addEventListener('click', (e) => {
        e.preventDefault();
        const result = window.confirm('¿Eliminar?');
        if (result) {
          const idInput = formElem.querySelector('#post-id');
          deletePost(idInput.value).then(renderPage);
        }
      });
    }
  }
  return formElem;
};

export default postDetails;
