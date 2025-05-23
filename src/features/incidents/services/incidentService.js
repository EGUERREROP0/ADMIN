import api from '../../../services/api';

export const getIncidents = async (params = {}) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const roleId = user?.role_id || user?.user_role?.id;

  let url = '/incident';
  const query = new URLSearchParams(params).toString();
  if (query) url += `?${query}`;

  if (roleId === 3) {
    const response = await api.get(url);
    return Array.isArray(response.data.allIncidents) ? response.data.allIncidents : [];
  } else if (roleId === 2) {
    const response = await api.get('/admin');
    return Array.isArray(response.data.incidents) ? response.data.incidents : [];
  }
  return [];
};

export const getIncidentStatuses = async () => {
  const response = await api.get('/incident-status');
  return Array.isArray(response.data) ? response.data : [];
};

export const updateIncidentStatus = async (incidentId, statusId, coment = '') => {
  return api.put(`/incident/${incidentId}/status`, {
    status_id: statusId,
    coment
  });
};

export const getIncidentTypes = async () => {
  const response = await api.get('/type-incident');
  return Array.isArray(response.data) ? response.data : [];
};

export const deleteIncident = async (incidentId) => {
  return api.delete(`/incident/${incidentId}`);
};