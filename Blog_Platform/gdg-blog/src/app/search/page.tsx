'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import api from '@/lib/api';
import Navbar from '@/components/Navbar';
import UserCard from '@/components/UserCard';
import ProtectedRoute from '@/components/ProtectedRoute';
import toast from 'react-hot-toast';
import { Search, Users } from 'lucide-react';

function SearchContent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await api.get('/api/allusers');
      setAllUsers(response.data);
      setResults(response.data);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setInitialLoading(false);
    }
  };

  const searchUsers = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(allUsers);
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(`/api/users/search?query=${encodeURIComponent(searchQuery)}`);
      setResults(response.data);
    } catch {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  }, [allUsers]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchUsers(query);
    }, 400);
    return () => clearTimeout(debounceTimer);
  }, [query, searchUsers]);

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">Find People</h1>
          <p className="text-gray-400">Search and connect with other members</p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          {loading && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>

        {/* Results */}
        {initialLoading ? (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-xl space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-gray-700 flex items-center justify-center">
              <Users className="w-6 h-6 text-gray-500" />
            </div>
            <p className="text-gray-400">No users found</p>
            {query && <p className="text-gray-500 text-sm">Try a different search term</p>}
          </div>
        ) : (
          <div className="space-y-3">
            {!query && (
              <p className="text-sm text-gray-500">{results.length} members in the community</p>
            )}
            {results.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default function SearchPage() {
  return (
    <ProtectedRoute>
      <SearchContent />
    </ProtectedRoute>
  );
}
