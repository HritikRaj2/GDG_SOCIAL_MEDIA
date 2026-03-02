'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import CreatePost from '@/components/CreatePost';
import PostCard from '@/components/PostCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import type { Post } from '@/types';
import toast from 'react-hot-toast';

export default function FeedPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await api.get<Post[]>('/api/posts');
      setPosts(res.data);
    } catch {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <CreatePost onPostCreated={fetchPosts} />
          {loading ? (
            <LoadingSkeleton />
          ) : posts.length === 0 ? (
            <p className="text-center text-gray-500 py-12">
              No posts yet. Be the first to post!
            </p>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUserId={user?.id ?? 0}
                onPostDeleted={(id) =>
                  setPosts((prev) => prev.filter((p) => p.id !== id))
                }
                onPostUpdated={(updated) =>
                  setPosts((prev) =>
                    prev.map((p) => (p.id === updated.id ? updated : p))
                  )
                }
              />
            ))
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}
