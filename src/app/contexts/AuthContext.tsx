import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateUserInfo: (info: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        
        // Fetch fresh profile from API to ensure sync
        const response = await api.get('/auth/profile');
        const userData = response.data;
        const freshUser = {
          id: userData._id || userData.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone || '',
          address: userData.address || '',
          role: userData.role
        };
        setUser(freshUser);
        localStorage.setItem('user', JSON.stringify(freshUser));
      } catch (error) {
        console.error("Failed to authenticate token", error);
        logout();
      }
    }
  };

  const login = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, _id, name, role, phone, address } = response.data;
    
    const userToStore = {
      id: _id || response.data.id || '1',
      name: name || email.split('@')[0],
      email,
      phone: phone || '',
      address: address || '',
      role: role || 'CUSTOMER'
    };

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userToStore));
    localStorage.setItem('userRole', userToStore.role);
    setUser(userToStore);
  };

  const register = async (userData: any) => {
    // Map fullName to name before sending to backend to match authController.js requirements
    const payload = {
      name: userData.fullName || userData.name,
      email: userData.email,
      password: userData.password
    };
    const response = await api.post('/auth/register', payload);
    const { token, _id, name, email, role, phone, address } = response.data;
    
    if (token) {
      localStorage.setItem('token', token);
      const userToStore = {
        id: _id || response.data.id || '1',
        name: name || payload.name,
        email: email || payload.email,
        phone: phone || userData.phone || '',
        address: address || userData.address || '',
        role: role || 'CUSTOMER'
      };
      localStorage.setItem('user', JSON.stringify(userToStore));
      localStorage.setItem('userRole', userToStore.role);
      setUser(userToStore);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  };

  const updateUserInfo = async (info: Partial<User>) => {
    if (user) {
      const response = await api.put('/auth/profile', info);
      const updatedData = response.data;
      
      const updatedUser = {
        ...user,
        name: updatedData.name || user.name,
        phone: updatedData.phone || user.phone,
        address: updatedData.address || user.address,
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateUserInfo
    }}>
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
