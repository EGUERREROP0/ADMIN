import { useState, useEffect } from 'react';
import { getAdmins } from '../services/adminService';

export const useAdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAdmins = () => {
    setLoading(true);
    setError('');
    getAdmins()
      .then(data => {
        const adminsOnly = (data || []).filter(u => u.role_id === 2);
        setAdmins(adminsOnly);
      })
      .catch(() => setError('No se pudo cargar la lista de administradores.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return { admins, loading, error, fetchAdmins };
};