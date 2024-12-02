import React, { createContext, useState, useCallback } from 'react';
import {BASE_URL, requestFromApi} from '../utils/api'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));
  const [user, setUser] = useState(null); 

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return;

    try {
      const data = await requestFromApi(`${BASE_URL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: refreshToken }),
      });

      if (data.success) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        window.location.href = '/login';
      }
    } catch (error) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setIsAuthenticated(false);
      window.location.href = '/login';
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, refreshAccessToken, user }}>
      {children}
    </AuthContext.Provider>
  );
};
