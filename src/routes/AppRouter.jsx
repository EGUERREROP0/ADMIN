import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../features/auth';
import { UserList } from '../features/users';
import { AdminList } from '../features/admins';
import { IncidentList, TypeIncidentList } from '../features/incidents';
import { Dashboard } from '../features/dashboard';

// Ruta privada que valida token y rol
const PrivateRoute = ({ children, onlySuperadmin = false }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const roleId = user?.role_id || user?.user_role?.id;

  if (!token) return <Navigate to="/login" replace />;
  if (onlySuperadmin && roleId !== 3) return <Navigate to="/dashboard" replace />;
  if (roleId === 2 || roleId === 3) return children;
  return <Navigate to="/login" replace />;
};

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/usuarios"
        element={
          <PrivateRoute>
            <UserList />
          </PrivateRoute>
        }
      />
      <Route
        path="/incidentes"
        element={
          <PrivateRoute>
            <IncidentList />
          </PrivateRoute>
        }
      />
      <Route
        path="/administradores"
        element={
          <PrivateRoute onlySuperadmin={true}>
            <AdminList />
          </PrivateRoute>
        }
      />
      <Route
        path="/tipos-incidente"
        element={
          <PrivateRoute onlySuperadmin={true}>
            <TypeIncidentList />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;