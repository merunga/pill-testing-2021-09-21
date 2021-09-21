import { getAllPosts } from '../data.js';

import postDetails from './postDetails.js';
import postList from './postList.js';

export const render = (...components) => {
  const root = document.getElementById('root');
  root.innerHTML = '<div class="max-w-lg mx-auto w-full"></div>';
  const container = root.firstChild;
  components.forEach((c) => {
    container.appendChild(c);
  });
  return root;
};

export const renderPage = () => getAllPosts().then((posts) => {
  const domNewPost = postDetails({ item: null, editing: true });
  const domPostList = postList({ posts });
  return render(domNewPost, domPostList);
});
