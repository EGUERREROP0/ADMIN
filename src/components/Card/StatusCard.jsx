import React from 'react';

const StatusCard = ({ label, value, color = '#20587A', background = '#20587A', icon }) => (
  <div
    style={{
      background,
      borderRadius: 10,
      padding: '1.1rem 1rem 1.2rem 1rem',
      minWidth: 140,
      maxWidth: 170,
      minHeight: 90,
      boxShadow: '0 2px 8px #b0b8c1aa', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.18s, bx-shadow 0.18s',
      cursor: 'pointer'
    }}
    onMouseOver={e => {
      e.currentTarget.style.transform = 'scale(1.04)';
      e.currentTarget.style.boxShadow = '0 6px 18px #b0b8c1cc';
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 2px 8px #b0b8c1aa';
    }}
  >
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginBottom: 2
    }}>
      {icon && (
        <span
          style={{
            fontSize: 20,
            color: color,
            opacity: 0.92,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {icon}
        </span>
      )}
      <span style={{
        fontSize: 16,
        fontWeight: 700,
        color: color,
        letterSpacing: 0.2
      }}>
        {label}
      </span>
    </div>
    <span style={{
      fontSize: 24,
      fontWeight: 700,
      color: color,
      marginTop: 2
    }}>
      {value}
    </span>
  </div>
);

export default StatusCard;