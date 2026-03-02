'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import type { Post, User } from '@/types';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    gender: user?.gender ?? '',
  });

  useEffect(() => {
    if (!user) return;
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender ?? '',
    });
    api
      .get<Post[]>(`/api/posts/user/${user.id}`)
      .then((r) => setPosts(r.data))
      .catch(() => toast.error('Failed to load posts'))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const handleSave = async () => {
    try {
      const res = await api.put<User>('/api/users', form);
      updateUser(res.data);
      setEditing(false);
      toast.success('Profile updated!');
    } catch {
      toast.error('Failed to update profile');
    }
  };

  const initials = user
    ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    : '?';

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          {/* Profile card */}
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                {initials}
              </div>
              {editing ? (
                <div className="flex-1 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      value={form.firstName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, firstName: e.target.value }))
                      }
                      placeholder="First name"
                      className="bg-gray-900 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      value={form.lastName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, lastName: e.target.value }))
                      }
                      placeholder="Last name"
                      className="bg-gray-900 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <select
                    value={form.gender}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, gender: e.target.value }))
                    }
                    className="bg-gray-900 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                  >
                    <option value="">Select gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              ) : (
                <div>
                  <h2 className="text-white text-xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                  {user?.gender && (
                    <p className="text-gray-500 text-xs mt-1">{user.gender}</p>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-4 text-sm text-gray-400 mb-4">
              <span>
                <span className="text-white font-semibold">
                  {user?.followers.length ?? 0}
                </span>{' '}
                Followers
              </span>
              <span>
                <span className="text-white font-semibold">
                  {user?.following.length ?? 0}
                </span>{' '}
                Following
              </span>
              <span>
                <span className="text-white font-semibold">{posts.length}</span>{' '}
                Posts
              </span>
            </div>
            <div className="flex gap-2">
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* User's posts */}
          <h3 className="text-white font-semibold text-lg">My Posts</h3>
          {loading ? (
            <LoadingSkeleton />
          ) : posts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No posts yet.</p>
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
