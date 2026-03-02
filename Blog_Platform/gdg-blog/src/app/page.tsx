'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import CreatePost from '@/components/CreatePost';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ProtectedRoute from '@/components/ProtectedRoute';
import toast from 'react-hot-toast';
import { Newspaper } from 'lucide-react';

function FeedContent() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/api/posts');
      setPosts(response.data);
    } catch {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  const handlePostDeleted = (postId: number) => {
    setPosts(posts.filter((p) => p.id !== postId));
  };

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <CreatePost onPostCreated={handlePostCreated} />
        {loading ? (
          <LoadingSkeleton />
        ) : posts.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gray-800 flex items-center justify-center">
              <Newspaper className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-400 text-lg font-medium">No posts yet</p>
            <p className="text-gray-500 text-sm">Be the first to share something!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handlePostDeleted}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default function Home() {
  return (
    <ProtectedRoute>
      <FeedContent />
    </ProtectedRoute>
  );
}
