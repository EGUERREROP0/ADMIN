import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Grid, Typography, Box, Fab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import IncidentReportPDF from '../pdf/IncidentReportPDF';
import IncidentHistory from './IncidentHistory';
import palette from '../../../utils/palette';

const IncidentDetailModal = ({ show, onHide, incident }) => {
  if (!incident) return null;

  return (
    <Dialog 
      open={show} 
      onClose={onHide}
      fullWidth
      maxWidth="lg"
      aria-labelledby="incident-detail-title"
      PaperProps={{
        sx: {
          borderRadius: 1,
          maxHeight: '90vh',
          position: 'relative' 
        }
      }}
    >
      <DialogTitle 
        id="incident-detail-title"
        sx={{ 
          bgcolor: palette.celeste, 
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2
        }}
      >
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Detalle del incidente
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onHide}
          aria-label="close"
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0, pb: 7 }}> 
        <Grid container>
          {/* Columna izquierda - Información del incidente */}
          <Grid item xs={12} md={6} sx={{ 
            borderRight: { xs: 0, md: 1 }, 
            borderColor: 'divider',
            p: 3
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: palette.celeste, 
                mb: 2, 
                fontWeight: 600,
                fontSize: '1.125rem'
              }}
            >
              Información del incidente
            </Typography>
            
            {incident.image_url && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  p: 1
                }}>
                  <img 
                    src={incident.image_url}
                    alt="Imagen del incidente"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      objectFit: 'contain',
                      borderRadius: '4px'
                    }}
                  />
                </Box>
              </Box>
            )}
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ fontWeight: 'bold', minWidth: 120 }}>Descripción:</Typography>
                <Typography sx={{ flex: 1 }}>{incident.description}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ fontWeight: 'bold', minWidth: 120 }}>Prioridad:</Typography>
                <Typography>{incident.priority}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ fontWeight: 'bold', minWidth: 120 }}>Estado:</Typography>
                <Typography>{incident.status?.name || incident.incident_status?.name || "No disponible"}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ fontWeight: 'bold', minWidth: 120 }}>Tipo:</Typography>
                <Typography>{incident.type?.name || incident.incident_type?.name || "No disponible"}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ fontWeight: 'bold', minWidth: 120 }}>Reportado por:</Typography>
                <Typography>{incident.reporter?.name || incident.app_user_incident_user_idToapp_user?.first_name + ' ' + incident.app_user_incident_user_idToapp_user?.last_name || "No disponible"}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex' }}>
                <Typography sx={{ fontWeight: 'bold', minWidth: 120 }}>Responsable:</Typography>
                <Typography>{incident.admin?.name || incident.app_user_incident_assigned_admin_idToapp_user?.first_name + ' ' + incident.app_user_incident_assigned_admin_idToapp_user?.last_name || "No asignado"}</Typography>
              </Box>
            </Box>
          </Grid>
          
          {/* Columna derecha - Historial de cambios */}
          <Grid item xs={12} md={6} sx={{ 
            p: 3,
            borderTop: { xs: 1, md: 0 },
            borderColor: 'divider',
            maxHeight: { xs: 'auto', md: '80vh' },
            overflow: 'auto'
          }}>
            <IncidentHistory 
              history={incident.history || incident.incident_history || []} 
              hideTitle={false}
            />
          </Grid>
        </Grid>
        
        <Box
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 24,
            zIndex: 1000
          }}
        >
          <PDFDownloadLink
            document={<IncidentReportPDF incident={incident} />}
            fileName={`informe_incidente_${incident.id}.pdf`}
          >
            {({ loading }) => (
              <Fab
                variant="extended"
                sx={{
                  backgroundColor: palette.celeste,
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#0082a0',
                  },
                  boxShadow: 3
                }}
                disabled={loading}
              >
                <PictureAsPdfIcon sx={{ mr: 1 }} />
                {loading ? 'Generando...' : 'GENERAR INFORME'}
              </Fab>
            )}
          </PDFDownloadLink>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default IncidentDetailModal;