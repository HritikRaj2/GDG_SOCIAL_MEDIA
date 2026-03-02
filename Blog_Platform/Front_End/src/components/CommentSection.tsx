'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import type { Comment } from '@/types';
import { Heart, Send } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  postId: number;
  comments: Comment[];
  onCommentAdded: (c: Comment) => void;
}

export default function CommentSection({ postId, comments, onCommentAdded }: Props) {
  const [content, setContent] = useState('');
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const handlePost = async () => {
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await api.post<Comment>(`/api/comments/post/${postId}`, {
        content,
      });
      setLocalComments((prev) => [...prev, res.data]);
      onCommentAdded(res.data);
      setContent('');
    } catch {
      toast.error('Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  const handleLikeComment = async (commentId: number) => {
    try {
      const res = await api.put<Comment>(`/api/comments/like/${commentId}`);
      setLocalComments((prev) =>
        prev.map((c) => (c.id === commentId ? res.data : c))
      );
    } catch {
      toast.error('Failed to like comment');
    }
  };

  return (
    <div className="mt-3 space-y-2">
      {localComments.map((c) => (
        <div key={c.id} className="flex items-start gap-2 text-sm">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {c.user.firstName[0]}
          </div>
          <div className="flex-1 bg-gray-700 rounded-lg px-3 py-2">
            <span className="font-semibold text-white">
              {c.user.firstName} {c.user.lastName}
            </span>
            <p className="text-gray-300 mt-0.5">{c.content}</p>
          </div>
          <button
            onClick={() => handleLikeComment(c.id)}
            className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors shrink-0 mt-1"
          >
            <Heart size={14} />
            <span>{c.liked.length}</span>
          </button>
        </div>
      ))}

      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Add a comment…"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handlePost()}
          className="flex-1 bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
        />
        <button
          onClick={handlePost}
          disabled={loading || !content.trim()}
          className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-3 py-2 rounded-lg transition-colors"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
