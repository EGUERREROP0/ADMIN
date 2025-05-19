import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';
import {
  getIncidentTypes,
  createIncidentType,
  deleteIncidentType
} from './services/typeIncidentService';
import palette from './utils/palette';

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
      <div style={{ maxWidth: 600, margin: '2rem auto', background: palette.blanco, borderRadius: 12, boxShadow: '0 2px 8px #00AEEF22', padding: 32 }}>
        <h2 style={{ color: palette.celeste, marginBottom: 24 }}>Tipos de Incidente</h2>
        <form onSubmit={handleAddType} style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
          <input
            type="text"
            placeholder="Nuevo tipo de incidente"
            value={newType}
            onChange={e => setNewType(e.target.value)}
            style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
          <button
            type="submit"
            style={{
              background: palette.celeste,
              color: palette.blanco,
              border: 'none',
              borderRadius: 6,
              padding: '8px 18px',
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer'
            }}
          >
            Agregar
          </button>
        </form>
        {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', background: palette.grisClaro }}>
            <thead>
              <tr style={{ background: palette.celeste, color: palette.blanco }}>
                <th style={{ padding: 10, borderRadius: '8px 0 0 0' }}>ID</th>
                <th style={{ padding: 10 }}>Nombre</th>
                <th style={{ padding: 10, borderRadius: '0 8px 0 0' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {types.map(type => (
                <tr key={type.id} style={{ background: palette.blanco }}>
                  <td style={{ padding: 10, textAlign: 'center' }}>{type.id}</td>
                  <td style={{ padding: 10 }}>{type.name}</td>
                  <td style={{ padding: 10, textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(type.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0
                      }}
                      title="Eliminar"
                    >
                      <FaTrash size={22} color={palette.rojo} />
                    </button>
                  </td>
                </tr>
              ))}
              {types.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ padding: 16, textAlign: 'center', color: palette.grisOscuro }}>
                    No hay tipos de incidente registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </MainLayout>
  );
};

export default TypeIncidentList;