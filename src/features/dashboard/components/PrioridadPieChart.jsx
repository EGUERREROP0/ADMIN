import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import barColors from '../utils/barColors';
import palette from '../../../utils/palette';

const PrioridadPieChart = ({
  data,
  loading,
  onExportExcel,
  onExportPDF,
  chartRef
}) => (
  <div style={{
    background: palette.grisClaro,
    borderRadius: 12,
    padding: '2rem',
    maxWidth: 400,
    flex: '1 1 300px'
  }}>
    <h5 style={{ color: palette.celeste, fontWeight: 600 }}>Incidentes por prioridad</h5>
    {loading ? (
      <div className="d-flex align-items-center" style={{ minHeight: 120 }}>
        <div className="spinner-border text-info me-2" role="status" />
        <span style={{ color: palette.celeste }}>Cargando prioridades...</span>
      </div>
    ) : (
      <>
        <div ref={chartRef} style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="cantidad"
                nameKey="prioridad"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-pie-${index}`} fill={barColors[index % barColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
          <button className="btn btn-success" onClick={onExportExcel}>
            Exportar datos a Excel
          </button>
          <button className="btn btn-danger" onClick={onExportPDF}>
            Exportar gráfico a PDF
          </button>
        </div>
      </>
    )}
  </div>
);

export default PrioridadPieChart;