'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import UserCard from '@/components/UserCard';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import type { User } from '@/types';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
}

export default function SearchPage() {
  const { user, updateUser } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserResponse[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await api.get<UserResponse[]>('/api/users/search', {
        params: { query },
      });
      setResults(res.data);
      setSearched(true);
    } catch {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const refreshUserProfile = async (userId: number) => {
    try {
      const res = await api.get<User>('/api/users/profile');
      updateUser(res.data);
    } catch {
      toast.error('Failed to refresh profile');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-6 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search users…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 border border-gray-700"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors"
            >
              {loading ? '…' : 'Search'}
            </button>
          </form>

          {searched && results.length === 0 && (
            <p className="text-center text-gray-500 py-8">No users found.</p>
          )}

          <div className="space-y-3">
            {user &&
              results
                .filter((u) => u.id !== user.id)
                .map((u) => (
                  <UserCard
                    key={u.id}
                    user={u}
                    currentUser={user}
                    onFollowToggle={refreshUserProfile}
                  />
                ))}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
