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
  Box,
} from '@mui/material';
import palette from '../../../utils/palette';
import statusColors from '../utils/statusColors';
import ActionMenu from './ActionMenu';

const IncidentTable = ({
  incidents,
  loading,
  onChangeStatus,
  onDelete,
  onDetail,
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
          <TableRow sx={{ background: palette.celeste }}>
            <TableCell sx={{ color: '#fff', fontWeight: 700 }}>#</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 700 }}>IMAGEN</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 700 }}>TIPO</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 700 }}>PRIORIDAD</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 700 }}>ESTADO</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 700 }}>FECHA</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 700 }}>REPORTADO POR</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 700 }}>RESPONSABLE</TableCell>
            <TableCell sx={{ color: '#fff', fontWeight: 700 }}>ACCIONES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                <Box sx={{ py: 4 }}>
                  <CircularProgress color="primary" />
                </Box>
              </TableCell>
            </TableRow>
          ) : incidents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} align="center">
                <Typography color="text.secondary" sx={{ py: 3 }}>
                  No hay incidentes registrados.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            incidents.map((inc, idx) => (
              <TableRow
                key={inc.id}
                sx={{
                  background: idx % 2 === 1 ? palette.grisClaro : '#fff',
                  color: palette.grisOscuro,
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell>{inc.id}</TableCell>
                <TableCell>
                  {inc.image_url ? (
                    <img
                      src={inc.image_url}
                      alt="Incidente"
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: 'cover',
                        borderRadius: 8,
                        border: '1px solid #eee',
                      }}
                    />
                  ) : (
                    <Typography color="text.disabled" fontSize={12}>
                      Sin imagen
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {inc.incident_type?.name || '-'}
                </TableCell>
                <TableCell>
                  {inc.priority?.name || inc.priority || '-'}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      background: statusColors[inc.incident_status?.name] || palette.celeste,
                      color: '#fff',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      fontWeight: 600,
                      fontSize: 14,
                      textTransform: 'capitalize',
                      display: 'inline-block',
                    }}
                  >
                    {(inc.incident_status?.name || '-').replace('_', ' ')}
                  </Box>
                </TableCell>
                <TableCell>
                  {inc.report_date ? inc.report_date.slice(0, 10) : '-'}
                </TableCell>
                <TableCell>
                  {inc.app_user_incident_user_idToapp_user ? (
                    <Box>
                      <Typography fontWeight={600} fontSize={15}>
                        {`${inc.app_user_incident_user_idToapp_user.first_name || ''} ${inc.app_user_incident_user_idToapp_user.last_name || ''}`.trim() || '-'}
                      </Typography>
                      <Typography fontSize={13} color="text.secondary">
                        {inc.app_user_incident_user_idToapp_user.email || ''}
                      </Typography>
                    </Box>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  {inc.app_user_incident_assigned_admin_idToapp_user ? (
                    <Box>
                      <Typography fontWeight={600} fontSize={15}>
                        {inc.app_user_incident_assigned_admin_idToapp_user.first_name} {inc.app_user_incident_assigned_admin_idToapp_user.last_name}
                      </Typography>
                      <Typography fontSize={13} color="text.secondary">
                        {inc.app_user_incident_assigned_admin_idToapp_user.email}
                      </Typography>
                    </Box>
                  ) : (
                    <Typography color="text.disabled" fontSize={12}>
                      Sin responsable
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <ActionMenu
                    onChangeStatus={() => onChangeStatus(inc)}
                    onDelete={() => onDelete(inc)}
                    onDetail={() => onDetail(inc)}
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

export default IncidentTable;