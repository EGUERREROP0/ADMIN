import React, { useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import UserSearch from './UserSearch';
import UserDetailModal from './UserDetailModal';
import AssignIncidentTypeModal from './AssignIncidentTypeModal';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useUserList } from '../hooks/useUserList';
import {
  convertToAdmin,
  assignIncidentTypeToAdmin,
  deleteUser
} from '../services/userService';
import palette from '../../../utils/palette';
import UserTable from './UserTable';

const MySwal = withReactContent(Swal);

const UserList = () => {
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const roleId =
    currentUser?.role_id ||
    currentUser?.user_role?.id ||
    (typeof currentUser?.user_role === 'number' ? currentUser.user_role : undefined);

  const {
    users,
    loading,
    incidentTypes,
    search,
    setSearch,
    fetchUsers,
    fetchIncidentTypes,
    error
  } = useUserList(roleId);

  const [selectedUser, setSelectedUser] = useState(null);
  const [convertingId, setConvertingId] = useState(null);
  const [showIncidentTypeModal, setShowIncidentTypeModal] = useState(false);
  const [incidentTypeId, setIncidentTypeId] = useState('');
  const [adminToAssign, setAdminToAssign] = useState(null);
  const [assigning, setAssigning] = useState(false);

  const handleSearch = (value) => {
    setSearch(value);
    fetchUsers(value);
  };

  const handleConvertToAdminWithConfirm = async (user) => {
    const result = await MySwal.fire({
      title: 'Confirmar conversión',
      html: `¿Estás seguro de convertir a <b>${user.first_name} ${user.last_name}</b> a admin?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ffc107',
      cancelButtonColor: '#495057'
    });
    if (result.isConfirmed) {
      await handleConvertToAdmin(user.id);
    }
  };

  const handleConvertToAdmin = async (id) => {
    setConvertingId(id);
    try {
      await convertToAdmin(id);
      await fetchIncidentTypes();
      setAdminToAssign(id);
      setShowIncidentTypeModal(true);
      await MySwal.fire({
        title: '¡Éxito!',
        text: 'Usuario convertido a admin correctamente. Ahora asigna el tipo de incidente.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      fetchUsers(search);
    } catch {
      await MySwal.fire({
        title: 'Error',
        text: 'No se pudo convertir el usuario a admin.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setConvertingId(null);
    }
  };

  const handleAssignIncidentType = async () => {
    if (!incidentTypeId) {
      await MySwal.fire({
        title: 'Advertencia',
        text: 'Selecciona un tipo de incidente.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
    setAssigning(true);
    try {
      await assignIncidentTypeToAdmin(adminToAssign, incidentTypeId);
      await MySwal.fire({
        title: '¡Éxito!',
        text: 'Tipo de incidente asignado correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setShowIncidentTypeModal(false);
      setIncidentTypeId('');
      setAdminToAssign(null);
    } catch {
      await MySwal.fire({
        title: 'Error',
        text: 'No se pudo asignar el tipo de incidente.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setAssigning(false);
    }
  };

  const handleCloseIncidentTypeModal = () => {
    setShowIncidentTypeModal(false);
    setIncidentTypeId('');
    setAdminToAssign(null);
  };

  const handleDeleteUser = async (user) => {
    const result = await MySwal.fire({
      title: '¿Eliminar usuario?',
      html: `¿Seguro que deseas eliminar a <b>${user.first_name} ${user.last_name}</b>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: palette.rojo,
      cancelButtonColor: '#495057'
    });
    if (!result.isConfirmed) return;
    try {
      await deleteUser(user.id);
      await MySwal.fire('Eliminado', 'Usuario eliminado correctamente.', 'success');
      fetchUsers(search);
    } catch {
      await MySwal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
    }
  };

  const moduleBg = 'var(--color-module, #f8f9fa)';
  const tableTextColor = 'var(--color-text, #222)';

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
        <h3 style={{ color: palette.celeste, fontWeight: 700 }}>Usuarios</h3>
        <UserSearch onSearch={handleSearch} />
        {error && <div className="alert alert-danger">{error}</div>}
        {loading ? (
          <div className="d-flex align-items-center" style={{ minHeight: 120 }}>
            <div className="spinner-border text-info me-2" role="status" />
            <span style={{ color: palette.celeste }}>Cargando...</span>
          </div>
        ) : (
          <UserTable
            users={users}
            loading={loading}
            roleId={roleId}
            setSelectedUser={setSelectedUser}
            handleConvertToAdminWithConfirm={handleConvertToAdminWithConfirm}
            convertingId={convertingId}
            handleDeleteUser={handleDeleteUser}
          />
        )}
      </div>

      {/* Modal para detalle de usuario */}
      <UserDetailModal
        show={!!selectedUser}
        onHide={() => setSelectedUser(null)}
        user={selectedUser}
      />

      {/* Modal para asignar tipo de incidente */}
      <AssignIncidentTypeModal
        show={showIncidentTypeModal}
        onHide={handleCloseIncidentTypeModal}
        incidentTypes={incidentTypes}
        incidentTypeId={incidentTypeId}
        setIncidentTypeId={setIncidentTypeId}
        onAssign={handleAssignIncidentType}
        assigning={assigning}
      />

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

export default UserList;