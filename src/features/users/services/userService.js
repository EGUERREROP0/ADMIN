import api from '../../../services/api';

export const getUsers = async (search = '') => {
  const url = search
    ? `/user?page=1&limit=10&search=${encodeURIComponent(search)}`
    : '/user?page=1&limit=10';
  const response = await api.get(url);
  return response.data.users;
};

export const convertToAdmin = async (id) => {
  return api.put(`/user/convert_to_admin/${id}`);
};

export const getIncidentTypes = async () => {
  const response = await api.get('/type-incident');
  return Array.isArray(response.data) ? response.data : [];
};

export const assignIncidentTypeToAdmin = async (adminId, incidentTypeId) => {
  return api.post(`/admin/${adminId}`, { incident_type_id: incidentTypeId });
};

export const deleteUser = async (id) => {
  return api.delete(`/user/${id}`);
};