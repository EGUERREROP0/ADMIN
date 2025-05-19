import React, { useState, useRef, useEffect } from 'react';
import { FaEllipsisV, FaTrash, FaPen, FaInfoCircle } from 'react-icons/fa';
import palette from '../utils/palette';

const ActionMenu = ({ onChangeStatus, onDelete, onDetail }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} ref={menuRef}>
      <button
        type="button"
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 6,
          borderRadius: 6
        }}
        onClick={() => setOpen((v) => !v)}
        title="Acciones"
      >
        <FaEllipsisV size={22} color={palette.celeste} />
      </button>
      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            zIndex: 10,
            minWidth: 170,
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 4px 16px #00AEEF22',
            marginTop: 8,
            overflow: 'hidden'
          }}
        >
          <button
            type="button"
            onClick={() => { setOpen(false); onChangeStatus(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              background: palette.grisMedio,
              color: palette.celeste,
              border: 'none',
              padding: '18px 20px',
              fontSize: 20,
              fontWeight: 500,
              cursor: 'pointer',
              borderBottom: '1px solid #f0f0f0'
            }}
          >
            <FaPen style={{ marginRight: 12 }} />
            Cambiar estado
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); onDelete(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              background: '#fff0f0',
              color: palette.rojo,
              border: 'none',
              padding: '18px 20px',
              fontSize: 20,
              fontWeight: 500,
              cursor: 'pointer',
              borderBottom: '1px solid #f0f0f0'
            }}
          >
            <FaTrash style={{ marginRight: 12 }} />
            Eliminar
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); onDetail(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              background: '#f8f9fa',
              color: palette.celeste,
              border: 'none',
              padding: '18px 20px',
              fontSize: 20,
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            <FaInfoCircle style={{ marginRight: 12 }} />
            Ver detalle
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionMenu;