import React from 'react';
import palette from '../../../utils/palette';

export const adminTableColumns = () => [
  {
    key: 'name',
    title: 'NOMBRE',
    render: (u) => (
      <span style={{ fontWeight: 600 }}>
        {u.first_name} {u.last_name}
      </span>
    )
  },
  {
    key: 'email',
    title: 'CORREO',
    dataIndex: 'email'
  },
  {
    key: 'estado',
    title: 'ESTADO',
    render: (u) => (
      <span
        style={{
          background: u.is_active ? palette.grisMedio : '#f8d7da',
          color: u.is_active ? palette.celeste : '#c82333',
          padding: '0.25rem 0.75rem',
          borderRadius: 1,
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
    title: 'TIPO INCIDENTE',
    render: (u) =>
      u.incident_type?.name ||
      u.incident_type_name ||
      (u.incident_types && Array.isArray(u.incident_types)
        ? u.incident_types.map(t => t.name).join(', ')
        : '-')
  }
];