import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import barColors from '../utils/barColors';
import palette from '../../../utils/palette';
import { Box, Typography, CircularProgress, Button, Stack, Paper } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const PrioridadPieChart = ({
  data,
  loading,
  onExportExcel,
  onExportPDF,
  chartRef
}) => (
  <Paper
    elevation={2}
    sx={{
      background: palette.grisClaro,
      borderRadius: 3,
      p: 4,
      maxWidth: 400,
      flex: '1 1 300px'
    }}
  >
    <Typography
      variant="h6"
      sx={{
        color: palette.celeste,
        fontWeight: 700,
        mb: 2,
        fontFamily: 'Nunito, Arial, sans-serif'
      }}
    >
      Incidentes por prioridad
    </Typography>
    {loading ? (
      <Box sx={{ minHeight: 120, display: 'flex', alignItems: 'center', gap: 2 }}>
        <CircularProgress color="info" size={28} />
        <Typography sx={{ color: palette.celeste }}>Cargando prioridades...</Typography>
      </Box>
    ) : (
      <>
        <Box ref={chartRef} sx={{ width: '100%', height: 300 }}>
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
        </Box>
        <Stack direction="row" spacing={2} mt={2}>
          <Button
            variant="contained"
            color="success"
            startIcon={<DownloadIcon />}
            onClick={onExportExcel}
            sx={{
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              fontFamily: 'Nunito, Arial, sans-serif'
            }}
          >
            Exportar a Excel
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<PictureAsPdfIcon />}
            onClick={onExportPDF}
            sx={{
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              fontFamily: 'Nunito, Arial, sans-serif'
            }}
          >
            Exportar a PDF
          </Button>
        </Stack>
      </>
    )}
  </Paper>
);

export default PrioridadPieChart;