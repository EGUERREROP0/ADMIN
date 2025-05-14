import React, { useState } from 'react';
import CustomModal from '../../components/Modal';
import adminPlaceholder from '../../assets/perfil/admin-placeholder.png';
import superadminPlaceholder from '../../assets/perfil/superadmin-placeholder.png';

const ProfileMenu = () => {
  const [show, setShow] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user?.user_role?.name || user?.user_role || '';
  const imgSrc =
    role === 'superadmin'
      ? superadminPlaceholder
      : adminPlaceholder;

  return (
    <>
      <div
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
        onClick={() => setShow(true)}
      >
        <img
          src={imgSrc}
          alt="Usuario"
          style={{ width: 36, height: 36, borderRadius: '50%' }}
        />
        <span style={{ fontWeight: 600, color: '#00AEEF' }}>
          {user?.first_name || 'Usuario'}
        </span>
      </div>
      <CustomModal show={show} onHide={() => setShow(false)} title="Perfil">
        <div className="text-center">
          <img
            src={imgSrc}
            alt="Usuario"
            style={{ width: 60, height: 60, borderRadius: '50%', marginBottom: 10 }}
          />
          <h6>{user?.first_name || 'Nombre no disponible'} {user?.last_name || ''}</h6>
          <p style={{ margin: 0, color: '#888' }}>{user?.email || 'Correo no disponible'}</p>
          <span className="badge bg-info mt-2">{role}</span>
        </div>
      </CustomModal>
    </>
  );
};

export default ProfileMenu;