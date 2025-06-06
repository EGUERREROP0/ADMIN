import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import CustomButton from '../../../components/Button/CustomButton';
import CustomInput from '../../../components/Input/CustomInput';
import { createAdmin } from '../services/adminService';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const MySwal = withReactContent(Swal);

const labelStyle = {
  fontWeight: 500,
  marginBottom: 2,
  display: 'block'
};

const AdminCreateForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    incident_type_id: ''
  });
  const [incidentTypes, setIncidentTypes] = useState([]);

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
    try {
      await createAdmin(form);
      setForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        incident_type_id: ''
      });
      if (onSuccess) onSuccess(); 
      await MySwal.fire({
        title: '¡Éxito!',
        text: 'Administrador creado correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (err) {
      await MySwal.fire({
        title: 'Error',
        text: err?.response?.data?.error || 'Error al crear administrador',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <div>
        <label style={labelStyle}>Nombre</label>
        <CustomInput
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          required
          placeholder="Nombre"
        />
      </div>
      <div>
        <label style={labelStyle}>Apellido</label>
        <CustomInput
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          required
          placeholder="Apellido"
        />
      </div>
      <div>
        <label style={labelStyle}>Email</label>
        <CustomInput
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Correo electrónico"
        />
      </div>
      <div>
        <label style={labelStyle}>Contraseña</label>
        <CustomInput
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Contraseña"
        />
      </div>
      <div>
        <FormControl fullWidth size="small" sx={{ mt: 1, mb: 2 }}>
          <InputLabel id="incident-type-label">Tipo de incidente</InputLabel>
          <Select
            labelId="incident-type-label"
            name="incident_type_id"
            value={form.incident_type_id}
            label="Tipo de incidente"
            onChange={handleChange}
            required
          >
            <MenuItem value="" disabled>Seleccione...</MenuItem>
            {incidentTypes.map(type => (
              <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div style={{ marginTop: 16 }}>
        <CustomButton type="submit" style={{ width: '100%' }}>
          Registrar
        </CustomButton>
      </div>
    </form>
  );
};

export default AdminCreateForm;