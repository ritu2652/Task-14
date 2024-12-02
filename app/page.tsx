'use client';

import React, { useEffect, useState } from 'react';
import { useRouter} from 'next/navigation';
import { fetchPosts, deletePost } from './services/api'; // Adjust as needed
import PostList from './components/page'; // Adjust as needed
import { Post } from './types/types'; // Adjust as needed

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadPosts = async () => {
      const data = await fetchPosts(); // Fetch initial posts
      setPosts(data);
      setLoading(false);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const newPostParam = searchParams.get('newPost');
    if (newPostParam) {
      const newPost = JSON.parse(decodeURIComponent(newPostParam));
      handleAddPost(newPost);
      router.replace('/'); // Remove query param from URL
    }
  }, []);

  const handleAddPost = (newPost: Post) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]); // Prepend the new post
  };

  const handleCreatePostRedirect = () => {
    router.push('/components/Form'); // Redirect to the Post Form page
  };

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post.');
    }
  };

  if (loading) return <p>Loading posts...</p>;

  return (
    <div className="container mx-auto py-8 px-4 bg-amber-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-amber-800">Blog Manager</h1>
      <button
        onClick={handleCreatePostRedirect}
        className="bg-amber-600 text-white py-2 px-6 rounded-lg mb-6 hover:bg-amber-700 transition"
      >
        Create New Post
      </button>
      <PostList posts={posts} onDelete={handleDeletePost} />
    </div>
  );
};

export default HomePage;
