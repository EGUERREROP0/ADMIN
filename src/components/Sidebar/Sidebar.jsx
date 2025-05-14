import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import dashboardIcon from '../../assets/iconos/dashboard.png';
import usuariosIcon from '../../assets/iconos/usuarios.png';
import incidentesIcon from '../../assets/iconos/incidentes.png';
import adminsIcon from '../../assets/iconos/admins.png';

const Sidebar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const roleId = user?.role_id || user?.user_role?.id;

  const sidebarLinks = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: <img src={dashboardIcon} alt="Dashboard" style={{ width: 22, marginRight: 12 }} />
    },
    {
      to: '/usuarios',
      label: 'Usuarios',
      icon: <img src={usuariosIcon} alt="Usuarios" style={{ width: 22, marginRight: 12 }} />
    },
    {
      to: '/incidentes',
      label: 'Incidentes',
      icon: <img src={incidentesIcon} alt="Incidentes" style={{ width: 22, marginRight: 12 }} />
    }
  ];

  if (roleId === 3) {
    sidebarLinks.push({
      to: '/administradores',
      label: 'Administradores',
      icon: <img src={adminsIcon} alt="Administradores" style={{ width: 22, marginRight: 12 }} />
    });
  }

  return (
    <aside
      className="sidebar-fixed"
      style={{
        width: 220,
        minHeight: 'calc(100vh - 56px)',
        boxShadow: '2px 0 8px #00AEEF11',
        padding: '2rem 0.5rem',
        background: 'var(--color-sidebar)',
        transition: 'background 0.3s'
      }}
    >
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {sidebarLinks.map(link => (
          <li key={link.to}>
            <Link
              to={link.to}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.75rem 1.5rem',
                color: location.pathname === link.to ? '#00AEEF' : 'var(--color-text)',
                fontWeight: location.pathname === link.to ? 700 : 500,
                background: location.pathname === link.to ? '#e6f7fb' : 'transparent',
                borderRadius: 8,
                textDecoration: 'none',
                marginBottom: 8,
                fontSize: 17,
                transition: 'color 0.3s, background 0.3s'
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;