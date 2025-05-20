import React, { useState } from 'react';
import palette from '../../../utils/palette';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Dialog,
  DialogContent,
  Chip,
  Stack
} from '@mui/material';
import ActionMenu from './ActionMenu';

const IncidentCards = ({
  incidents,
  onChangeStatus,
  onDelete,
  onDetail
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');

  const handleImgClick = (imgUrl) => {
    setModalImg(imgUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImg('');
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {incidents.map((incident) => (
          <Card
            key={incident.id}
            sx={{
              borderRadius: 1,
              boxShadow: '0 2px 8px #00AEEF22',
              minWidth: 300,
              maxWidth: 340,
              flex: '1 1 300px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              fontFamily: 'Nunito, Arial, sans-serif',
              position: 'relative'
            }}
          >
            {/* Menú de acciones en la esquina superior derecha */}
            <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
              <ActionMenu
                incident={incident}
                onChangeStatus={onChangeStatus}
                onDelete={onDelete}
                onDetail={onDetail}
                iconColor="#fff" // Cambia el color de los tres puntitos a blanco
              />
            </Box>
            {incident.image_url && (
              <CardMedia
                component="img"
                height="200"
                image={incident.image_url}
                alt="Incidente"
                sx={{
                  objectFit: 'cover',
                  cursor: 'pointer',
                  background: '#f4f4f4'
                }}
                onClick={() => handleImgClick(incident.image_url)}
                title="Ver imagen completa"
              />
            )}
            <CardContent sx={{ p: 2.5 }}>
              <Stack spacing={1}>
                <Typography variant="caption" color="text.secondary">
                  ID: <b style={{ color: palette.celeste }}>{`INC-${incident.id.toString().padStart(3, '0')}`}</b>
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {incident.description}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="caption" color="text.secondary">Prioridad:</Typography>
                  <Chip
                    label={incident.priority}
                    size="small"
                    sx={{
                      bgcolor: palette.celeste,
                      color: '#fff',
                      fontWeight: 700,
                      fontFamily: 'Nunito, Arial, sans-serif'
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="caption" color="text.secondary">Tipo:</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    {incident.incident_type?.name}
                  </Typography>
                </Stack>
                <Typography variant="caption" color="text.secondary">
                  Reportado: {incident.report_date?.slice(0, 10)}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Dialog open={modalOpen} onClose={closeModal} maxWidth="md">
        <DialogContent sx={{ p: 0, background: palette.blanco }}>
          <img
            src={modalImg}
            alt="Incidente grande"
            style={{
              maxWidth: '90vw',
              maxHeight: '80vh',
              borderRadius: 12,
              display: 'block',
              margin: 'auto'
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default IncidentCards;