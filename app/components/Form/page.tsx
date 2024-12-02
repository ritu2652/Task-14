'use client';

import React, { useState } from 'react';

interface PostFormProps {
  onSubmit: (data: { title: string; body: string }) => Promise<void>; // Ensure type matches
  loading: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ title, body });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-amber-50 p-6 rounded-lg shadow-lg border border-amber-200">
      <h2 className="text-2xl font-bold text-amber-800 mb-4">Create Post</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-amber-700">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-amber-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="body" className="block text-amber-700">Body</label>
        <textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border border-amber-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-amber-600 text-white py-2 px-6 rounded-lg disabled:bg-amber-300"
      >
        {loading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
};

export default PostForm;
