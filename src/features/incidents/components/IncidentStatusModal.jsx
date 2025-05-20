import React from 'react';
import CustomModal from '../../../components/Modal';
import CustomButton from '../../../components/Button/CustomButton';
import palette from '../../../utils/palette';

const IncidentStatusModal = ({
  show,
  onHide,
  incident,
  statuses,
  newStatusId,
  setNewStatusId,
  updating,
  onUpdateStatus,
  error
}) => (
  <CustomModal show={show} onHide={onHide} title="Cambiar estado">
    <div style={{ background: palette.grisClaro, borderRadius: 8, padding: 16 }}>
      <p>
        <b>Incidente ID:</b> {incident?.id}
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
          onClick={onHide}
          disabled={updating}
        >
          Cancelar
        </button>
        <CustomButton
          type="button"
          onClick={onUpdateStatus}
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
);

export default IncidentStatusModal;