import axios from 'axios';

export const getIncidentsByPriority = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(
    '/api/v1/dashboard/incdents-by-priority', //parece que hay error tipográfico
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};


