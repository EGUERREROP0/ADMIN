import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import CustomButton from '../../components/Button';
import CustomInput from '../../components/Input';
import logo from '../../assets/login/logo.png';
import adminLogin from '../../assets/login/admin_login.png';
import AuthLayout from '../../layouts/AuthLayout';
import authService from './authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }
    setError('');
    try {
      await authService.login(email, password);
      window.location.href = "/dashboard";
    } catch (err) {
      setError('Credenciales incorrectas o error de conexión.');
      console.log(err?.response?.data || err);
    }
  };

  return (
    <AuthLayout>
      <div
        className="d-flex shadow-lg"
        style={{
          minWidth: 850,
          maxWidth: 950,
          minHeight: 550,
          height: 550,
          alignItems: 'stretch',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            //background: '#fff',
            paddingTop: '48px' 
          }}
        >
          <div style={{ width: '100%', maxWidth: 370 }}>
            <div className="text-center mb-4">
              <img src={logo} alt="Logo" style={{ width: 70 }} />
              <h5 className="mt-3" style={{ color: '#00AEEF', fontWeight: 600 }}>
                Hola, bienvenido de nuevo
              </h5>
            </div>
            <form onSubmit={handleSubmit}>
              <CustomInput
                type="email"
                placeholder="correo@tecsup.edu.pe"
                value={email}
                onChange={e => setEmail(e.target.value)}
                icon={<FaEnvelope color="#00AEEF" />}
              />
              <CustomInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                icon={<FaLock color="#00AEEF" />}
              />
              {error && <div className="alert alert-danger py-1">{error}</div>}
              <CustomButton
                type="submit"
                style={{
                  width: '100%',
                  background: '#009fc3',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 600
                }}
              >
                INGRESAR
              </CustomButton>
            </form>
          </div>
        </div>
        <div style={{ height: '100%', flex: 1, padding: 0, margin: 0 }}>
          <img
            src={adminLogin}
            alt="Admin"
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;