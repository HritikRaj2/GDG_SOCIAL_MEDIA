'use client';

import { useState, useEffect } from 'react';
import { Post } from '@/types';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import toast from 'react-hot-toast';
import { Edit3, X, Check, Grid } from 'lucide-react';

function ProfileContent() {
  const { user, updateUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ firstName: '', lastName: '', gender: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserPosts();
      setEditForm({ firstName: user.firstName, lastName: user.lastName, gender: user.gender || '' });
    }
  }, [user]);

  const fetchUserPosts = async () => {
    if (!user) return;
    try {
      const response = await api.get(`/api/posts/user/${user.id}`);
      setPosts(response.data);
    } catch {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const response = await api.put('/api/users', editForm);
      updateUser(response.data);
      setEditModalOpen(false);
      toast.success('Profile updated!');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePostDeleted = (postId: number) => {
    setPosts(posts.filter((p) => p.id !== postId));
  };

  if (!user) return null;

  const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Card */}
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                {initials}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user.firstName} {user.lastName}</h1>
                <p className="text-gray-400">{user.email}</p>
                {user.gender && <p className="text-gray-500 text-sm mt-1 capitalize">{user.gender}</p>}
              </div>
            </div>
            <button
              onClick={() => setEditModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl text-sm font-medium transition-all"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6 mt-6 pt-6 border-t border-gray-700">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{posts.length}</p>
              <p className="text-sm text-gray-400">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{user.followers?.length ?? 0}</p>
              <p className="text-sm text-gray-400">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{user.following?.length ?? 0}</p>
              <p className="text-sm text-gray-400">Following</p>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Grid className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white">Your Posts</h2>
          </div>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-xl">
              <p className="text-gray-400">No posts yet</p>
              <p className="text-gray-500 text-sm mt-1">Share something with your followers!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onDelete={handlePostDeleted} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Edit Profile</h3>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                <input
                  type="text"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                <input
                  type="text"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                <select
                  value={editForm.gender}
                  onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setEditModalOpen(false)}
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl font-medium transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                disabled={saving}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Check className="w-4 h-4" />
                )}
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
