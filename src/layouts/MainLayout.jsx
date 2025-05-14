import React, { useState } from 'react';
import { ProfileMenu } from '../features/profile';
import Sidebar from '../components/Sidebar';
import CustomModal from '../components/Modal';
import logoTecsup from '../assets/header/logo_tecsup.png'; 

const MainLayout = ({ children }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <nav
        className="navbar navbar-light"
        style={{
          background: '#fff',
          boxShadow: '0 2px 8px #00AEEF22',
          padding: '0.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* Logo Tecsup */}
        <img
          src={logoTecsup}
          alt="Logo Tecsup"
          style={{ height: 60, objectFit: 'contain' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ProfileMenu />
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={() => setShowLogoutModal(true)}
          >
            Cerrar sesión
          </button>
        </div>
      </nav>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
      </div>

      {/* Modal de confirmación para cerrar sesión */}
      <CustomModal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        title="Confirmar cierre de sesión"
      >
        <div>
          <p>¿Estás seguro de que deseas cerrar sesión?</p>
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowLogoutModal(false)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleLogout}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default MainLayout;