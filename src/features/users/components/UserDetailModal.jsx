import React from 'react';
import CustomModal from '../../../components/Modal';

const UserDetailModal = ({ show, onHide, user }) => (
  <CustomModal show={show} onHide={onHide} title="Detalle de Usuario">
    {user && (
      <div>
        <p><b>Nombre:</b> {user.first_name} {user.last_name}</p>
        <p><b>Correo:</b> {user.email}</p>
        <p><b>Rol:</b> {typeof user.user_role === 'object' ? user.user_role.name : user.user_role}</p>
        <p><b>Estado:</b> {user.is_active ? 'Activo' : 'Inactivo'}</p>
      </div>
    )}
  </CustomModal>
);

export default UserDetailModal;