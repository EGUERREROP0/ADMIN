import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import CustomButton from '../../../components/Button';
import CustomInput from '../../../components/Input';
import logo from '../../../assets/login/logo.png';
import adminLogin from '../../../assets/login/admin_login.png';
import AuthLayout from '../../../layouts/AuthLayout';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLocalError('Por favor, complete todos los campos.');
      return;
    }
    setLocalError('');
    const user = await login({ email, password });
    if (user) {
      window.location.href = "/dashboard";
    }
  };

  return (
    <AuthLayout>
      <div className="d-flex shadow-lg auth-login-flex">
        <div className="auth-login-form" style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: '48px'
        }}>
          <div style={{ width: '100%', maxWidth: 370 }}>
            <div className="text-center mb-4">
              <img src={logo} alt="Logo" style={{ width: 70,marginBottom: 8}} />
              <h5 className="mt-3" style={{ color: '#00AEEF', fontWeight: 600, margin: 0 }}>
                Mesa de Ayuda
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
              {(localError || error) && (
                <div className="alert alert-danger py-1">{localError || error}</div>
              )}
              <CustomButton
                type="submit"
                style={{
                  width: '100%',
                  background: '#009fc3',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 600
                }}
                disabled={loading}
              >
                {loading ? 'Ingresando...' : 'INGRESAR'}
              </CustomButton>
            </form>
          </div>
        </div>
        <div className="auth-login-img" style={{ height: '100%', flex: 1, padding: 0, margin: 0 }}>
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