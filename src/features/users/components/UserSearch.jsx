import React, { useState } from 'react';

const SearchIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block', margin: 'auto' }}
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserSearch = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleInputChange = (e) => setSearch(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        marginBottom: 16,
        justifyContent: 'center'
      }}
    >
      <div style={{ display: 'flex', width: '50%' }}>
        <input
          type="text"
          placeholder="Buscar usuario por nombre, apellido o rol"
          value={search}
          onChange={handleInputChange}
          style={{
            flex: 1,
            padding: '10px 16px',
            border: 'none',
            borderRadius: '8px 0 0 8px',
            fontSize: 16,
            background: '#fff',
            color: '#222',
            outline: 'none',
            height: 42,
          }}
        />
        <button
          type="submit"
          style={{
            background: '#2c3a59',
            border: 'none',
            borderRadius: '0 8px 8px 0',
            width: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            height: 42,
          }}
          tabIndex={0}
          aria-label="Buscar"
        >
          <SearchIcon />
        </button>
      </div>
    </form>
  );
};

export default UserSearch;