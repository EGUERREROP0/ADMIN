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
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ReportIcon from '@mui/icons-material/Report';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/Category';
import useMediaQuery from '@mui/material/useMediaQuery';

const palette = {
  celeste: '#009fc3',
  grisOscuro: '#222',
  grisMedio: '#f0f0f0',
};

// Sombra oscura común para ambas versiones
const darkShadow = '3px 0 10px rgba(0, 0, 0, 0.3)';

const SidebarContent = ({ onClose, location, sidebarLinks }) => (
  <Box sx={{ width: '100%', height: '100%' }}>
    <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end', mb: 2 }}>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
    <List sx={{ p: 0 }}>
      {sidebarLinks.map((link) => (
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
            color: location.pathname === link.to ? palette.celeste : '#6c757d',
            fontWeight: location.pathname === link.to ? 700 : 500,
            bgcolor: location.pathname === link.to ? palette.grisMedio : 'transparent',
            fontSize: 17,
            transition: 'color 0.3s, background 0.3s',
            '&:hover': {
              bgcolor: palette.grisMedio,
              color: palette.celeste,
            },
          }}
          onClick={onClose}
        >
          <ListItemIcon sx={{ minWidth: 32, color: 'inherit' }}>{link.icon}</ListItemIcon>
          <ListItemText
            primary={link.label}
            primaryTypographyProps={{
              fontWeight: location.pathname === link.to ? 700 : 500,
              fontSize: 17,
              fontFamily: 'Nunito, Arial, sans-serif',
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
      icon: <DashboardIcon />,
    },
    {
      to: '/usuarios',
      label: 'Usuarios',
      icon: <PeopleIcon />,
    },
    {
      to: '/incidentes',
      label: 'Incidentes',
      icon: <ReportIcon />,
    },
  ];

  if (roleId === 3) {
    sidebarLinks.push({
      to: '/administradores',
      label: 'Administradores',
      icon: <AdminPanelSettingsIcon />,
    });
    sidebarLinks.push({
      to: '/tipos-incidente',
      label: 'Tipos incidente',
      icon: <CategoryIcon />,
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
        PaperProps={{ 
          sx: { 
            width: 220,
            bgcolor: 'var(--color-sidebar, #fff)',
            background: 'var(--color-sidebar, #fff)',
            boxShadow: darkShadow, // Sombra oscura para versión móvil
          }
        }}
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
        background: 'var(--color-sidebar, #fff)',
        borderRadius: 0,
        boxShadow: darkShadow, // Sombra oscura para versión escritorio
        transition: 'background 0.3s, box-shadow 0.3s',
        position: 'static',
      }}
      component="aside"
    >
      <SidebarContent onClose={onClose} location={location} sidebarLinks={sidebarLinks} />
    </Paper>
  );
};

export default Sidebar;