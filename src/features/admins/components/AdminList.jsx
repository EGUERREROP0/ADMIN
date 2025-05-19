import React, { useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import Table from '../../../components/Table/Table';
import CustomModal from '../../../components/Modal';
import AdminCreateForm from './AdminCreateForm';
import CustomButton from '../../../components/Button/CustomButton';
import palette from '../utils/palette';
import tableStyles from '../utils/tableStyles';
import { adminTableColumns } from './adminTableColumns.jsx';
import { useAdminList } from '../hooks/useAdminList';

const AdminList = () => {
  const { admins, loading, error, fetchAdmins } = useAdminList();
  const [showModal, setShowModal] = useState(false);

  return (
    <MainLayout>
      <div
        className="module-container"
        style={{
          background: tableStyles.moduleBg,
          borderRadius: 16,
          padding: '2rem',
          margin: '1rem 0',
          boxShadow: '0 2px 8px #00AEEF11',
          color: tableStyles.tableTextColor
        }}
      >
        <h3 style={{ color: palette.celeste, fontWeight: 700 }}>Administradores</h3>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <CustomButton onClick={() => setShowModal(true)}>
            + Agregar administrador
          </CustomButton>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <Table
          columns={adminTableColumns()}
          data={admins}
          rowKey="id"
          loading={loading}
          headerStyle={{ background: tableStyles.tableHeaderColor, color: '#fff' }}
          rowStyle={(_, idx) => ({
            background: idx % 2 === 1 ? tableStyles.tableRowEven : tableStyles.tableRowOdd,
            color: tableStyles.tableTextColor
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
          .table thead tr th {
            background: #009fc3 !important;
            color: #fff !important;
          }
          body.dark-mode .table thead tr th {
            background: #007a99 !important;
            color: #fff !important;
          }
        `}
      </style>
    </MainLayout>
  );
};

export default AdminList;