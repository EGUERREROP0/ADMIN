import React from 'react';

const Table = ({
  columns = [],
  data = [],
  rowKey = 'id',
  headerStyle = {},
  rowStyle = () => ({}),
  loading = false,
  emptyText = 'No hay datos para mostrar'
}) => (
  <div className="table-responsive"
    style={{
      borderRadius: 5,
      boxShadow: '0 4px 24px rgba(44, 62, 80, 0.08)',
      overflow: 'hidden',
      margin: '2rem 0',
      background: '#fff',
      padding: 0
    }}>
    <table className="table mb-0" style={{ borderRadius: 16, overflow: 'hidden' }}>
      <thead style={headerStyle}>
        <tr>
          {columns.map(col => (
            <th key={col.key} style={{ border: 'none', padding: '16px 18px', color: '#fff', background: 'transparent' }}>
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan={columns.length} className="text-center py-4">
              Cargando...
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="text-center py-4">
              {emptyText}
            </td>
          </tr>
        ) : (
          data.map((row, idx) => (
            <tr key={row[rowKey] || idx} style={rowStyle(row, idx)}>
              {columns.map(col => (
                <td key={col.key} style={{ border: 'none', padding: '14px 18px', verticalAlign: 'middle' }}>
                  {col.render ? col.render(row, idx) : row[col.dataIndex]}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default Table;