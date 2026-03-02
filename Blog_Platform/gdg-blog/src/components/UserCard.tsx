'use client';

import { useState } from 'react';
import { User } from '@/types';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { UserPlus, UserMinus } from 'lucide-react';

interface UserCardProps {
  user: User;
  onFollowChange?: () => void;
}

export default function UserCard({ user, onFollowChange }: UserCardProps) {
  const { user: currentUser, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const isFollowing = currentUser?.following?.some((u) => u.id === user.id) ?? false;

  const handleFollow = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      await api.put(`/api/user/follow/${user.id}`);
      const profileResponse = await api.get('/api/users/profile');
      updateUser(profileResponse.data);
      toast.success(isFollowing ? `Unfollowed ${user.firstName}` : `Following ${user.firstName}`);
      onFollowChange?.();
    } catch {
      toast.error('Failed to update follow status');
    } finally {
      setLoading(false);
    }
  };

  const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();
  const isCurrentUser = currentUser?.id === user.id;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 border border-gray-700 rounded-xl hover:border-gray-600 transition-all">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-white">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>
      {!isCurrentUser && (
        <button
          onClick={handleFollow}
          disabled={loading}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 ${
            isFollowing
              ? 'bg-gray-700 text-gray-300 hover:bg-red-900/30 hover:text-red-400 border border-gray-600 hover:border-red-700'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
          }`}
        >
          {loading ? (
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
  );
}
