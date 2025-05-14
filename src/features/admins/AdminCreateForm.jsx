import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import CustomButton from '../../components/Button/CustomButton';
import { createAdmin } from './adminService';

const AdminCreateForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    incident_type_id: ''
  });
  const [incidentTypes, setIncidentTypes] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.get('/type-incident')
      .then(res => setIncidentTypes(res.data?.data || res.data || []))
      .catch(() => setIncidentTypes([]));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await createAdmin(form);
      setSuccess('Administrador creado correctamente');
      setForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        incident_type_id: ''
      });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear administrador');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h3>Registrar nuevo administrador</h3>
      <div>
        <label>Nombre</label>
        <input name="first_name" value={form.first_name} onChange={handleChange} required />
      </div>
      <div>
        <label>Apellido</label>
        <input name="last_name" value={form.last_name} onChange={handleChange} required />
      </div>
      <div>
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>
      <div>
        <label>Contraseña</label>
        <input name="password" type="password" value={form.password} onChange={handleChange} required />
      </div>
      <div>
        <label>Tipo de incidente</label>
        <select name="incident_type_id" value={form.incident_type_id} onChange={handleChange} required>
          <option value="">Seleccione...</option>
          {incidentTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: 16 }}>
        <CustomButton type="submit">
          Registrar
        </CustomButton>
      </div>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
    </form>
  );
};

export default AdminCreateForm;