import React from 'react';

const IncidentHistory = ({ history = [] }) => (
  <div>
    <h4 style={{ color: '#00AEEF', marginBottom: 16 }}>Historial de cambios</h4>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {history.length === 0 && (
        <li style={{ color: '#888' }}>Sin historial de cambios.</li>
      )}
      {history.map(hist => (
        <li key={hist.id} style={{ marginBottom: 18, background: '#f8f9fa', borderRadius: 8, padding: 12 }}>
          <div style={{ color: '#00AEEF', fontWeight: 600 }}>
            🕒 {new Date(hist.change_date).toLocaleString()}
          </div>
          <div style={{ margin: '6px 0' }}>{hist.comment}</div>
          <div style={{ fontSize: 14, color: '#888' }}>
            Por: {hist.app_user?.first_name} {hist.app_user?.last_name} ({hist.app_user?.email})
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default IncidentHistory;