import React from 'react';
import fondo from '../assets/login/fondo.png';

const AuthLayout = ({ children }) => (
  <div
    style={{
      minHeight: '100vh',
      backgroundImage: `url(${fondo})`,
      backgroundSize: 'cover',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    {children}
  </div>
);

export default AuthLayout;