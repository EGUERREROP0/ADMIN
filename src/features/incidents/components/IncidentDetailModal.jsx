import React from 'react';
import CustomModal from '../../../components/Modal';
import IncidentHistory from './IncidentHistory';
import { PDFDownloadLink } from '@react-pdf/renderer';
import IncidentReportPDF from '../pdf/IncidentReportPDF';

const IncidentDetailModal = ({ show, onHide, incident }) => (
  <CustomModal show={show} onHide={onHide} title="Detalle del incidente">
    {incident && (
      <div>
        <p><b>ID:</b> {incident.id}</p>
        <p><b>Descripción:</b> {incident.description}</p>
        <p><b>Prioridad:</b> {incident.priority}</p>
        <p><b>Estado:</b> {incident.incident_status?.name}</p>
        <p><b>Tipo:</b> {incident.incident_type?.name}</p>
        <p><b>Reportado por:</b> {incident.app_user_incident_user_idToapp_user?.first_name} {incident.app_user_incident_user_idToapp_user?.last_name}</p>
        <p><b>Responsable:</b> {incident.app_user_incident_assigned_admin_idToapp_user
          ? `${incident.app_user_incident_assigned_admin_idToapp_user.first_name} ${incident.app_user_incident_assigned_admin_idToapp_user.last_name}`
          : 'Sin responsable'}
        </p>
        <IncidentHistory history={incident.incident_history || []} />

        {/* Botón para descargar PDF al final */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
          <PDFDownloadLink
            document={<IncidentReportPDF incident={incident} />}
            fileName={`informe_incidente_${incident.id}.pdf`}
            style={{
              background: '#009fc3',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '8px 18px',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none'
            }}
          >
            {({ loading }) => loading ? 'Generando PDF...' : 'GENERAR INFORME'}
          </PDFDownloadLink>
        </div>
      </div>
    )}
  </CustomModal>
);

export default IncidentDetailModal;