import { useState, useEffect } from 'react';
import {
  getIncidents,
  getIncidentStatuses,
  getIncidentTypes,
  updateIncidentStatus,
  deleteIncident
} from '../services/incidentService';

export function useIncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [statuses, setStatuses] = useState([]);
  const [tiposIncidente, setTiposIncidente] = useState([]);
  const [prioridad, setPrioridad] = useState('');
  const [estado, setEstado] = useState('');
  const [tipo, setTipo] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    getIncidentStatuses()
      .then(data => setStatuses(Array.isArray(data) ? data : []))
      .catch(() => setError('No se pudieron cargar los estados.'));
    getIncidentTypes()
      .then(data => setTiposIncidente(Array.isArray(data) ? data : []))
      .catch(() => setError('No se pudieron cargar los tipos.'));
  }, []);

  useEffect(() => {
    fetchIncidents();
    // eslint-disable-next-line
  }, [prioridad, estado, tipo, search]);

  const fetchIncidents = () => {
    setLoading(true);
    getIncidents({
      priority: prioridad,
      status_id: estado,
      type_id: tipo,
      search
    })
      .then(data => setIncidents(Array.isArray(data) ? data : []))
      .catch(() => setError('No se pudieron cargar los incidentes.'))
      .finally(() => setLoading(false));
  };

  // Handler para actualizar estado de incidente
  const handleUpdateStatus = async (incidentId, newStatusId) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await updateIncidentStatus(incidentId, newStatusId);
      setSuccess('Estado actualizado correctamente.');
      fetchIncidents();
    } catch {
      setError('No se pudo actualizar el estado.');
    } finally {
      setLoading(false);
    }
  };

  // Handler para eliminar incidente
  const handleDeleteIncident = async (incidentId) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await deleteIncident(incidentId);
      setSuccess('Incidente eliminado correctamente.');
      fetchIncidents();
    } catch {
      setError('No se pudo eliminar el incidente.');
    } finally {
      setLoading(false);
    }
  };

  return {
    incidents,
    loading,
    error,
    success,
    statuses,
    tiposIncidente,
    prioridad,
    setPrioridad,
    estado,
    setEstado,
    tipo,
    setTipo,
    search,
    setSearch,
    fetchIncidents,
    setError,
    setSuccess,
    handleUpdateStatus,
    handleDeleteIncident
  };
}