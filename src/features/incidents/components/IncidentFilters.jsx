import React from 'react';
import { Box, Paper, FormControl, Select, MenuItem, InputLabel, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const IncidentFilters = ({
  prioridad,
  setPrioridad,
  estado,
  setEstado,
  tipo,
  setTipo,
  tiposIncidente,
  estados,
  search,
  setSearch
}) => (
  <Paper
    elevation={2}
    sx={{
      borderRadius: 2,
      boxShadow: '0 2px 8px #0001',
      p: 2.5,
      mb: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 3,
      background: 'var(--color-module, #fff)',
      flexWrap: 'wrap'
    }}
    className="incident-filters-container"
  >
    {/* Filtros a la izquierda */}
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel id="prioridad-label">Prioridad</InputLabel>
        <Select
          labelId="prioridad-label"
          value={prioridad}
          label="Prioridad"
          onChange={e => setPrioridad(e.target.value)}
        >
          <MenuItem value="">Todas las prioridades</MenuItem>
          <MenuItem value="Alta">Alta</MenuItem>
          <MenuItem value="Media">Media</MenuItem>
          <MenuItem value="Baja">Baja</MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel id="estado-label">Estado</InputLabel>
        <Select
          labelId="estado-label"
          value={estado}
          label="Estado"
          onChange={e => setEstado(e.target.value)}
        >
          <MenuItem value="">Todos los estados</MenuItem>
          {estados.map(est => (
            <MenuItem key={est.id} value={est.id}>
              {est.name.replace('_', ' ')}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel id="tipo-label">Tipo</InputLabel>
        <Select
          labelId="tipo-label"
          value={tipo}
          label="Tipo"
          onChange={e => setTipo(e.target.value)}
        >
          <MenuItem value="">Todos los tipos</MenuItem>
          {tiposIncidente.map(t => (
            <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
    {/* Buscador a la derecha */}
    <Box
      component="form"
      onSubmit={e => e.preventDefault()}
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: 'var(--color-module, #fff)',
        borderRadius: 1,
        boxShadow: '0 1px 4px #0001',
        height: 40,
        minWidth: 200
      }}
    >
      <TextField
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar incidente..."
        size="small"
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1,
            fontSize: 16,
            background: 'var(--color-module, #fff)'
          },
          minWidth: 160
        }}
        InputProps={{
          endAdornment: (
            <IconButton type="submit" tabIndex={-1} sx={{ color: '#2c3a59' }}>
              <SearchIcon />
            </IconButton>
          )
        }}
      />
    </Box>
  </Paper>
);

export default IncidentFilters;