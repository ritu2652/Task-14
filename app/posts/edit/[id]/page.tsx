import React, { useState, useEffect } from 'react';

interface PostFormProps {
  onSubmit: (data: { title: string; body: string }) => Promise<void>;
  initialData?: { title: string; body: string }; // Make initialData optional
  loading: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit, initialData = { title: '', body: '' }, loading }) => {
  const [title, setTitle] = useState<string>(initialData.title);
  const [body, setBody] = useState<string>(initialData.body);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setBody(initialData.body);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, body });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-amber-50 p-6 rounded-lg shadow-lg border border-amber-200">
      <h2 className="text-2xl font-bold text-amber-800 mb-4">Create or Edit Post</h2>
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
        {loading ? 'Saving...' : 'Save Post'}
      </button>
    </form>
  );
};

export default PostForm;
