import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';
import {
  getIncidentTypes,
  createIncidentType,
  deleteIncidentType
} from './services/typeIncidentService';
import palette from '../../utils/palette';
import CustomButton from '../../components/Button/CustomButton';
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
  IconButton,
} from '@mui/material';

const tableRowEven = '#f4f8fb';
const tableRowOdd = '#fff';

const TypeIncidentList = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newType, setNewType] = useState('');
  const [error, setError] = useState('');

  const fetchTypes = async () => {
    setLoading(true);
    try {
      const data = await getIncidentTypes();
      setTypes(data);
    } catch {
      setError('Error al cargar los tipos de incidente');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTypes();
  }, []);

  const handleAddType = async (e) => {
    e.preventDefault();
    if (!newType.trim()) return;
    try {
      await createIncidentType({ name: newType.trim() });
      setNewType('');
      fetchTypes();
      Swal.fire('¡Éxito!', 'Tipo de incidente creado correctamente.', 'success');
    } catch {
      setError('No se pudo crear el tipo de incidente');
      Swal.fire('Error', 'No se pudo crear el tipo de incidente', 'error');
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el tipo de incidente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: palette.naranja,
      cancelButtonColor: palette.celeste,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (!result.isConfirmed) return;
    try {
      await deleteIncidentType(id);
      fetchTypes();
      Swal.fire('Eliminado', 'Tipo de incidente eliminado correctamente.', 'success');
    } catch {
      setError('No se pudo eliminar el tipo de incidente');
      Swal.fire('Error', 'No se pudo eliminar el tipo de incidente', 'error');
    }
  };

  return (
    <MainLayout>
      <div style={{
        maxWidth: 600,
        margin: '2rem auto',
        background: palette.blanco,
        borderRadius: 12,
        boxShadow: '0 2px 8px #00AEEF22',
        padding: 32
      }}>
        <h2 style={{
          color: palette.celeste,
          marginBottom: 24,
          fontFamily: 'Nunito, Arial, sans-serif'
        }}>
          Tipos de Incidente
        </h2>
        <form onSubmit={handleAddType} style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Nuevo tipo de incidente"
            value={newType}
            onChange={e => setNewType(e.target.value)}
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 6,
              border: '1px solid #ccc',
              fontSize: 16,
              fontFamily: 'Nunito, Arial, sans-serif'
            }}
          />
          <CustomButton type="submit">
            AGREGAR
          </CustomButton>
        </form>
        {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
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
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>NOMBRE</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 700 }}>ACCIONES</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <CircularProgress color="primary" />
                  </TableCell>
                </TableRow>
              ) : types.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography color="text.secondary" sx={{ py: 3 }}>
                      No hay tipos de incidente registrados.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                types.map((type, idx) => (
                  <TableRow
                    key={type.id}
                    sx={{
                      background: idx % 2 === 1 ? tableRowEven : tableRowOdd,
                      color: '#232323',
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
                  >
                    <TableCell align="center">{type.id}</TableCell>
                    <TableCell>{type.name}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => handleDelete(type.id)}
                        title="Eliminar"
                        sx={{
                          color: palette.rojo,
                          '&:hover': {
                            background: palette.grisClaro
                          }
                        }}
                      >
                        <FaTrash size={20} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </MainLayout>
  );
};

export default TypeIncidentList;