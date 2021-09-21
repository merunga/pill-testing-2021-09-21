export const getAllPosts = () => {
  const firestore = window.firebaseApp.firestore();
  return firestore.collection('posts').get()
    .then((querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        const post = doc.data();
        post.id = doc.id;
        posts.push(post);
      });
      return posts;
    });
};

export const createPost = (text) => {
  const firestore = window.firebaseApp.firestore();
  return firestore.collection('posts').doc().set({
    text,
    dateCreated: new Date(),
  });
};

export const updatePost = (uid, text) => {
  const firestore = window.firebaseApp.firestore();
  return firestore.collection('posts').doc(uid).update({
    text,
    dateLastEdited: new Date(),
  });
};

export const deletePost = (uid) => {
  const firestore = window.firebaseApp.firestore();
  return firestore.collection('posts').doc(uid).delete();
};
