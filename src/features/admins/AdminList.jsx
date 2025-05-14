import React, { useEffect, useState } from 'react';
import { getUsers } from '../users/userService';
import MainLayout from '../../layouts/MainLayout';
import Table from '../../components/Table/Table';

const palette = {
  celeste: '#00AEEF',
  blanco: '#fff',
  grisClaro: '#f8f9fa',
  grisMedio: '#e6f7fb'
};

const tableHeaderColor = '#009fc3';
const tableRowEven = "#f6f7fb";
const tableRowOdd = "#fff";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(data => {
        // Filtrar solo admins (role_id === 2 o user_role.name === 'admin')
        const adminsOnly = (data || []).filter(
          u =>
            (typeof u.user_role === 'object' && u.user_role.name === 'admin') ||
            u.role_id === 2 ||
            u.user_role === 'admin'
        );
        setAdmins(adminsOnly);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      key: 'name',
      title: 'Nombre',
      render: (u) => (
        <span style={{ fontWeight: 600 }}>
          {u.first_name} {u.last_name}
        </span>
      )
    },
    {
      key: 'email',
      title: 'Correo',
      dataIndex: 'email'
    },
    {
      key: 'estado',
      title: 'Estado',
      render: (u) => (
        <span
          style={{
            background: u.is_active ? '#e6f7fb' : '#f8d7da',
            color: u.is_active ? palette.celeste : '#c82333',
            padding: '0.25rem 0.75rem',
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 14
          }}
        >
          {u.is_active ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
    {
      key: 'tipo',
      title: 'Tipo de incidente',
      render: (u) => u.incident_type?.name || u.incident_type_name || '-'
    }
  ];

  return (
    <MainLayout>
      <h3 style={{ color: palette.celeste, fontWeight: 700 }}>Administradores</h3>
      <Table
        columns={columns}
        data={admins}
        rowKey="id"
        loading={loading}
        headerStyle={{ background: tableHeaderColor }}
        rowStyle={(_, idx) => ({
          background: idx % 2 === 1 ? tableRowEven : tableRowOdd,
          color: '#222'
        })}
      />
    </MainLayout>
  );
};

export default AdminList;