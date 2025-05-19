import { useState, useEffect } from 'react';
import { getUsers, getIncidentTypes } from '../services/userService';

export function useUserList(roleId) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [incidentTypes, setIncidentTypes] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchUsers = (searchValue = '') => {
    setLoading(true);
    getUsers(searchValue)
      .then(data => setUsers(Array.isArray(data) ? data : []))
      .catch(() => setError('No tienes permisos para ver la lista de usuarios.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (roleId === 3) fetchUsers();
    else setLoading(false);
  }, [roleId]);

  const fetchIncidentTypes = async () => {
    const types = await getIncidentTypes();
    setIncidentTypes(Array.isArray(types) ? types : []);
  };

  return {
    users,
    loading,
    incidentTypes,
    search,
    setSearch,
    fetchUsers,
    setUsers,
    fetchIncidentTypes,
    error,
    setError
  };
}