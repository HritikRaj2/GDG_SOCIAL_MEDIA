'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import {
  getToken,
  setToken,
  removeToken,
  getUser,
  setUser,
  removeUser,
} from '@/lib/auth';
import type { User, AuthResponse } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  updateUser: (updated: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = getUser();
    if (stored) setUserState(stored);
    setLoading(false);
  }, []);

  const fetchAndStoreProfile = async (): Promise<User> => {
    const res = await api.get<User>('/api/users/profile');
    setUser(res.data);
    setUserState(res.data);
    return res.data;
  };

  const login = async (email: string, password: string): Promise<void> => {
    const res = await api.post<AuthResponse>('/auth/signin', { email, password });
    setToken(res.data.token);
    await fetchAndStoreProfile();
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<void> => {
    const res = await api.post<AuthResponse>('/auth/signup', {
      firstName,
      lastName,
      email,
      password,
    });
    setToken(res.data.token);
    await fetchAndStoreProfile();
  };

  const logout = (): void => {
    removeToken();
    removeUser();
    setUserState(null);
    router.push('/login');
  };

  const updateUser = (updated: User): void => {
    setUser(updated);
    setUserState(updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
