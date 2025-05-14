import React from 'react';

const StatusCard = ({ label, value, color = '#009fc3', background = '#f8f9fa', icon }) => (
  <div
    style={{
      background,
      borderRadius: 16,
      padding: '0.8rem 1rem 0.6rem 1rem',
      minWidth: 150,
      minHeight: 90,
      maxWidth: 180,
      boxShadow: '0 2px 8px #009fc322',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}
  >
    {icon && (
      <span
        style={{
          position: 'absolute',
          top: 10,
          right: 14,
          fontSize: 20,
          color: background === '#009fc3' ? '#fff' : '#00b5d9',
          opacity: 0.9
        }}
      >
        {icon}
      </span>
    )}
    <span style={{
      fontSize: 18,
      fontWeight: 700,
      color: color,
      marginBottom: 6,
      marginTop: 6,
      textAlign: 'left'
    }}>
      {label}
    </span>
    <span style={{
      fontSize: 26,
      fontWeight: 700,
      color: color,
      textAlign: 'left'
    }}>
      {value}
    </span>
  </div>
);

export default StatusCard;