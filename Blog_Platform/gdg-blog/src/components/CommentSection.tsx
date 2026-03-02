'use client';

import { useState } from 'react';
import { Comment } from '@/types';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import toast from 'react-hot-toast';
import { Heart, Send } from 'lucide-react';

interface CommentSectionProps {
  postId: number;
  initialComments?: Comment[];
}

export default function CommentSection({ postId, initialComments = [] }: CommentSectionProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    setSubmitting(true);
    try {
      const response = await api.post(`/api/comments/post/${postId}`, { content: newComment.trim() });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch {
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikeComment = async (commentId: number) => {
    try {
      await api.put(`/api/comments/like/${commentId}`);
      setComments(comments.map((c) =>
        c.id === commentId
          ? { ...c, liked: !c.liked, likes: (c.likes ?? 0) + (c.liked ? -1 : 1) }
          : c
      ));
    } catch {
      toast.error('Failed to like comment');
    }
  };

  const getInitials = (firstName: string, lastName: string) =>
    `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <div className="mt-4 space-y-3 border-t border-gray-700 pt-4">
      {comments.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-2">No comments yet. Be the first!</p>
      ) : (
        <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                {getInitials(comment.user.firstName, comment.user.lastName)}
              </div>
              <div className="flex-1 bg-gray-700/50 rounded-lg px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-200">
                    {comment.user.firstName} {comment.user.lastName}
                  </span>
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className={`flex items-center space-x-1 text-xs transition-colors ${
                      comment.liked ? 'text-red-400' : 'text-gray-500 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-3 h-3 ${comment.liked ? 'fill-current' : ''}`} />
                    {comment.likes !== undefined && comment.likes > 0 && (
                      <span>{comment.likes}</span>
                    )}
                  </button>
                </div>
                <p className="text-sm text-gray-300 mt-0.5">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {user && (
        <form onSubmit={handleSubmitComment} className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {getInitials(user.firstName, user.lastName)}
          </div>
          <div className="flex-1 flex items-center bg-gray-700/50 rounded-full border border-gray-600 focus-within:border-purple-500 transition-colors">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-transparent px-4 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none"
              disabled={submitting}
            />
            <button
              type="submit"
              disabled={!newComment.trim() || submitting}
              className="p-2 mr-1 text-purple-400 hover:text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? (
                <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
