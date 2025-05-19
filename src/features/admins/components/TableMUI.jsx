import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography
} from '@mui/material';

const TableMUI = ({
  columns,
  data,
  loading,
  rowKey = 'id',
  headerStyle,
  rowStyle,
}) => (
  <TableContainer
    component={Paper}
    sx={{
      borderRadius: 1,
      boxShadow: '0 4px 16px #b0b8c1aa',
      mt: 2,
      fontFamily: 'Nunito, Arial, sans-serif',
    }}
  >
    <Table>
      <TableHead>
        <TableRow>
          {columns.map(col => (
            <TableCell
              key={col.key || col.dataIndex}
              sx={{
                color: '#fff',
                fontWeight: 700,
                background: headerStyle?.background || '#009fc3',
                fontFamily: 'Nunito, Arial, sans-serif',
                ...headerStyle,
              }}
            >
              {col.title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={columns.length} align="center">
              <CircularProgress color="primary" />
            </TableCell>
          </TableRow>
        ) : data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length} align="center">
              <Typography color="text.secondary" sx={{ py: 3 }}>
                No hay registros.
              </Typography>
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, idx) => (
            <TableRow
              key={row[rowKey]}
              sx={{
                background: idx % 2 === 1 ? '#f4f8fb' : '#fff',
                color: '#232323',
                '&:last-child td, &:last-child th': { border: 0 },
                ...rowStyle?.(row, idx)
              }}
            >
              {columns.map(col => (
                <TableCell key={col.key || col.dataIndex}>
                  {col.render ? col.render(row) : row[col.dataIndex]}
                </TableCell>
              ))}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TableMUI;