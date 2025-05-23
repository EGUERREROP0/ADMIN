import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import IncidentFilters from './components/IncidentFilters';
import IncidentCards from './components/IncidentCards';
import IncidentDetailModal from './components/IncidentDetailModal';
import IncidentStatusModal from './components/IncidentStatusModal';
import { useIncidentList } from './hooks/useIncidentList';
import palette from '../../utils/palette';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import IncidentTable from './components/IncidentTable';
import { updateIncidentStatus } from './services/incidentService';

const MySwal = withReactContent(Swal);

const tableTextColor = 'var(--color-text, #222)';
const moduleBg = 'var(--color-module, #f8f9fa)';

const IncidentList = () => {
  const {
    incidents,
    loading,
    error,
    statuses,
    tiposIncidente,
    prioridad,
    setPrioridad,
    estado,
    setEstado,
    tipo,
    setTipo,
    search,
    setSearch,
    fetchIncidents,
    setError
  } = useIncidentList();

  useEffect(() => {
    if (incidents && incidents.length > 0) {
      console.log('Incidentes recibidos:', incidents);
    }
  }, [incidents]);

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [newStatusId, setNewStatusId] = useState('');
  const [updating, setUpdating] = useState(false);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailIncident, setDetailIncident] = useState(null);

  const [success, setSuccess] = useState('');
  const [coment, setComent] = useState('');

  const handleOpenStatusModal = (incident) => {
    setSelectedIncident(incident);
    setError('');
    setSuccess('');
    setNewStatusId('');
    setComent('');
    setShowStatusModal(true);
  };

  const handleUpdateStatus = async () => {
    if (!newStatusId) {
      setError('Selecciona un estado.');
      return;
    }

    const estadoSeleccionado = statuses.find(s => s.id === newStatusId);
    const nombreEstado = estadoSeleccionado?.name?.toLowerCase() || '';

    if ((nombreEstado === 'resuelto' || nombreEstado === 'cerrado') && !coment.trim()) {
      setError('El comentario es obligatorio para los estados "Resuelto" o "Cerrado".');
      return;
    }

    setUpdating(true);
    setError('');
    try {
      console.log('Intentando cambiar a estado ID:', newStatusId, 'con comentario:', coment);
      await updateIncidentStatus(selectedIncident.id, newStatusId, coment);
      setSuccess('Estado actualizado correctamente.');
      setShowStatusModal(false);
      fetchIncidents();
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      if (error?.response?.data) {
        console.log('Mensaje del backend:', error.response.data);
        setError(error.response.data.message || error.response.data.error || 'No se pudo actualizar el estado.');
      } else {
        setError('No se pudo actualizar el estado.');
      }
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteIncident = async (incident) => {
    const result = await MySwal.fire({
      title: '¿Eliminar incidente?',
      html: `¿Seguro que deseas eliminar el incidente <b>ID ${incident.id}</b>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: palette.rojo,
      cancelButtonColor: '#495057'
    });
    if (!result.isConfirmed) return;
    try {
      await import('./services/incidentService').then(({ deleteIncident }) =>
        deleteIncident(incident.id)
      );
      await MySwal.fire('Eliminado', 'Incidente eliminado correctamente.', 'success');
      fetchIncidents();
    } catch {
      await MySwal.fire('Error', 'No se pudo eliminar el incidente.', 'error');
    }
  };

  const handleShowDetail = (incident) => {
    setDetailIncident(incident);
    setShowDetailModal(true);
  };

  const [vista, setVista] = useState('tabla');

  return (
    <MainLayout>
      <div
        className="module-container"
        style={{
          background: moduleBg,
          borderRadius: 1,
          padding: '2rem',
          margin: '1rem 0',
          boxShadow: '0 2px 8px #00AEEF11',
          color: tableTextColor
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h3 style={{ color: palette.celeste, fontWeight: 700, margin: 0 }}>
            Incidentes
          </h3>
          <span role="img" aria-label="Saludo" style={{ fontSize: 32, marginTop: 2 }}>👋</span>
        </div>
        <IncidentFilters
          prioridad={prioridad}
          setPrioridad={setPrioridad}
          estado={estado}
          setEstado={setEstado}
          tipo={tipo}
          setTipo={setTipo}
          tiposIncidente={tiposIncidente}
          estados={statuses}
          search={search}
          setSearch={setSearch}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <button
            onClick={() => setVista('tabla')}
            style={{
              background: vista === 'tabla' ? '#009fc3' : '#fff',
              color: vista === 'tabla' ? '#fff' : '#2c3a59',
              border: '1px solid #009fc3',
              borderRadius: '6px 0 0 6px',
              padding: '6px 18px',
              cursor: 'pointer'
            }}
          >
            Tabla
          </button>
          <button
            onClick={() => setVista('tarjetas')}
            style={{
              background: vista === 'tarjetas' ? '#009fc3' : '#fff',
              color: vista === 'tarjetas' ? '#fff' : '#2c3a59',
              border: '1px solid #009fc3',
              borderLeft: 'none',
              borderRadius: '0 6px 6px 0',
              padding: '6px 18px',
              cursor: 'pointer'
            }}
          >
            Tarjetas
          </button>
        </div>

        {loading ? (
          <div className="d-flex align-items-center" style={{ minHeight: 120 }}>
            <div className="spinner-border text-info me-2" role="status" />
            <span style={{ color: palette.celeste }}>Cargando...</span>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <>
            {success && <div className="alert alert-success">{success}</div>}
            {vista === 'tabla' ? (
              <IncidentTable
                incidents={incidents}
                loading={loading}
                onChangeStatus={handleOpenStatusModal}
                onDelete={handleDeleteIncident}
                onDetail={handleShowDetail}
              />
            ) : (
              <IncidentCards
                incidents={incidents}
                onChangeStatus={handleOpenStatusModal}
              />
            )}
          </>
        )}

        <IncidentStatusModal
          show={showStatusModal}
          onHide={() => setShowStatusModal(false)}
          incident={selectedIncident}
          statuses={statuses}
          newStatusId={newStatusId}
          setNewStatusId={setNewStatusId}
          updating={updating}
          onUpdateStatus={handleUpdateStatus}
          error={error}
          coment={coment}
          setComent={setComent}
        />

        <IncidentDetailModal
          show={showDetailModal}
          onHide={() => setShowDetailModal(false)}
          incident={detailIncident}
        />
      </div>
      <style>
        {`
          .module-container {
            transition: background 0.3s, color 0.3s;
          }
          .table, .table thead, .table tbody, .table tr, .table th, .table td {
            background: var(--color-table, #fff) !important;
            color: var(--color-text, #222) !important;
            transition: background 0.3s, color 0.3s;
          }
          body.dark-mode .table, 
          body.dark-mode .table thead, 
          body.dark-mode .table tbody, 
          body.dark-mode .table tr, 
          body.dark-mode .table th, 
          body.dark-mode .table td {
            background: var(--color-table, #23272f) !important;
            color: var(--color-text, #f1f1f1) !important;
          }
          .table thead tr th {
            background: #009fc3 !important;
            color: #fff !important;
          }
          body.dark-mode .table thead tr th {
            background: #007a99 !important;
            color: #fff !important;
          }
        `}
      </style>
    </MainLayout>
  );
};

export default IncidentList;