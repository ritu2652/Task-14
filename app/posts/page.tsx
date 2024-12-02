'use client';

import React, { useState, useEffect } from 'react';
import { fetchPosts, deletePost } from '../services/api';
import PostList from '../components/page';
import { Post } from '../types/types';

const PostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };
    loadPosts();
  }, []);

  const handleDeletePost = async (id: number) => {
    await deletePost(id);
    setPosts(posts.filter((post) => post.id !== id)); // Remove the deleted post from the state
  };

  return (
    <div className="container bg-amber-50 mx-auto py-8 px-4 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-amber-800">Blog Manager</h1>
      <PostList posts={posts} onDelete={handleDeletePost} />
    </div>
  );
};

export default PostsPage;
