import { Post } from '../types/types';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';


export const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data;
};

export const fetchPostById = async (id: number): Promise<Post> => {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();
  return data;
};


export const createPost = async (newPost: { title: string; body: string }): Promise<Post> => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });
  const data = await res.json();
  return data;
};

export const updatePost = async (id: number, updatedPost: { title: string; body: string }): Promise<Post> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost),
  });
  const data = await res.json();
  return data;
};

export const deletePost = async (id: number): Promise<void> => {
  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
};
