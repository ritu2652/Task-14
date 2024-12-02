'use client';

import React, { useState, useEffect } from 'react';
import { fetchPostById } from '../../services/api'; 
import { Post } from '../../types/types'; 

const PostDetailsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState<number | null>(null);

  useEffect(() => {
    // Unwrap the params promise
    params.then((resolvedParams) => {
      const id = Number(resolvedParams.id);
      setPostId(id);
    });
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      if (postId) {
        const postData = await fetchPostById(postId);
        setPost(postData);
      }
      setLoading(false);
    };

    if (postId !== null) {
      fetchData();
    }
  }, [postId]);

  if (loading) return <p className="text-amber-700">Loading...</p>;
  if (!post) return <p className="text-amber-700">Post not found.</p>;

  return (
    <div className="container mx-auto py-8 px-4 bg-amber-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-amber-800">{post.title}</h1>
      <p className="text-amber-700">{post.body}</p>
    </div>
  );
};

export default PostDetailsPage;
