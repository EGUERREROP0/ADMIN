import React from 'react';
import CustomModal from '../../../components/Modal';

const AssignIncidentTypeModal = ({
  show,
  onHide,
  incidentTypes,
  incidentTypeId,
  setIncidentTypeId,
  onAssign,
  assigning
}) => (
  <CustomModal show={show} onHide={onHide} title="Asignar tipo de incidente">
    <div>
      <label>Tipo de incidente:</label>
      <select
        className="form-select mt-2"
        value={incidentTypeId}
        onChange={e => setIncidentTypeId(e.target.value)}
      >
        <option value="">Selecciona...</option>
        {(incidentTypes || []).map(type => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="btn btn-primary mt-3"
        onClick={onAssign}
        disabled={assigning}
      >
        {assigning ? 'Asignando...' : 'Asignar'}
      </button>
    </div>
  </CustomModal>
);

export default AssignIncidentTypeModal;