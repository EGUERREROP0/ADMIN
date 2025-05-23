import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import { MdLogout } from 'react-icons/md';
import { ProfileMenu } from '../features/profile';
import Sidebar from '../components/Sidebar';
import logoTecsup from '../assets/header/logo_tecsup.png';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useMediaQuery from '@mui/material/useMediaQuery';

const MySwal = withReactContent(Swal);

const MainLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleLogout = async () => {
    const result = await MySwal.fire({
      title: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Cerrar sesión',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg, #009fc3)' }}>
      <nav
        className="navbar navbar-light"
        style={{
          position: 'sticky',      
          top: 0,                
          zIndex: 1100,           
          width: '100%', 
          background: 'var(--color-header, #009fc3)',
          boxShadow: '0 2px 8px #00AEEF22',
          padding: '0.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Botón menú solo en móviles */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 28,
                cursor: 'pointer',
                color: '#fff',
                marginRight: 8
              }}
              aria-label="Abrir menú"
            >
              ☰
            </button>
          )}
          {/* Logo Tecsup */}
          <img
            src={logoTecsup}
            alt="Logo Tecsup"
            style={{ height: 60, objectFit: 'contain' }}
          />
        </div>
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
                  color: '#009fc3',
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
          {/* Icono de cerrar sesión */}
          <MdLogout
            size={26}
            color="#dc3545"
            style={{ cursor: 'pointer' }}
            title="Cerrar sesión"
            onClick={handleLogout}
          />
        </div>
      </nav>
      <div style={{ display: 'flex' }}>
        {/* Sidebar: abierto fijo en escritorio, Drawer en móvil */}
        <Sidebar open={!isMobile || sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main style={{ flex: 1, padding: '2rem' }}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;