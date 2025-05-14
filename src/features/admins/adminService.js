import api from '../../services/api';

export const getAdmins = async () => {
  const res = await api.get('/user');
  return Array.isArray(res.data?.users) ? res.data.users : [];
};

export const createAdmin = async (data) => {
  return api.post('/auth/register-admin', data);
};