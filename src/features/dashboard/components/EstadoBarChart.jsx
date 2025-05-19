import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell } from 'recharts';
import barColors from '../utils/barColors';
import palette from '../utils/palette';

const EstadoBarChart = ({ data }) => (
  <div style={{
    background: palette.grisClaro,
    borderRadius: 12,
    padding: '2rem',
    maxWidth: 500,
    flex: '1 1 350px'
  }}>
    <h5 style={{ color: palette.celeste, fontWeight: 600 }}>Incidentes por estado</h5>
    <ResponsiveContainer width="100%" height={340}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" angle={-20} textAnchor="end" interval={0} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default EstadoBarChart;