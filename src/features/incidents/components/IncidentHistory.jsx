import React from 'react';
import { Typography, Paper, Stack, Box, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DateRangeIcon from '@mui/icons-material/DateRange';
import palette from '../../../utils/palette';

const IncidentHistory = ({ history = [], hideTitle = false }) => {
  const formatDateTime = (dateString) => {
    if (!dateString) return { date: '', time: '' };
    
    const date = new Date(dateString);
    
    const formattedDate = date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    
    const formattedTime = date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    return { date: formattedDate, time: formattedTime };
  };

  return (
    <Box sx={{ width: '100%', overflowY: 'visible' }}> 
      {!hideTitle && (
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
      )}
      <Stack spacing={2} sx={{ width: '100%' }}>
        {history.length === 0 && (
          <Typography color="text.secondary" sx={{ py: 2 }}>
            Sin historial de cambios.
          </Typography>
        )}
        {history.map(hist => {
          const { date, time } = formatDateTime(hist.change_date);
          
          return (
            <Paper
              key={hist.id}
              elevation={0}
              sx={{
                background: '#f4f8fb',
                p: 2,
                borderRadius: 2,
                fontFamily: 'Nunito, Arial, sans-serif',
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box'
              }}
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 2, 
                justifyContent: 'space-between',
                width: '100%'
              }}>
                <Box 
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: '#edf7fa', 
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <DateRangeIcon sx={{ fontSize: 18, mr: 0.5, color: palette.celeste }} />
                    <Typography sx={{ fontWeight: 600, color: palette.celeste, fontSize: 14 }}>
                      {date}
                    </Typography>
                  </Box>
                </Box>
                
                {/* Hora con icono en un chip (derecha) */}
                <Chip 
                  icon={<AccessTimeIcon />}
                  label={time}
                  size="small"
                  sx={{
                    bgcolor: palette.celeste,
                    color: 'white',
                    fontWeight: 500,
                    '& .MuiChip-icon': {
                      color: 'white'
                    }
                  }}
                />
              </Box>
              
              {/* Contenido del historial */}
              <Typography sx={{ fontSize: 15, mb: 1.5, fontWeight: 500, width: '100%', wordBreak: 'break-word' }}>
                {hist.comment}
              </Typography>
              
              <Typography sx={{ fontSize: 13, color: palette.grisOscuro }}>
                Por: {hist.app_user?.first_name} {hist.app_user?.last_name} ({hist.app_user?.email})
              </Typography>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
};

export default IncidentHistory;