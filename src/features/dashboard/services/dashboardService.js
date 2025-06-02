import api from '../../../services/api';

export const getIncidentsByPriority = async () => {
  try {
    const response = await api.get('/dashboard/incdents-by-priority');
    return response.data;
  } catch (error) {
    console.error('Error al obtener datos de incidentes por prioridad:', error);
    throw error;
  }
};