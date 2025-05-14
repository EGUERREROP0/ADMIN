import React from 'react';

const CustomButton = ({ children, ...props }) => (
// En CustomButton.jsx
<button
  className="btn"
  style={{
    background: '#009fc3', // Turquesa más oscuro
    color: '#fff',
    fontWeight: 600,
    borderRadius: 4,
    border: 'none',
    boxShadow: '0 2px 8px #00AEEF22',
    ...props.style
  }}
  {...props}
>
  {children}
</button>
);

export default CustomButton;