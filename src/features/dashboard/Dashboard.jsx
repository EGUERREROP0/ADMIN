import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import StatusCard from '../../components/Card/StatusCard';
import { FaRegFileAlt, FaHourglassHalf, FaSpinner, FaCheckCircle, FaLock, FaRedo } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Typewriter } from 'react-simple-typewriter';
import palette from '../../utils/palette';
import EstadoBarChart from './components/EstadoBarChart';
import PrioridadPieChart from './components/PrioridadPieChart';
import { useDashboardData } from './hooks/useDashboardData';

const Dashboard = () => {
  const {
    loading,
    priorityData,
    loadingPriority,
    chartPriorityRef,
    chartData,
    total,
    pendientes,
    enProgreso,
    resueltos,
    cerrados,
    reabiertos
  } = useDashboardData();

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
            words={['Panel de Gestión de Incidentes']}
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
              <StatusCard label="Total" value={total} color="#fff" background={palette.celeste} icon={<FaRegFileAlt />} />
              <StatusCard label="Pendientes" value={pendientes} color={palette.azulOscuro} background={palette.grisClaro} icon={<FaHourglassHalf />} />
              <StatusCard label="En progreso" value={enProgreso} color={palette.azulOscuro} background={palette.grisClaro} icon={<FaSpinner />} />
              <StatusCard label="Resueltos" value={resueltos} color={palette.azulOscuro} background={palette.grisClaro} icon={<FaCheckCircle />} />
              <StatusCard label="Cerrados" value={cerrados} color={palette.azulOscuro} background={palette.grisClaro} icon={<FaLock />} />
              <StatusCard label="Reabiertos" value={reabiertos} color={palette.azulOscuro} background={palette.grisClaro} icon={<FaRedo />} />
            </div>
            <div style={{
              display: 'flex',
              gap: 32,
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginBottom: 32,
              flexWrap: 'wrap'
            }}>
              <EstadoBarChart data={chartData} />
              <PrioridadPieChart
                data={priorityData}
                loading={loadingPriority}
                onExportExcel={exportPriorityToExcel}
                onExportPDF={exportPriorityChartToPDF}
                chartRef={chartPriorityRef}
              />
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Dashboard;