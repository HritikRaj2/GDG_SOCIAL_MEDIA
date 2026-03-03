'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Home, Search, User, LogOut, Menu, X, Sparkles, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: <Home size={18} /> },
    { href: '/search', label: 'Search', icon: <Search size={18} /> },
    { href: '/messages', label: 'Messages', icon: <MessageCircle size={18} /> },
    { href: '/profile', label: 'Profile', icon: <User size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur border-b border-gray-700">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-bold text-white text-lg">GDG Social</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-sm"
            >
              {l.icon}
              {l.label}
            </Link>
          ))}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 text-gray-300 hover:text-red-400 transition-colors text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-900 border-t border-gray-700 px-4 py-3 space-y-2">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-gray-300 hover:text-white py-2 text-sm"
            >
              {l.icon}
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => { setOpen(false); logout(); }}
            className="flex items-center gap-2 text-gray-300 hover:text-red-400 py-2 text-sm w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
