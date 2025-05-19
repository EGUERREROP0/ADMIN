import React, { useState } from 'react';
import palette from '../utils/palette';

const IncidentCards = ({ incidents, onChangeStatus }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');

  const handleImgClick = (imgUrl) => {
    setModalImg(imgUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImg('');
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        {incidents.map((incident) => (
          <div
            key={incident.id}
            style={{
              background: palette.blanco,
              borderRadius: 12,
              boxShadow: '0 2px 8px #0001',
              padding: 0,
              minWidth: 300,
              maxWidth: 340,
              flex: '1 1 300px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              overflow: 'hidden'
            }}
          >
            {incident.image_url && (
              <div
                style={{
                  width: '100%',
                  height: 120,
                  background: '#f4f4f4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                onClick={() => handleImgClick(incident.image_url)}
                title="Ver imagen completa"
              >
                <img
                  src={incident.image_url}
                  alt="Incidente"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            )}
            <div style={{ padding: 20, width: '100%' }}>
              <div style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>
                ID: <b style={{ color: palette.celeste }}>{`INC-${incident.id.toString().padStart(3, '0')}`}</b>
              </div>
              <div style={{ marginBottom: 8 }}>
                {incident.description}
              </div>
              <div style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>
                Prioridad: <b>{incident.priority}</b>
              </div>
              <div style={{ fontSize: 14, color: '#888', marginBottom: 4 }}>
                Tipo: <b>{incident.incident_type?.name}</b>
              </div>
              <div style={{ fontSize: 14, color: '#888', marginBottom: 12 }}>
                Reportado: {incident.report_date?.slice(0, 10)}
              </div>
              <button
                style={{
                  background: palette.celeste,
                  color: palette.blanco,
                  border: 'none',
                  borderRadius: 8,
                  padding: '8px 18px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: 15
                }}
                onClick={() => onChangeStatus && onChangeStatus(incident)}
              >
                Cambiar estado
              </button>
            </div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <img
            src={modalImg}
            alt="Incidente grande"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: 12,
              boxShadow: '0 4px 24px #0008',
              background: palette.blanco
            }}
          />
        </div>
      )}
    </>
  );
};

export default IncidentCards;