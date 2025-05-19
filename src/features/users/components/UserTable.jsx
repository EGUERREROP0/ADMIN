import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from '@mui/material';
import UserActions from './UserActions';
import palette from '../../../utils/palette';

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
      color: palette.celeste,
      border: `1.5px solid ${palette.celeste}`
    };
  }
  return {
    background: palette.celeste,
    color: palette.blanco,
    border: 'none'
  };
};

const tableHeaderColor = '#009fc3';
const tableRowEven = 'var(--color-table-row-even, #f6f7fb)';
const tableRowOdd = 'var(--color-table-row-odd, #fff)';
const tableTextColor = 'var(--color-text, #222)';

const UserTable = ({
  users,
  loading,
  roleId,
  setSelectedUser,
  handleConvertToAdminWithConfirm,
  convertingId,
  handleDeleteUser
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 1,
        boxShadow: '0 4px 16px #b0b8c1aa',
        mt: 2,
        fontFamily: 'Nunito, Arial, sans-serif',
      }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ background: tableHeaderColor }}>
            <TableCell sx={{ color: '#fff', fontWeight: 700 }}>NOMBRE</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 700 }}>CORREO</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 700 }}>ROL</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 700 }}>ESTADO</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 700 }}>ACCIONES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <CircularProgress color="primary" />
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography color="text.secondary" sx={{ py: 3 }}>
                  No hay usuarios registrados.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            users.map((u, idx) => (
              <TableRow
                key={u.id}
                sx={{
                  background: idx % 2 === 1 ? tableRowEven : tableRowOdd,
                  color: tableTextColor,
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell>
                  <span style={{ fontWeight: 600 }}>
                    {u.first_name} {u.last_name}
                  </span>
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  <span
                    style={{
                      background: u.is_active ? palette.grisMedio : '#f8d7da',
                      color: u.is_active ? palette.celeste : '#c82333',
                      padding: '0.25rem 0.75rem',
                      borderRadius: 12,
                      fontWeight: 600,
                      fontSize: 14
                    }}
                  >
                    {u.is_active ? 'Activo' : 'Inactivo'}
                  </span>
                </TableCell>
                <TableCell>
                  <UserActions
                    user={u}
                    roleId={roleId}
                    onView={setSelectedUser}
                    onConvert={handleConvertToAdminWithConfirm}
                    convertingId={convertingId}
                    onDelete={handleDeleteUser}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;