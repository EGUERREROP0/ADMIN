import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { FaEllipsisV, FaTrash, FaPen, FaInfoCircle } from 'react-icons/fa';
import palette from '../../../utils/palette';

const ActionMenu = ({ onChangeStatus, onDelete, onDetail }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        size="small"
        sx={{
          color: palette.celeste,
          borderRadius: 2,
          p: 0.5
        }}
        title="Acciones"
      >
        <FaEllipsisV size={22} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 3,
            minWidth: 180,
            boxShadow: '0 4px 16px #00AEEF22',
            fontFamily: 'Nunito, Arial, sans-serif'
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuItem
          onClick={() => { handleClose(); onChangeStatus(); }}
          sx={{
            color: palette.celeste,
            fontWeight: 600,
            fontSize: 16
          }}
        >
          <ListItemIcon sx={{ color: palette.celeste }}>
            <FaPen size={18} />
          </ListItemIcon>
          <ListItemText primary="Cambiar estado" />
        </MenuItem>
        <MenuItem
          onClick={() => { handleClose(); onDelete(); }}
          sx={{
            color: palette.rojo,
            fontWeight: 600,
            fontSize: 16
          }}
        >
          <ListItemIcon sx={{ color: palette.rojo }}>
            <FaTrash size={18} />
          </ListItemIcon>
          <ListItemText primary="Eliminar" />
        </MenuItem>
        <MenuItem
          onClick={() => { handleClose(); onDetail(); }}
          sx={{
            color: palette.celeste,
            fontWeight: 600,
            fontSize: 16
          }}
        >
          <ListItemIcon sx={{ color: palette.celeste }}>
            <FaInfoCircle size={18} />
          </ListItemIcon>
          <ListItemText primary="Ver detalle" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionMenu;