import React, { useState, useEffect } from 'react';
import { clearToken, getToken, isTokenExpired } from './Auth';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    setLoading(true); 
    try {
      if (getToken() && !isTokenExpired()) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        clearToken();
      }
    } catch (error) {
      setIsAuthenticated(false);
      clearToken();
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth(); 
  }, []); 

  return { isAuthenticated, loading, checkAuth };
}
