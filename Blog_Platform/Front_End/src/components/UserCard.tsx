'use client';

import { useState } from 'react';
import api from '@/lib/api';
import type { User } from '@/types';
import toast from 'react-hot-toast';

interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
}

interface Props {
  user: UserResponse;
  currentUser: User;
  onFollowToggle: (userId: number) => void;
}

export default function UserCard({ user, currentUser, onFollowToggle }: Props) {
  const isFollowing = currentUser.following.includes(user.id);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      await api.put(`/api/user/follow/${user.id}`);
      onFollowToggle(user.id);
    } catch {
      toast.error('Failed to update follow status');
    } finally {
      setLoading(false);
    }
  };

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

  return (
    <div className="flex items-center justify-between bg-gray-800 rounded-xl p-4 border border-gray-700">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
          {initials}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-400 text-xs">{user.email}</p>
        </div>
      </div>
      <button
        onClick={handleFollow}
        disabled={loading}
        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
          isFollowing
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            : 'bg-purple-600 text-white hover:bg-purple-700'
        }`}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
}
