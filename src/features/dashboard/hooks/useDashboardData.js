import { useState, useEffect, useRef } from 'react';
import { getIncidents } from '../../incidents/services/incidentService';
import { getIncidentsByPriority } from '../services/dashboardService';

export const useDashboardData = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priorityData, setPriorityData] = useState([]);
  const [loadingPriority, setLoadingPriority] = useState(true);
  const chartPriorityRef = useRef(null);

  useEffect(() => {
    getIncidents()
      .then(data => setIncidents(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getIncidentsByPriority()
      .then(data => {
        const priorityObj = data.priotity || {};
        const transformed = [
          { prioridad: 'Alta', cantidad: priorityObj.incidentsByPriorityHigh ?? 0 },
          { prioridad: 'Media', cantidad: priorityObj.incidentsByPriorityMedium ?? 0 },
          { prioridad: 'Baja', cantidad: priorityObj.incidentsByPriorityLow ?? 0 }
        ];
        setPriorityData(transformed);
      })
      .finally(() => setLoadingPriority(false));
  }, []);

  // Procesar datos para el gráfico de barras por estado
  const stateCounts = incidents.reduce((acc, inc) => {
    const state = inc.incident_status?.name || 'Sin estado';
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.entries(stateCounts).map(([name, value]) => ({
    name,
    value
  }));

  // Resúmenes numéricos
  const total = incidents.length;
  const pendientes = stateCounts['pendiente'] || 0;
  const enProgreso = stateCounts['en_progreso'] || 0;
  const resueltos = stateCounts['resuelto'] || 0;
  const cerrados = stateCounts['cerrado'] || 0;
  const reabiertos = stateCounts['re_abierto'] || 0;

  return {
    incidents,
    loading,
    priorityData,
    loadingPriority,
    chartPriorityRef,
    chartData,
    total,
    pendientes,
    enProgreso,
    resueltos,
    cerrados,
    reabiertos
  };
};