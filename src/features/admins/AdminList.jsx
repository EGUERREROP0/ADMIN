import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Table from '../../components/Table/Table';
import CustomModal from '../../components/Modal';
import AdminCreateForm from './AdminCreateForm';
import CustomButton from '../../components/Button/CustomButton';
import { getAdmins } from './adminService';

const palette = {
  celeste: '#00AEEF',
  blanco: '#fff',
  grisClaro: '#f8f9fa',
  grisMedio: '#e6f7fb'
};

// Variables para modo oscuro
const tableHeaderColor = 'var(--color-table-header, #009fc3)';
const tableRowEven = 'var(--color-table-row-even, #f6f7fb)';
const tableRowOdd = 'var(--color-table-row-odd, #fff)';
const tableTextColor = 'var(--color-text, #222)';
const moduleBg = 'var(--color-module, #f8f9fa)';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchAdmins = () => {
    setLoading(true);
    getAdmins()
      .then(data => {
        // Filtrar solo admins por role_id === 2
        const adminsOnly = (data || []).filter(u => u.role_id === 2);
        setAdmins(adminsOnly);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAdmins();
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
      render: (u) =>
        u.incident_type?.name ||
        u.incident_type_name ||
        (u.incident_types && Array.isArray(u.incident_types)
          ? u.incident_types.map(t => t.name).join(', ')
          : '-')
    }
  ];

  return (
    <MainLayout>
      <div
        className="module-container"
        style={{
          background: moduleBg,
          borderRadius: 16,
          padding: '2rem',
          margin: '1rem 0',
          boxShadow: '0 2px 8px #00AEEF11',
          color: tableTextColor
        }}
      >
        <h3 style={{ color: palette.celeste, fontWeight: 700 }}>Administradores</h3>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <CustomButton onClick={() => setShowModal(true)}>
            Agregar administrador
          </CustomButton>
        </div>
        <Table
          columns={columns}
          data={admins}
          rowKey="id"
          loading={loading}
          headerStyle={{ background: tableHeaderColor, color: '#fff' }}
          rowStyle={(_, idx) => ({
            background: idx % 2 === 1 ? tableRowEven : tableRowOdd,
            color: tableTextColor
          })}
        />
        <CustomModal show={showModal} onHide={() => setShowModal(false)} title="Nuevo administrador">
          <AdminCreateForm onSuccess={() => {
            setShowModal(false);
            fetchAdmins();
          }} />
        </CustomModal>
      </div>
      {/* Estilos para modo oscuro en tablas y módulo */}
      <style>
        {`
          .module-container {
            transition: background 0.3s, color 0.3s;
          }
          .table, .table thead, .table tbody, .table tr, .table th, .table td {
            background: var(--color-table, #fff) !important;
            color: var(--color-text, #222) !important;
            transition: background 0.3s, color 0.3s;
          }
          body.dark-mode .table, 
          body.dark-mode .table thead, 
          body.dark-mode .table tbody, 
          body.dark-mode .table tr, 
          body.dark-mode .table th, 
          body.dark-mode .table td {
            background: var(--color-table, #23272f) !important;
            color: var(--color-text, #f1f1f1) !important;
          }
        `}
      </style>
    </MainLayout>
  );
};

export default AdminList;