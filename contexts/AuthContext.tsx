'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { authenticateTelegram, verifyToken } from '../utils/api';

interface User {
  id: string;
  telegramId: string;
  firstName: string;
  lastName?: string;
  username?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (initData: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing token and verify it
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      verifyToken(storedToken)
        .then((isValid) => {
          if (!isValid) {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          } else {
            setToken(storedToken);
            // Could also fetch user data here if needed
          }
        })
        .catch(() => {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (initData: string) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await authenticateTelegram(initData);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('token', response.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
