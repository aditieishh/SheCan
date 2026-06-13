import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: 'user' | 'admin') => Promise<boolean>;
  logout: () => void;
  deleteUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Core Mock Users
const INITIAL_USERS: User[] = [
  {
    id: 'u1',
    name: 'Administrator',
    email: 'admin@shecan.org',
    role: 'admin',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'u2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@gmail.com',
    role: 'user',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'u3',
    name: 'Elena Rostova',
    email: 'elena@foundation.org',
    role: 'user',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load users from localStorage
    const savedUsers = localStorage.getItem('she_can_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      localStorage.setItem('she_can_users', JSON.stringify(INITIAL_USERS));
      setUsers(INITIAL_USERS);
    }

    // Load active token session
    const savedToken = localStorage.getItem('she_can_session_token');
    const savedSessionUser = localStorage.getItem('she_can_active_user');
    if (savedToken && savedSessionUser) {
      setUser(JSON.parse(savedSessionUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Look up user
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!foundUser) {
      throw new Error('User not registered or found.');
    }
    
    // Simulate BCrypt matching and generate Mock client-side JWT
    const mockJWT = `mock-jwt-header.${btoa(JSON.stringify(foundUser))}.mock-signature`;
    
    localStorage.setItem('she_can_session_token', mockJWT);
    localStorage.setItem('she_can_active_user', JSON.stringify(foundUser));
    setUser(foundUser);
    return true;
  };

  const register = async (name: string, email: string, password: string, role: 'user' | 'admin' = 'user'): Promise<boolean> => {
    // Minimum check
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Email already registered');
    }

    const newUser: User = {
      id: 'u_' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('she_can_users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('she_can_session_token');
    localStorage.removeItem('she_can_active_user');
    setUser(null);
  };

  const deleteUser = (id: string) => {
    const updatedUsers = users.filter(u => u.id !== id);
    localStorage.setItem('she_can_users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    
    // If deleted self, log out
    if (user && user.id === id) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, users, login, register, logout, deleteUser }}>
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
