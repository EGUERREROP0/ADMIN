import React from 'react';
import Table from '../../../components/Table/Table';
import ActionMenu from './ActionMenu';
import palette from '../utils/palette';
import statusColors from '../utils/statusColors';

const tableHeaderColor = '#009fc3';
const tableRowEven = 'var(--color-table-row-even, #f6f7fb)';
const tableRowOdd = 'var(--color-table-row-odd, #fff)';
const tableTextColor = 'var(--color-text, #222)';

const IncidentTable = ({
  incidents,
  loading,
  onChangeStatus,
  onDelete,
  onDetail,
}) => {
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
        inc.app_user_incident_user_idToapp_user
          ? (
              <div>
                <div>{`${inc.app_user_incident_user_idToapp_user.first_name || ''} ${inc.app_user_incident_user_idToapp_user.last_name || ''}`.trim() || '-'}</div>
                <div style={{ fontSize: 13, color: '#888' }}>{inc.app_user_incident_user_idToapp_user.email || ''}</div>
              </div>
            )
          : '-'
    },
    {
      key: 'responsable',
      title: 'Responsable',
      render: (inc) =>
        inc.app_user_incident_assigned_admin_idToapp_user
          ? (
              <div>
                <div>
                  {inc.app_user_incident_assigned_admin_idToapp_user.first_name} {inc.app_user_incident_assigned_admin_idToapp_user.last_name}
                </div>
                <div style={{ fontSize: 13, color: '#888' }}>
                  {inc.app_user_incident_assigned_admin_idToapp_user.email}
                </div>
              </div>
            )
          : <span style={{ color: '#bbb', fontSize: 12 }}>Sin responsable</span>
    },
    {
      key: 'acciones',
      title: 'Acciones',
      render: (inc) => (
        <ActionMenu
          onChangeStatus={() => onChangeStatus(inc)}
          onDelete={() => onDelete(inc)}
          onDetail={() => onDetail(inc)}
        />
      )
    }
  ];

  return (
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
  );
};

export default IncidentTable;