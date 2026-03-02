'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { ImageIcon, Send, X } from 'lucide-react';
import { Post } from '@/types';

interface CreatePostProps {
  onPostCreated?: (post: Post) => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const { user } = useAuth();
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const getInitials = () =>
    `${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caption.trim() && !imageUrl.trim()) {
      toast.error('Please add a caption or image');
      return;
    }
    setSubmitting(true);
    try {
      const response = await api.post('/api/posts', {
        caption: caption.trim(),
        image: imageUrl.trim() || undefined,
      });
      setCaption('');
      setImageUrl('');
      setShowImageInput(false);
      toast.success('Post created!');
      onPostCreated?.(response.data);
    } catch {
      toast.error('Failed to create post');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {getInitials()}
          </div>
          <div className="flex-1 space-y-3">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder={`What's on your mind, ${user?.firstName}?`}
              rows={3}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-gray-200 placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500 transition-colors"
              disabled={submitting}
            />
            {showImageInput && (
              <div className="flex items-center space-x-2">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL..."
                  className="flex-1 bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-2 text-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  disabled={submitting}
                />
                <button
                  type="button"
                  onClick={() => { setShowImageInput(false); setImageUrl(''); }}
                  className="p-2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setShowImageInput(!showImageInput)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-purple-400 hover:bg-purple-900/20 transition-all"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Add Image</span>
              </button>
              <button
                type="submit"
                disabled={submitting || (!caption.trim() && !imageUrl.trim())}
                className="flex items-center space-x-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Post</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
