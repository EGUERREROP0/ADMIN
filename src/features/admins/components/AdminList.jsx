import React, { useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import TableMUI from './TableMUI';
import CustomModal from '../../../components/Modal';
import AdminCreateForm from './AdminCreateForm';
import CustomButton from '../../../components/Button/CustomButton';
import palette from '../../../utils/palette';
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
        <h3 style={{ color: palette.celeste, fontWeight: 700, fontFamily: 'Nunito, Arial, sans-serif' }}>Administradores</h3>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <CustomButton onClick={() => setShowModal(true)}>
            + AGREGAR ADMIN
          </CustomButton>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <TableMUI
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
    </MainLayout>
  );
};

export default AdminList;