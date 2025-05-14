import React, { useEffect, useState, useRef } from 'react';
import { getIncidents } from '../incidents/incidentService';
import { getIncidentsByPriority } from './dashboardService';
import MainLayout from '../../layouts/MainLayout';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import StatusCard from '../../components/Card/StatusCard';
import { FaRegFileAlt, FaHourglassHalf, FaSpinner, FaCheckCircle, FaLock, FaRedo } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Typewriter } from 'react-simple-typewriter';

const palette = {
  celeste: '#009fc3',
  grisClaro: '#f8f9fa',
  blanco: '#fff'
};

const barColors = [
  '#009fc3', // celeste
  '#20587A', // azul oscuro
  '#232323', // gris oscuro
  '#007b8a', // azul petróleo
  '#00b5d9', // celeste claro
  '#1a3d4c'  // azul muy oscuro
];

const Dashboard = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Para prioridad
  const [priorityData, setPriorityData] = useState([]);
  const [loadingPriority, setLoadingPriority] = useState(true);
  const chartPriorityRef = useRef(null);

  useEffect(() => {
    getIncidents()
      .then(data => setIncidents(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    getIncidentsByPriority()
      .then(data => {
        const priorityObj = data.priotity || {};
        const transformed = [
          { prioridad: 'Alta', cantidad: priorityObj.incidentsByPriorityHigh ?? 0 },
          { prioridad: 'Media', cantidad: priorityObj.incidentsByPriorityMedium ?? 0 },
          { prioridad: 'Baja', cantidad: priorityObj.incidentsByPriorityLow ?? 0 }
        ];
        setPriorityData(transformed);
      })
      .finally(() => setLoadingPriority(false));
  }, []);

  // Procesar datos para el gráfico de barras por estado
  const stateCounts = incidents.reduce((acc, inc) => {
    const state = inc.incident_status?.name || 'Sin estado';
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(stateCounts).map(([name, value]) => ({
    name,
    value
  }));

  // Resúmenes numéricos
  const total = incidents.length;
  const pendientes = stateCounts['pendiente'] || 0;
  const enProgreso = stateCounts['en_progreso'] || 0;
  const resueltos = stateCounts['resuelto'] || 0;
  const cerrados = stateCounts['cerrado'] || 0;
  const reabiertos = stateCounts['re_abierto'] || 0;

  // Exportar datos de prioridad a Excel
  const exportPriorityToExcel = () => {
    if (!priorityData.length) return;
    const worksheet = XLSX.utils.json_to_sheet(priorityData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Prioridad');
    XLSX.writeFile(workbook, 'incidentes_por_prioridad.xlsx');
  };

  // Exportar gráfico de prioridad a PDF
  const exportPriorityChartToPDF = async () => {
    const input = chartPriorityRef.current;
    if (!input) return;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 80);
    pdf.save('grafico_prioridad.pdf');
  };

  return (
    <MainLayout>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span role="img" aria-label="Saludo" style={{ fontSize: 48, marginTop: 4 }}>👋</span>
        <h2 style={{ color: palette.celeste, fontWeight: 700, margin: 0 }}>
          <Typewriter
            words={['Bienvenido al Panel de Administración']}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>
      </div>
      <p>¡Has iniciado sesión correctamente!</p>
      <div style={{ marginTop: 32 }}>
        {loading ? (
          <div className="d-flex align-items-center" style={{ minHeight: 120 }}>
            <div className="spinner-border text-info me-2" role="status" />
            <span style={{ color: palette.celeste }}>Cargando reportes...</span>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 24, marginBottom: 32, flexWrap: 'wrap' }}>
              <StatusCard
                label="Total"
                value={total}
                color="#fff"
                background={palette.celeste}
                icon={<FaRegFileAlt />}
              />
              <StatusCard
                label="Pendientes"
                value={pendientes}
                color="#20587A"
                background={palette.grisClaro}
                icon={<FaHourglassHalf />}
              />
              <StatusCard
                label="En progreso"
                value={enProgreso}
                color="#20587A"
                background={palette.grisClaro}
                icon={<FaSpinner />}
              />
              <StatusCard
                label="Resueltos"
                value={resueltos}
                color="#20587A"
                background={palette.grisClaro}
                icon={<FaCheckCircle />}
              />
              <StatusCard
                label="Cerrados"
                value={cerrados}
                color="#20587A"
                background={palette.grisClaro}
                icon={<FaLock />}
              />
              <StatusCard
                label="Reabiertos"
                value={reabiertos}
                color="#20587A"
                background={palette.grisClaro}
                icon={<FaRedo />}
              />
            </div>
            {/* Gráficos lado a lado */}
            <div style={{
              display: 'flex',
              gap: 32,
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginBottom: 32,
              flexWrap: 'wrap'
            }}>
              {/* Gráfico de barras por estado */}
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
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-20}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value">
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Gráfico de pastel por prioridad */}
              <div style={{
                background: palette.grisClaro,
                borderRadius: 12,
                padding: '2rem',
                maxWidth: 400,
                flex: '1 1 300px'
              }}>
                <h5 style={{ color: palette.celeste, fontWeight: 600 }}>Incidentes por prioridad</h5>
                {loadingPriority ? (
                  <div className="d-flex align-items-center" style={{ minHeight: 120 }}>
                    <div className="spinner-border text-info me-2" role="status" />
                    <span style={{ color: palette.celeste }}>Cargando prioridades...</span>
                  </div>
                ) : (
                  <>
                    <div ref={chartPriorityRef} style={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={priorityData}
                            dataKey="cantidad"
                            nameKey="prioridad"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                          >
                            {priorityData.map((entry, index) => (
                              <Cell key={`cell-pie-${index}`} fill={barColors[index % barColors.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                      <button className="btn btn-success" onClick={exportPriorityToExcel}>
                        Exportar datos a Excel
                      </button>
                      <button className="btn btn-danger" onClick={exportPriorityChartToPDF}>
                        Exportar gráfico a PDF
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;