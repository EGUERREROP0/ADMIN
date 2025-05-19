import React from 'react';
import CustomModal from '../../../components/Modal';
import IncidentHistory from './IncidentHistory';

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
      </div>
    )}
  </CustomModal>
);

export default IncidentDetailModal;