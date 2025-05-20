import React from 'react';
import { Typography, Paper, Stack, Box } from '@mui/material';
import palette from '../../../utils/palette';

const IncidentHistory = ({ history = [] }) => (
  <Box>
    <Typography
      variant="h5"
      sx={{
        color: palette.celeste,
        fontWeight: 700,
        fontFamily: 'Nunito, Arial, sans-serif',
        mb: 2,
        fontSize: 22
      }}
    >
      Historial de cambios
    </Typography>
    <Stack spacing={2}>
      {history.length === 0 && (
        <Typography color="text.secondary" sx={{ py: 2 }}>
          Sin historial de cambios.
        </Typography>
      )}
      {history.map(hist => (
        <Paper
          key={hist.id}
          elevation={0}
          sx={{
            background: '#f4f8fb',
            p: 2,
            borderRadius: 2,
            fontFamily: 'Nunito, Arial, sans-serif'
          }}
        >
          <Typography sx={{ fontWeight: 700, color: palette.celeste, fontSize: 16, mb: 0.5 }}>
            🕒 {hist.change_date ? new Date(hist.change_date).toLocaleString() : ''}
          </Typography>
          <Typography sx={{ fontSize: 15, mb: 0.5 }}>
            {hist.comment}
          </Typography>
          <Typography sx={{ fontSize: 13, color: palette.grisOscuro }}>
            Por: {hist.app_user?.first_name} {hist.app_user?.last_name} ({hist.app_user?.email})
          </Typography>
        </Paper>
      ))}
    </Stack>
  </Box>
);

export default IncidentHistory;