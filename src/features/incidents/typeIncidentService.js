import api from '../../services/api';

export const getIncidentTypes = async () => {
  const res = await api.get('/type-incident');
  return Array.isArray(res.data) ? res.data : (res.data.data || []);
};

export const createIncidentType = async (data) => {
  return api.post('/type-incident', data);
};

export const deleteIncidentType = async (id) => {
  return api.delete(`/type-incident/${id}`);
};