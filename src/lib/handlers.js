/* eslint-disable no-alert */

import {
  updatePost,
  createPost,
  deletePost,
} from './data.js';

// eslint-disable-next-line import/no-cycle
import { renderPage, postDetails } from './ui.js';

export const onBtnCrearClick = (e) => {
  e.preventDefault();
  const formElem = e.target.closest('form');
  const textArea = formElem.querySelector('#post-text');
  if (textArea.value.trim()) {
    createPost(textArea.value).then(renderPage);
    textArea.value = '';
  }
};

export const onBtnGuardarClick = (e) => {
  e.preventDefault();
  const formElem = e.target.closest('form');
  const textArea = formElem.querySelector('#post-text');
  const idInput = formElem.querySelector('#post-id');
  if (textArea.value.trim()) {
    updatePost(idInput.value, textArea.value).then(renderPage);
    textArea.value = '';
  }
};

export const onBtnCancelarClick = (e) => {
  e.preventDefault();
  const root = document.getElementById('root');
  const oldForm = root.querySelector('#post-form');
  const newForm = postDetails({ post: null, editing: true });
  oldForm.parentNode.replaceChild(newForm, oldForm);
};

export const onBtnEditarClickCreator = (post) => {
  const onBtnEditarClick = (e) => {
    e.preventDefault();
    const root = document.getElementById('root');
    const oldForm = root.querySelector('#post-form');
    const newForm = postDetails({ post, editing: true });
    oldForm.parentNode.replaceChild(newForm, oldForm);
  };
  return onBtnEditarClick;
};

export const onBtnEliminarClick = (e) => {
  e.preventDefault();
  const result = window.confirm('¿Eliminar?');
  if (result) {
    const formElem = e.target.closest('form');
    const idInput = formElem.querySelector('#post-id');
    deletePost(idInput.value).then(renderPage);
  }
};
