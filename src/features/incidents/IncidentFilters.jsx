import React from 'react';

const IncidentFilters = ({
  prioridad,
  setPrioridad,
  estado,
  setEstado,
  tipo,
  setTipo,
  tiposIncidente,
  estados,
  search,
  setSearch
}) => (
  <div
    style={{
      background: '#fff',
      borderRadius: 10,
      boxShadow: '0 2px 8px #0001',
      padding: '24px 18px',
      marginBottom: 32,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24
    }}
  >
    {/* Filtros a la izquierda */}
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <select
        value={prioridad}
        onChange={e => setPrioridad(e.target.value)}
        className="form-select"
        style={{ maxWidth: 170, height: 38, fontSize: 16, borderRadius: 6 }}
      >
        <option value="">Todas las prioridades</option>
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
        <option value="Baja">Baja</option>
      </select>
      <select
        value={estado}
        onChange={e => setEstado(e.target.value)}
        className="form-select"
        style={{ maxWidth: 170, height: 38, fontSize: 16, borderRadius: 6 }}
      >
        <option value="">Todos los estados</option>
        {estados.map(est => (
          <option key={est.id} value={est.id}>
            {est.name.replace('_', ' ')}
          </option>
        ))}
      </select>
      <select
        value={tipo}
        onChange={e => setTipo(e.target.value)}
        className="form-select"
        style={{ maxWidth: 170, height: 38, fontSize: 16, borderRadius: 6 }}
      >
        <option value="">Todos los tipos</option>
        {tiposIncidente.map(t => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>
    </div>
    {/* Buscador a la derecha */}
    <form
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 1px 4px #0001',
        height: 38
      }}
      onSubmit={e => e.preventDefault()}
    >
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar incidente..."
        style={{
          border: 'none',
          outline: 'none',
          padding: '0 0 0 12px',
          fontSize: 16,
          color: '#666',
          width: 160,
          background: '#fff',
          height: '100%',
          borderRadius: 0,
          fontWeight: 400
        }}
      />
      <button
        type="submit"
        style={{
          background: '#2c3a59',
          border: 'none',
          width: 44,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '0 8px 8px 0',
          cursor: 'pointer'
        }}
        tabIndex={-1}
      >
        <svg width="22" height="22" viewBox="0 0 38 38">
          <circle cx="17" cy="17" r="10" stroke="#fff" strokeWidth="3" fill="none" />
          <line x1="25" y1="25" x2="35" y2="35" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </button>
    </form>
  </div>
);

export default IncidentFilters;