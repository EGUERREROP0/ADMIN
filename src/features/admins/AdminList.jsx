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

const tableHeaderColor = '#009fc3';
const tableRowEven = "#f6f7fb";
const tableRowOdd = "#fff";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchAdmins = () => {
    setLoading(true);
    getAdmins()
      .then(data => {
        console.log('Respuesta de getAdmins:', data);
        // Filtrar solo admins por role_id === 2
        const adminsOnly = (data || []).filter(u => u.role_id === 2);
        console.log('Admins filtrados:', adminsOnly);
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
        headerStyle={{ background: tableHeaderColor }}
        rowStyle={(_, idx) => ({
          background: idx % 2 === 1 ? tableRowEven : tableRowOdd,
          color: '#222'
        })}
      />
      <CustomModal show={showModal} onHide={() => setShowModal(false)} title="Nuevo administrador">
        <AdminCreateForm onSuccess={() => {
          setShowModal(false);
          fetchAdmins();
        }} />
      </CustomModal>
    </MainLayout>
  );
};

export default AdminList;