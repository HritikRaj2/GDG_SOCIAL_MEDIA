'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import type { Chat, Message } from '@/types';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MessagesPage() {
  const { user } = useAuth();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [content, setContent] = useState('');
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);

  useEffect(() => {
    api
      .get<Chat[]>('/api/chats')
      .then((r) => setChats(r.data))
      .catch(() => toast.error('Failed to load chats'))
      .finally(() => setLoadingChats(false));
  }, []);

  const openChat = async (chat: Chat) => {
    setActiveChat(chat);
    setLoadingMsgs(true);
    try {
      const res = await api.get<Message[]>(`/api/messages/get/chat/${chat.id}`);
      setMessages(res.data);
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoadingMsgs(false);
    }
  };

  const sendMessage = async () => {
    if (!content.trim() || !activeChat) return;
    try {
      const res = await api.post<Message>(
        `/api/messages/chat/${activeChat.id}`,
        { content }
      );
      setMessages((prev) => [...prev, res.data]);
      setContent('');
    } catch {
      toast.error('Failed to send message');
    }
  };

  const getChatName = (chat: Chat) => {
    if (chat.chat_name) return chat.chat_name;
    const other = chat.users.find((u) => u.id !== user?.id);
    return other ? `${other.firstName} ${other.lastName}` : 'Chat';
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-4 h-[calc(100vh-8rem)]">
            {/* Chat list */}
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-y-auto">
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-white font-semibold">Messages</h2>
              </div>
              {loadingChats ? (
                <div className="flex items-center justify-center h-32">
                  <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : chats.length === 0 ? (
                <p className="text-gray-500 text-sm text-center p-4">
                  No chats yet.
                </p>
              ) : (
                chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => openChat(chat)}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-700 transition-colors ${
                      activeChat?.id === chat.id ? 'bg-gray-700' : ''
                    }`}
                  >
                    <p className="text-white text-sm font-medium truncate">
                      {getChatName(chat)}
                    </p>
                  </button>
                ))
              )}
            </div>

            {/* Message area */}
            <div className="col-span-2 bg-gray-800 rounded-xl border border-gray-700 flex flex-col">
              {activeChat ? (
                <>
                  <div className="p-4 border-b border-gray-700">
                    <h3 className="text-white font-semibold">
                      {getChatName(activeChat)}
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {loadingMsgs ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    ) : (
                      messages.map((msg) => {
                        const isMine = msg.user.id === user?.id;
                        return (
                          <div
                            key={msg.id}
                            className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-xs rounded-2xl px-4 py-2 text-sm ${
                                isMine
                                  ? 'bg-purple-600 text-white rounded-br-sm'
                                  : 'bg-gray-700 text-gray-200 rounded-bl-sm'
                              }`}
                            >
                              {msg.content}
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="p-4 border-t border-gray-700 flex gap-2">
                    <input
                      type="text"
                      placeholder="Type a message…"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      className="flex-1 bg-gray-900 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!content.trim()}
                      className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl transition-colors"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center flex-1 text-gray-500">
                  Select a chat to start messaging
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
