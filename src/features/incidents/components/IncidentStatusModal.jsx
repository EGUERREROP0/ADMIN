import React from 'react';
import CustomModal from '../../../components/Modal';
import CustomButton from '../../../components/Button/CustomButton';
import palette from '../../../utils/palette';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Alert,
  CircularProgress,
  TextField
} from '@mui/material';

const IncidentStatusModal = ({
  show,
  onHide,
  incident,
  statuses,
  newStatusId,
  setNewStatusId,
  updating,
  onUpdateStatus,
  error,
  coment,
  setComent
}) => {
  const estadoSeleccionado = statuses.find(s => s.id === newStatusId);
  const requiereComentario =
    estadoSeleccionado &&
    (estadoSeleccionado.name?.toLowerCase() === 'resuelto' ||
      estadoSeleccionado.name?.toLowerCase() === 'cerrado');

  return (
    <CustomModal show={show} onHide={onHide} title="Cambiar estado">
      <Box
        sx={{
          background: palette.grisClaro,
          borderRadius: 2,
          p: 3,
          fontFamily: 'Nunito, Arial, sans-serif'
        }}
      >
        <Typography sx={{ mb: 2 }}>
          <b>Incidente ID:</b> {incident?.id}
        </Typography>
        <FormControl fullWidth size="small" sx={{ mb: 3 }}>
          <InputLabel id="status-select-label" sx={{ fontWeight: 600 }}>
            Nuevo estado
          </InputLabel>
          <Select
            labelId="status-select-label"
            value={newStatusId}
            label="Nuevo estado"
            onChange={e => setNewStatusId(e.target.value)}
            disabled={updating}
            sx={{
              fontWeight: 500,
              borderColor: palette.celeste,
              background: '#fff'
            }}
          >
            <MenuItem value="">Selecciona...</MenuItem>
            {statuses.map(status => (
              <MenuItem key={status.id} value={status.id}>
                {status.name.charAt(0).toUpperCase() + status.name.slice(1).replace('_', ' ')}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {requiereComentario && (
          <TextField
            label="Comentario"
            value={coment}
            onChange={e => setComent(e.target.value)}
            fullWidth
            multiline
            minRows={2}
            maxRows={5}
            required
            disabled={updating}
            sx={{ mb: 2 }}
            placeholder="Agrega un comentario para este cambio de estado"
          />
        )}

        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
          <CustomButton
            type="button"
            onClick={onHide}
            disabled={updating}
            style={{
              background: '#919291',
              color: '#fff'
            }}
          >
            Cancelar
          </CustomButton>
          <CustomButton
            type="button"
            onClick={onUpdateStatus}
            disabled={updating}
            style={{ minWidth: 120 }}
          >
            {updating ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CircularProgress size={18} color="inherit" sx={{ mr: 1 }} />
                Actualizando...
              </span>
            ) : (
              'Actualizar'
            )}
          </CustomButton>
        </Stack>
        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
      </Box>
    </CustomModal>
  );
};

export default IncidentStatusModal;