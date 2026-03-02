'use client';

import { useState } from 'react';
import { Post } from '@/types';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Heart, MessageCircle, Bookmark, Trash2 } from 'lucide-react';
import CommentSection from './CommentSection';

interface PostCardProps {
  post: Post;
  onDelete?: (postId: number) => void;
  onUpdate?: (post: Post) => void;
}

export default function PostCard({ post, onDelete, onUpdate }: PostCardProps) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isOwnPost = user?.id === post.user.id;

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    } catch {
      return dateStr;
    }
  };

  const handleLike = async () => {
    try {
      await api.put(`/api/post/like/${post.id}`);
      setLiked(!liked);
      setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    } catch {
      toast.error('Failed to like post');
    }
  };

  const handleSave = async () => {
    try {
      await api.put(`/api/post/${post.id}`);
      setSaved(!saved);
      toast.success(saved ? 'Post unsaved' : 'Post saved!');
    } catch {
      toast.error('Failed to save post');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setDeleting(true);
    try {
      await api.delete(`/api/post/${post.id}`);
      toast.success('Post deleted');
      onDelete?.(post.id);
    } catch {
      toast.error('Failed to delete post');
      setDeleting(false);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-gray-600 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Link href={`/profile/${post.user.id}`} className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
            {getInitials(post.user.firstName, post.user.lastName)}
          </div>
          <div>
            <p className="font-semibold text-white group-hover:text-purple-400 transition-colors">
              {post.user.firstName} {post.user.lastName}
            </p>
            <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
          </div>
        </Link>
        {isOwnPost && (
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-all disabled:opacity-50"
          >
            {deleting ? (
              <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Caption */}
      {post.caption && (
        <p className="text-gray-200 mb-4 leading-relaxed">{post.caption}</p>
      )}

      {/* Image */}
      {post.image && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img
            src={post.image}
            alt="Post image"
            className="w-full max-h-96 object-cover rounded-lg"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center space-x-2 pt-3 border-t border-gray-700">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            liked
              ? 'text-red-400 bg-red-900/20 hover:bg-red-900/30'
              : 'text-gray-400 hover:text-red-400 hover:bg-red-900/10'
          }`}
        >
          <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
          <span>{likesCount}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            showComments
              ? 'text-blue-400 bg-blue-900/20 hover:bg-blue-900/30'
              : 'text-gray-400 hover:text-blue-400 hover:bg-blue-900/10'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>Comment</span>
        </button>
        <button
          onClick={handleSave}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ml-auto ${
            saved
              ? 'text-yellow-400 bg-yellow-900/20 hover:bg-yellow-900/30'
              : 'text-gray-400 hover:text-yellow-400 hover:bg-yellow-900/10'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Comments */}
      {showComments && <CommentSection postId={post.id} />}
    </div>
  );
}
