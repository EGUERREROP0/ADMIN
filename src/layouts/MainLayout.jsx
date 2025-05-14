import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import { ProfileMenu } from '../features/profile';
import Sidebar from '../components/Sidebar';
import CustomModal from '../components/Modal';
import logoTecsup from '../assets/header/logo_tecsup.png';

const MainLayout = ({ children }) => {
  // Lee el valor inicial de localStorage al crear el estado
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg, #f8f9fa)' }}>
      <nav
        className="navbar navbar-light"
        style={{
          background: 'var(--color-header, #fff)',
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
          {/* Switch modo oscuro */}
          <Switch
            onChange={setDarkMode}
            checked={darkMode}
            offColor="#bbb"
            onColor="#222"
            uncheckedIcon={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  fontSize: 16,
                  color: '#222',
                  paddingLeft: 6
                }}
              >
                ☀️
              </div>
            }
            checkedIcon={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  fontSize: 16,
                  color: '#fff',
                  paddingLeft: 6
                }}
              >
                🌙
              </div>
            }
            height={24}
            width={48}
            handleDiameter={22}
          />
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