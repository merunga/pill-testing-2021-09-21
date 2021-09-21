export const getAllPosts = jest.fn(() => Promise.resolve([]));

export const createPost = jest.fn((text) => Promise.resolve({ text }));

export const updatePost = jest.fn((uid, text) => Promise.resolve({ uid, text }));

export const deletePost = jest.fn((uid) => Promise.resolve({ uid }));
