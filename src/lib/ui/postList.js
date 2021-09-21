/* eslint-disable indent */

import postDetails from './postDetails.js';

const postList = (props) => {
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
    li.outerHTML = '<li class="flex py-1"></li>';
    li.appendChild(postDetails({ post: p }));
    ul.appendChild(li);
  });
  return divElem;
};

export default postList;
