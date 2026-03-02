'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse } from '@/types';
import { getToken, setToken, removeToken, getUser, setUser, removeUser } from '@/lib/auth';
import api from '@/lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      const savedUser = getUser();
      if (token && savedUser) {
        setUserState(savedUser);
        try {
          const response = await api.get('/api/users/profile');
          setUserState(response.data);
          setUser(response.data);
        } catch {
          removeToken();
          removeUser();
          setUserState(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.post<AuthResponse>('/auth/signin', { email, password });
    const { token } = response.data;
    setToken(token);
    const profileResponse = await api.get('/api/users/profile');
    setUser(profileResponse.data);
    setUserState(profileResponse.data);
  };

  const logout = () => {
    removeToken();
    removeUser();
    setUserState(null);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    await api.post<AuthResponse>('/auth/signup', { firstName, lastName, email, password });
  };

  const updateUser = (updatedUser: User) => {
    setUserState(updatedUser);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
