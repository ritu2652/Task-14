'use client';

import React from 'react';
import { Post } from '../types/types';

interface PostListProps {
  posts: Post[];
  onDelete: (id: number) => Promise<void>;
}

const PostList: React.FC<PostListProps> = ({ posts, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {posts.map((post) => (
      <div key={post.id} className="bg-amber-50 p-6 rounded-lg shadow-lg border border-amber-200 flex flex-col">
        <h3 className="text-xl font-bold text-amber-800">{post.title}</h3>
        <p className="text-amber-700 flex-grow">{post.body.slice(0, 100)}...</p>
        <div className="flex space-x-4 mt-3 pt-3 border-t border-amber-200">
          <a
            href={`/posts/${post.id}`}
            className="text-amber-600 hover:text-amber-800 font-medium"
          >
            View More
          </a>
          <button
            onClick={() => onDelete(post.id)}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
  
  
  );
};

export default PostList;
