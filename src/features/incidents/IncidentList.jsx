import React, { useEffect, useState } from 'react';
import {
  getIncidents,
  getIncidentStatuses,
  updateIncidentStatus,
  getIncidentTypes
} from './incidentService';
import MainLayout from '../../layouts/MainLayout';
import CustomModal from '../../components/Modal';
import CustomButton from '../../components/Button/CustomButton';
import Table from '../../components/Table/Table';
import IncidentFilters from './IncidentFilters';
import IncidentCards from './IncidentCards';

const palette = {
  celeste: '#00AEEF',
  blanco: '#fff',
  grisClaro: '#f8f9fa',
  grisMedio: '#e6f7fb',
  amarillo: '#FFD600',
  azul: '#2196F3',
  verde: '#43A047',
  grisOscuro: '#757575',
  naranja: '#FF9800'
};

const statusColors = {
  pendiente: palette.amarillo,
  en_progreso: palette.azul,
  resuelto: palette.verde,
  cerrado: palette.grisOscuro,
  re_abierto: palette.naranja
};

// Variables para modo oscuro
const tableHeaderColor = 'var(--color-table-header, #009fc3)';
const tableRowEven = 'var(--color-table-row-even, #f6f7fb)';
const tableRowOdd = 'var(--color-table-row-odd, #fff)';
const tableTextColor = 'var(--color-text, #222)';
const moduleBg = 'var(--color-module, #f8f9fa)';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [newStatusId, setNewStatusId] = useState('');
  const [updating, setUpdating] = useState(false);

  // Filtros
  const [prioridad, setPrioridad] = useState('');
  const [estado, setEstado] = useState('');
  const [tipo, setTipo] = useState('');
  const [search, setSearch] = useState('');
  const [tiposIncidente, setTiposIncidente] = useState([]);

  // Vista: tabla o tarjetas
  const [vista, setVista] = useState('tabla'); // 'tabla' o 'tarjetas'

  useEffect(() => {
    getIncidentStatuses()
      .then(data => setStatuses(Array.isArray(data) ? data : []))
      .catch(() => setError('No se pudieron cargar los estados.'));
    getIncidentTypes()
      .then(data => setTiposIncidente(Array.isArray(data) ? data : []))
      .catch(() => setError('No se pudieron cargar los tipos.'));
  }, []);

  useEffect(() => {
    fetchIncidents();
    // eslint-disable-next-line
  }, [prioridad, estado, tipo, search]);

  const fetchIncidents = () => {
    setLoading(true);
    getIncidents({
      priority: prioridad,
      status_id: estado,
      type_id: tipo,
      search
    })
      .then(data => setIncidents(Array.isArray(data) ? data : []))
      .catch(() => setError('No se pudieron cargar los incidentes.'))
      .finally(() => setLoading(false));
  };

  const handleOpenStatusModal = (incident) => {
    setSelectedIncident(incident);
    setError('');
    setSuccess('');
    setNewStatusId('');
    setShowStatusModal(true);
  };

  const handleUpdateStatus = async () => {
    if (!newStatusId) {
      setError('Selecciona un estado.');
      return;
    }
    setUpdating(true);
    setError('');
    try {
      await updateIncidentStatus(selectedIncident.id, newStatusId);
      setSuccess('Estado actualizado correctamente.');
      setShowStatusModal(false);
      fetchIncidents();
    } catch {
      setError('No se pudo actualizar el estado.');
    } finally {
      setUpdating(false);
    }
  };

  const columns = [
    {
      key: 'id',
      title: 'ID',
      dataIndex: 'id'
    },
    {
      key: 'imagen',
      title: 'Imagen',
      render: (inc) =>
        inc.image_url ? (
          <img
            src={inc.image_url}
            alt="Incidente"
            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }}
          />
        ) : (
          <span style={{ color: '#bbb', fontSize: 12 }}>Sin imagen</span>
        )
    },
    {
      key: 'tipo',
      title: 'Tipo',
      render: (inc) => inc.incident_type?.name || '-'
    },
    {
      key: 'prioridad',
      title: 'Prioridad',
      render: (inc) => inc.priority?.name || inc.priority || '-'
    },
    {
      key: 'estado',
      title: 'Estado',
      render: (inc) => {
        const estado = inc.incident_status?.name || '-';
        const color = statusColors[estado] || palette.celeste;
        return (
          <span
            style={{
              background: color,
              color: '#fff',
              padding: '0.25rem 0.75rem',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 14,
              textTransform: 'capitalize'
            }}
          >
            {estado.replace('_', ' ')}
          </span>
        );
      }
    },
    {
      key: 'fecha',
      title: 'Fecha',
      render: (inc) => inc.report_date ? inc.report_date.slice(0, 10) : '-'
    },
    {
      key: 'reportado',
      title: 'Reportado por',
      render: (inc) =>
        inc.user
          ? `${inc.user.first_name || ''} ${inc.user.last_name || ''}`.trim() || '-'
          : '-'
    },
    {
      key: 'acciones',
      title: 'Acciones',
      render: (inc) => (
        <CustomButton
          type="button"
          onClick={() => handleOpenStatusModal(inc)}
        >
          Cambiar estado
        </CustomButton>
      )
    }
  ];

  return (
    <MainLayout>
      <div
        className="module-container"
        style={{
          background: moduleBg,
          borderRadius: 16,
          padding: '2rem',
          margin: '1rem 0',
          boxShadow: '0 2px 8px #00AEEF11',
          color: tableTextColor
        }}
      >
        <h3 style={{ color: palette.celeste, fontWeight: 700 }}>Incidentes</h3>
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

        {/* Selector de vista */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <button
            onClick={() => setVista('tabla')}
            style={{
              background: vista === 'tabla' ? '#2c3a59' : '#fff',
              color: vista === 'tabla' ? '#fff' : '#2c3a59',
              border: '1px solid #2c3a59',
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
              background: vista === 'tarjetas' ? '#2c3a59' : '#fff',
              color: vista === 'tarjetas' ? '#fff' : '#2c3a59',
              border: '1px solid #2c3a59',
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
              <Table
                columns={columns}
                data={incidents}
                rowKey="id"
                loading={loading}
                headerStyle={{ background: tableHeaderColor, color: '#fff' }}
                rowStyle={(_, idx) => ({
                  background: idx % 2 === 1 ? tableRowEven : tableRowOdd,
                  color: tableTextColor
                })}
              />
            ) : (
              <IncidentCards
                incidents={incidents}
                onChangeStatus={handleOpenStatusModal}
              />
            )}
          </>
        )}

        {/* Modal para cambiar estado */}
        <CustomModal
          show={showStatusModal}
          onHide={() => setShowStatusModal(false)}
          title="Cambiar estado del incidente"
        >
          <div style={{ background: palette.grisClaro, borderRadius: 8, padding: 16 }}>
            <p>
              <b>Incidente ID:</b> {selectedIncident?.id}
            </p>
            <label style={{ color: palette.celeste, fontWeight: 600 }}>
              Nuevo estado:
            </label>
            <select
              className="form-select mt-2"
              value={newStatusId}
              onChange={e => setNewStatusId(e.target.value)}
              style={{ borderColor: palette.celeste, fontWeight: 500 }}
              disabled={updating}
            >
              <option value="">Selecciona...</option>
              {statuses.map(status => (
                <option key={status.id} value={status.id}>
                  {status.name.charAt(0).toUpperCase() + status.name.slice(1).replace('_', ' ')}
                </option>
              ))}
            </select>
            <div className="d-flex justify-content-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowStatusModal(false)}
                disabled={updating}
              >
                Cancelar
              </button>
              <CustomButton
                type="button"
                onClick={handleUpdateStatus}
                disabled={updating}
              >
                {updating ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Actualizando...
                  </span>
                ) : (
                  'Actualizar'
                )}
              </CustomButton>
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </div>
        </CustomModal>
      </div>
      {/* Estilos para modo oscuro en tablas y módulo */}
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
        `}
      </style>
    </MainLayout>
  );
};

export default IncidentList;