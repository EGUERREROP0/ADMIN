import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';

import dashboardIcon from '../../assets/iconos/dashboard.png';
import usuariosIcon from '../../assets/iconos/usuarios.png';
import incidentesIcon from '../../assets/iconos/incidentes.png';
import adminsIcon from '../../assets/iconos/admins.png';
import tiposIncidentesIcon from '../../assets/iconos/tipo_incidente.png';

const palette = {
  celeste: '#009fc3',
  grisOscuro: '#222',
  grisMedio: '#f0f0f0'
};

const SidebarContent = ({ onClose, location, sidebarLinks }) => (
  <Box sx={{ width: 220, minHeight: '100vh', p: '2rem 0.5rem', bgcolor: 'var(--color-sidebar, #fff)' }}>
    <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end', mb: 2 }}>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
    <List sx={{ p: 0 }}>
      {sidebarLinks.map(link => (
        <ListItemButton
          key={link.to}
          component={Link}
          to={link.to}
          selected={location.pathname === link.to}
          sx={{
            mb: 1,
            borderRadius: 2,
            pl: 2,
            pr: 2,
            py: 1.2,
            color: location.pathname === link.to ? palette.celeste : palette.grisOscuro,
            fontWeight: location.pathname === link.to ? 700 : 500,
            bgcolor: location.pathname === link.to ? palette.grisMedio : 'transparent',
            fontSize: 17,
            transition: 'color 0.3s, background 0.3s',
            '&:hover': {
              bgcolor: palette.grisMedio,
              color: palette.celeste
            }
          }}
          onClick={onClose}
        >
          <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>
            {link.icon}
          </ListItemIcon>
          <ListItemText
            primary={link.label}
            primaryTypographyProps={{
              fontWeight: location.pathname === link.to ? 700 : 500,
              fontSize: 17,
              fontFamily: 'Nunito, Arial, sans-serif'
            }}
          />
        </ListItemButton>
      ))}
    </List>
  </Box>
);

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const roleId = user?.role_id || user?.user_role?.id;
  const isMobile = useMediaQuery('(max-width:900px)');

  const sidebarLinks = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: <img src={dashboardIcon} alt="Dashboard" style={{ width: 22 }} />
    },
    {
      to: '/usuarios',
      label: 'Usuarios',
      icon: <img src={usuariosIcon} alt="Usuarios" style={{ width: 22 }} />
    },
    {
      to: '/incidentes',
      label: 'Incidentes',
      icon: <img src={incidentesIcon} alt="Incidentes" style={{ width: 22 }} />
    }
  ];

  if (roleId === 3) {
    sidebarLinks.push({
      to: '/administradores',
      label: 'Administradores',
      icon: <img src={adminsIcon} alt="Administradores" style={{ width: 22 }} />
    });
    sidebarLinks.push({
      to: '/tipos-incidente',
      label: 'Tipos incidente',
      icon: <img src={tiposIncidentesIcon} alt="Tipos de incidente" style={{ width: 22 }} />
    });
  }

  // Drawer para móviles, Paper fijo para escritorio
  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: 220 } }}
      >
        <SidebarContent onClose={onClose} location={location} sidebarLinks={sidebarLinks} />
      </Drawer>
    );
  }

  return (
    <Paper
      elevation={2}
      className="sidebar"
      sx={{
        width: 220,
        minHeight: 'calc(100vh - 56px)',
        p: '2rem 0.5rem',
        bgcolor: 'var(--color-sidebar, #fff)',
        borderRadius: 0,
        boxShadow: '2px 0 8px #b0b8c122',
        transition: 'background 0.3s',
        position: 'static'
      }}
      component="aside"
    >
      <SidebarContent onClose={onClose} location={location} sidebarLinks={sidebarLinks} />
    </Paper>
  );
};

export default Sidebar;