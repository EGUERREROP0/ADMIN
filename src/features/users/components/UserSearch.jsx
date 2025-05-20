import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const UserSearch = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleInputChange = (e) => setSearch(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(search.trim());
  };

  return (
    <Paper
      elevation={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 2,
        p: 2,
        borderRadius: 2,
        background: 'var(--color-module, #fff)'
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: '100%', maxWidth: 400 }}
      >
        <TextField
          fullWidth
          size="medium"
          placeholder="Buscar incidente..."
          value={search}
          onChange={handleInputChange}
          variant="outlined"
          sx={{
            background: '#fff',
            borderRadius: 2,
            '& fieldset': { borderColor: '#e0e0e0' },
            fontSize: 17
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" sx={{ color: '#2c3a59' }}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
            style: { height: 48 }
          }}
        />
      </Box>
    </Paper>
  );
};

export default UserSearch;