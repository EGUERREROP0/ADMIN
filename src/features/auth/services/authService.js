import api from '../../../services/api';

export const login = async ({ email, password }) => {
  const response = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));
  return response.data;
};

