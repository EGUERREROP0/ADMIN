import { useState } from 'react';
import { login as loginService } from '../services/authService';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (credentials) => {
    setLoading(true);
    setError('');
    try {
      const user = await loginService(credentials);
      return user;
    } catch (err) {
      console.error('Login error:', err);
      setError('Credenciales incorrectas o error de red.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};