'use client';

import { useState } from 'react';
import api from '@/lib/api';
import type { Post } from '@/types';
import { ImageIcon, Send } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  onPostCreated: () => void;
}

export default function CreatePost({ onPostCreated }: Props) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim()) return;
    setLoading(true);
    try {
      await api.post<Post>('/api/posts', { caption, image: image || undefined });
      setCaption('');
      setImage('');
      toast.success('Post created!');
      onPostCreated();
    } catch {
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 rounded-xl p-4 space-y-3 border border-gray-700"
    >
      <textarea
        className="w-full bg-gray-900 text-white rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
        rows={3}
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <div className="flex items-center gap-2">
        <ImageIcon size={18} className="text-gray-400" />
        <input
          type="url"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="flex-1 bg-gray-900 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading || !caption.trim()}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <Send size={16} />
          {loading ? 'Posting…' : 'Post'}
        </button>
      </div>
    </form>
  );
}
