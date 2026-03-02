'use client';

import { useState } from 'react';
import Image from 'next/image';
import api from '@/lib/api';
import type { Post, Comment } from '@/types';
import CommentSection from './CommentSection';
import { Heart, Bookmark, MessageCircle, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  post: Post;
  currentUserId: number;
  onPostDeleted: (id: number) => void;
  onPostUpdated: (p: Post) => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function PostCard({
  post,
  currentUserId,
  onPostDeleted,
  onPostUpdated,
}: Props) {
  const [localPost, setLocalPost] = useState<Post>(post);
  const [showComments, setShowComments] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleLike = async () => {
    try {
      const res = await api.put<Post>(`/api/post/like/${localPost.id}`);
      setLocalPost(res.data);
      onPostUpdated(res.data);
    } catch {
      toast.error('Failed to like post');
    }
  };

  const handleSave = async () => {
    try {
      await api.put(`/api/post/${localPost.id}`);
      toast.success(saved ? 'Removed from saved' : 'Post saved!');
      setSaved((v) => !v);
    } catch {
      toast.error('Failed to save post');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/post/${localPost.id}`);
      toast.success('Post deleted');
      onPostDeleted(localPost.id);
    } catch {
      toast.error('Failed to delete post');
    }
  };

  const handleCommentAdded = (c: Comment) => {
    setLocalPost((prev) => ({
      ...prev,
      comments: [...(prev.comments ?? []), c],
    }));
  };

  const initials =
    `${localPost.user.firstName[0]}${localPost.user.lastName[0]}`.toUpperCase();

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {localPost.user.profilePicture ? (
            <Image
              src={localPost.user.profilePicture}
              alt={initials}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
              {initials}
            </div>
          )}
          <div>
            <p className="text-white font-semibold text-sm">
              {localPost.user.firstName} {localPost.user.lastName}
            </p>
            <p className="text-gray-400 text-xs">{formatDate(localPost.createdAt)}</p>
          </div>
        </div>
        {localPost.user.id === currentUserId && (
          <button
            onClick={handleDelete}
            className="text-gray-500 hover:text-red-400 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="px-4 pb-3">
        <p className="text-gray-200 text-sm">{localPost.caption}</p>
      </div>
      {localPost.image && (
        <div className="relative w-full aspect-video">
          <Image
            src={localPost.image}
            alt="post"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 px-4 py-3 border-t border-gray-700">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            localPost.liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
          }`}
        >
          <Heart size={18} fill={localPost.liked ? 'currentColor' : 'none'} />
          <span>{localPost.likes}</span>
        </button>

        <button
          onClick={handleSave}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            saved ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
          }`}
        >
          <Bookmark size={18} fill={saved ? 'currentColor' : 'none'} />
          <span>{saved ? 'Saved' : 'Save'}</span>
        </button>

        <button
          onClick={() => setShowComments((v) => !v)}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-blue-400 transition-colors"
        >
          <MessageCircle size={18} />
          <span>{localPost.comments?.length ?? 0}</span>
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="px-4 pb-4">
          <CommentSection
            postId={localPost.id}
            comments={localPost.comments ?? []}
            onCommentAdded={handleCommentAdded}
          />
        </div>
      )}
    </div>
  );
}
