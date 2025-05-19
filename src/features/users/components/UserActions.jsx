import React from 'react';
import { FaTrash } from 'react-icons/fa';

const EyeIcon = ({ style = {}, ...props }) => (
  <svg
    style={{ width: 26, height: 26, color: '#00AEEF', cursor: 'pointer', ...style }}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
      stroke="currentColor"
      fill="none"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" fill="none" />
  </svg>
);

const UserActions = ({
  user,
  roleId,
  onView,
  onConvert,
  convertingId,
  onDelete
}) => (
  <>
    <span
      title="Ver detalles"
      style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 8 }}
      onClick={() => onView(user)}
      role="button"
      tabIndex={0}
      onKeyPress={e => { if (e.key === 'Enter') onView(user); }}
    >
      <EyeIcon />
    </span>
    {roleId === 3 && user.role_id === 1 && (
      <button
        type="button"
        className="btn btn-sm btn-warning"
        style={{
          fontWeight: 600,
          background: '#fff',
          color: '#00AEEF',
          border: '1.5px solid #00AEEF',
          marginLeft: 0
        }}
        onClick={() => onConvert(user)}
        disabled={convertingId === user.id}
      >
        {convertingId === user.id ? 'Convirtiendo...' : 'Convertir a admin'}
      </button>
    )}
    {roleId === 3 && (
      <button
        type="button"
        style={{
          background: 'transparent',
          border: 'none',
          marginLeft: 8,
          cursor: 'pointer',
          padding: 0
        }}
        title="Eliminar usuario"
        onClick={() => onDelete(user)}
      >
        <FaTrash size={20} color="#e53935" />
      </button>
    )}
  </>
);

export default UserActions;