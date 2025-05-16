import React, { useEffect, useState } from 'react';
import {
  getUsers,
  convertToAdmin,
  getIncidentTypes,
  assignIncidentTypeToAdmin
} from './userService';
import MainLayout from '../../layouts/MainLayout';
import CustomModal from '../../components/Modal';
import CustomButton from '../../components/Button/CustomButton';
import Table from '../../components/Table/Table';
import UserSearch from './UserSearch';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const EyeIcon = ({ style = {}, ...props }) => (
  <svg
    style={{ width: 26, height: 26, color: '#00AEEF', cursor: 'pointer', ...style }}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
      stroke="currentColor"
      fill="none"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" fill="none" />
  </svg>
);

const palette = {
  celeste: '#00AEEF',
  blanco: '#fff',
  grisClaro: '#f8f9fa',
  grisMedio: '#e6f7fb'
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [convertingId, setConvertingId] = useState(null);
  const [incidentTypes, setIncidentTypes] = useState([]);
  const [showIncidentTypeModal, setShowIncidentTypeModal] = useState(false);
  const [incidentTypeId, setIncidentTypeId] = useState('');
  const [adminToAssign, setAdminToAssign] = useState(null);
  const [assigning, setAssigning] = useState(false);

  const [search, setSearch] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const roleId =
    currentUser?.role_id ||
    currentUser?.user_role?.id ||
    (typeof currentUser?.user_role === 'number' ? currentUser.user_role : undefined);

  const fetchUsers = (searchValue = '') => {
    setLoading(true);
    getUsers(searchValue)
      .then(data => setUsers(Array.isArray(data) ? data : []))
      .catch(() => {
        MySwal.fire({
          title: 'Sin permisos',
          text: 'No tienes permisos para ver la lista de usuarios.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        setUsers([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (roleId === 3) {
      fetchUsers();
    } else {
      setLoading(false);
      MySwal.fire({
        title: 'Sin permisos',
        text: 'No tienes permisos para ver la lista de usuarios.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setUsers([]);
    }
    // eslint-disable-next-line
  }, [roleId]);

  const handleSearch = (value) => {
    setSearch(value);
    fetchUsers(value);
  };

  // SweetAlert2 para confirmar conversión
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
      const types = await getIncidentTypes();
      setIncidentTypes(Array.isArray(types) ? types : []);
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

  const getRoleStyle = (role) => {
    const name = typeof role === 'object' ? role.name : role;
    if (name === 'user') {
      return {
        background: 'rgba(40, 167, 69, 0.15)',
        color: '#28a745',
        border: '1.5px solid #28a745'
      };
    }
    if (name === 'admin') {
      return {
        background: 'rgba(255, 193, 7, 0.25)',
        color: '#ffc107',
        border: '1.5px solid #ffc107'
      };
    }
    if (name === 'superadmin') {
      return {
        background: 'rgba(0, 174, 239, 0.15)',
        color: '#00AEEF',
        border: '1.5px solid #00AEEF'
      };
    }
    return {
      background: palette.celeste,
      color: palette.blanco,
      border: 'none'
    };
  };

  // Variables para modo oscuro
  const tableHeaderColor = '#009fc3';
  const tableRowEven = 'var(--color-table-row-even, #f6f7fb)';
  const tableRowOdd = 'var(--color-table-row-odd, #fff)';
  const tableTextColor = 'var(--color-text, #222)';
  const moduleBg = 'var(--color-module, #f8f9fa)';

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
      key: 'rol',
      title: 'Rol',
      render: (u) => (
        <span
          style={{
            ...getRoleStyle(u.user_role),
            padding: '0.25rem 0.9rem',
            borderRadius: 14,
            fontWeight: 600,
            fontSize: 15,
            minWidth: 70,
            display: 'inline-block',
            textAlign: 'center'
          }}
        >
          {typeof u.user_role === 'object' ? u.user_role.name : u.user_role}
        </span>
      )
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
      key: 'acciones',
      title: 'Acciones',
      render: (u) => (
        <>
          <span
            title="Ver detalles"
            style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 8 }}
            onClick={() => setSelectedUser(u)}
            role="button"
            tabIndex={0}
            onKeyPress={e => { if (e.key === 'Enter') setSelectedUser(u); }}
          >
            <EyeIcon />
          </span>
          {roleId === 3 && u.role_id === 1 && (
            <button
              type="button"
              className="btn btn-sm btn-warning"
              style={{
                fontWeight: 600,
                background: '#fff',
                color: palette.celeste,
                border: `1.5px solid ${palette.celeste}`,
                marginLeft: 0
              }}
              onClick={() => handleConvertToAdminWithConfirm(u)}
              disabled={convertingId === u.id}
            >
              {convertingId === u.id ? 'Convirtiendo...' : 'Convertir a admin'}
            </button>
          )}
        </>
      )
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
        <h3 style={{ color: palette.celeste, fontWeight: 700 }}>Usuarios</h3>
        <UserSearch onSearch={handleSearch} />
        {loading ? (
          <div className="d-flex align-items-center" style={{ minHeight: 120 }}>
            <div className="spinner-border text-info me-2" role="status" />
            <span style={{ color: palette.celeste }}>Cargando...</span>
          </div>
        ) : (
          <Table
            columns={columns}
            data={users}
            rowKey="id"
            loading={loading}
            headerStyle={{
              background: tableHeaderColor,
              color: '#fff'
            }}
            rowStyle={(_, idx) => ({
              background: idx % 2 === 1 ? tableRowEven : tableRowOdd,
              color: tableTextColor
            })}
          />
        )}
      </div>

      {/* Modal para detalle de usuario */}
      <CustomModal
        show={!!selectedUser}
        onHide={() => setSelectedUser(null)}
        title="Detalle de Usuario"
      >
        {selectedUser && (
          <div>
            <p><b>Nombre:</b> {selectedUser.first_name} {selectedUser.last_name}</p>
            <p><b>Correo:</b> {selectedUser.email}</p>
            <p><b>Rol:</b> {typeof selectedUser.user_role === 'object' ? selectedUser.user_role.name : selectedUser.user_role}</p>
            <p><b>Estado:</b> {selectedUser.is_active ? 'Activo' : 'Inactivo'}</p>
          </div>
        )}
      </CustomModal>

      {/* Modal para asignar tipo de incidente */}
      <CustomModal
        show={showIncidentTypeModal}
        onHide={handleCloseIncidentTypeModal}
        title="Asignar tipo de incidente"
      >
        <div>
          <label>Tipo de incidente:</label>
          <select
            className="form-select mt-2"
            value={incidentTypeId}
            onChange={e => setIncidentTypeId(e.target.value)}
          >
            <option value="">Selecciona...</option>
            {(incidentTypes || []).map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleAssignIncidentType}
            disabled={assigning}
          >
            {assigning ? 'Asignando...' : 'Asignar'}
          </button>
        </div>
      </CustomModal>
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