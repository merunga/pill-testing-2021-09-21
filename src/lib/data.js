export const firestoreSnapshotToArray = (querySnapshot) => {
  const posts = [];
  querySnapshot.forEach((doc) => {
    const post = doc.data();
    post.id = doc.id;
    posts.push(post);
  });
  return posts;
};

export const buildCreatePost = (text) => ({
  text,
  dateCreated: new Date(Date.now()),
});

export const buildUpdatePost = (text) => ({
  text,
  dateLastEdited: new Date(Date.now()),
});

export const getAllPosts = () => {
  const firestore = window.firebaseApp.firestore();
  return firestore.collection('posts').get().then(firestoreSnapshotToArray);
};

export const createPost = (text) => {
  const firestore = window.firebaseApp.firestore();
  return firestore.collection('posts').doc().set(buildCreatePost(text));
};

export const updatePost = (uid, text) => {
  const firestore = window.firebaseApp.firestore();
  return firestore.collection('posts').doc(uid).update(buildUpdatePost(text));
};

export const deletePost = (uid) => {
  const firestore = window.firebaseApp.firestore();
  return firestore.collection('posts').doc(uid).delete();
};
