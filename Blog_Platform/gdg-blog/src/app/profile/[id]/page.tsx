'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { User, Post } from '@/types';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import toast from 'react-hot-toast';
import { UserPlus, UserMinus, Grid } from 'lucide-react';

function UserProfileContent() {
  const params = useParams();
  const userId = params.id as string;
  const { user: currentUser, updateUser } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [followLoading, setFollowLoading] = useState(false);

  const isFollowing = currentUser?.following?.some((u) => u.id === Number(userId)) ?? false;
  const isOwnProfile = currentUser?.id === Number(userId);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const [userRes, postsRes] = await Promise.all([
        api.get(`/api/user/${userId}`),
        api.get(`/api/posts/user/${userId}`),
      ]);
      setProfileUser(userRes.data);
      setPosts(postsRes.data);
    } catch {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    setFollowLoading(true);
    try {
      await api.put(`/api/user/follow/${userId}`);
      const profileResponse = await api.get('/api/users/profile');
      updateUser(profileResponse.data);
      toast.success(isFollowing ? `Unfollowed ${profileUser?.firstName}` : `Following ${profileUser?.firstName}`);
    } catch {
      toast.error('Failed to update follow status');
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  if (!profileUser) {
    return (
      <>
        <Navbar />
        <div className="text-center py-16">
          <p className="text-gray-400">User not found</p>
        </div>
      </>
    );
  }

  const initials = `${profileUser.firstName?.[0] ?? ''}${profileUser.lastName?.[0] ?? ''}`.toUpperCase();

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
                <h1 className="text-2xl font-bold text-white">{profileUser.firstName} {profileUser.lastName}</h1>
                <p className="text-gray-400">{profileUser.email}</p>
                {profileUser.gender && <p className="text-gray-500 text-sm mt-1 capitalize">{profileUser.gender}</p>}
              </div>
            </div>
            {!isOwnProfile && (
              <button
                onClick={handleFollow}
                disabled={followLoading}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all disabled:opacity-50 ${
                  isFollowing
                    ? 'bg-gray-700 text-gray-300 hover:bg-red-900/30 hover:text-red-400 border border-gray-600 hover:border-red-700'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                }`}
              >
                {followLoading ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : isFollowing ? (
                  <UserMinus className="w-4 h-4" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-6 mt-6 pt-6 border-t border-gray-700">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{posts.length}</p>
              <p className="text-sm text-gray-400">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{profileUser.followers?.length ?? 0}</p>
              <p className="text-sm text-gray-400">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{profileUser.following?.length ?? 0}</p>
              <p className="text-sm text-gray-400">Following</p>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Grid className="w-5 h-5 text-gray-400" />
            <h2 className="text-lg font-semibold text-white">{profileUser.firstName}&apos;s Posts</h2>
          </div>
          {posts.length === 0 ? (
            <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-xl">
              <p className="text-gray-400">No posts yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default function UserProfilePage() {
  return (
    <ProtectedRoute>
      <UserProfileContent />
    </ProtectedRoute>
  );
}
