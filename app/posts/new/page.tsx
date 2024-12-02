'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '../../services/api';
import PostForm from '@/app/components/Form/page';

const AddPostPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreatePost = async (data: { title: string; body: string }) => {
    setLoading(true);
    try {
      await createPost(data);
      alert('Post created successfully!');
      router.push('/posts'); // Navigate back to the posts page
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 bg-amber-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-amber-800">Add New Post</h1>
      <PostForm onSubmit={handleCreatePost} loading={loading} />
    </div>
  );
};

export default AddPostPage;
