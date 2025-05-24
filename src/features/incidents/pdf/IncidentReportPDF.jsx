import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import tecsupLogo from '../../../assets/logo/tecsup_logo.png';
import sello from '../../../assets/sello/sello.png';

const styles = StyleSheet.create({
  page: { padding: 32, fontSize: 12, fontFamily: 'Helvetica' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logo: { width: 110 },
  reportDate: { fontSize: 11, color: '#555', marginTop: 10 },
  divider: { borderBottomWidth: 1, borderBottomColor: '#bbb', marginVertical: 16 },
  label: { color: '#888', fontSize: 11 },
  value: { color: '#222', fontSize: 12 },
  section: { marginBottom: 10 },
  description: { fontSize: 13, marginBottom: 10 },
  historyTitle: { color: '#009fc3', fontWeight: 'bold', marginBottom: 4, fontSize: 12 },
  history: { marginBottom: 10 },
  historyItem: { marginBottom: 8 },
  attachLabel: { color: '#888', fontSize: 11, marginBottom: 4 },
  attachImg: { width: 140, marginBottom: 10, alignSelf: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  cell: { flex: 1, alignItems: 'center' },
  cellLabel: { color: '#888', fontSize: 11 },
  cellValue: { color: '#222', fontSize: 13, fontWeight: 'bold' },
  selloContainer: { alignItems: 'center', marginTop: 32, marginBottom: 12 },
  selloImg: { width: 160 },
  footer: {
    position: 'absolute',
    left: 32,
    right: 32,
    bottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  footerDate: { fontSize: 12 },
  footerLogo: { width: 80 }
});

// Función para redactar el historial de cambios de forma fluida
function formatHistorySentence(hist) {
  const date = hist.change_date
    ? new Date(hist.change_date).toLocaleString('es-PE', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : '';
  const user = hist.app_user
    ? `${hist.app_user.first_name || ''} ${hist.app_user.last_name || ''}`.trim()
    : 'Alguien';
  if (hist.comment) {
    return `${user} realizó el siguiente cambio el ${date}: ${hist.comment}`;
  }
  return `${user} realizó un cambio el ${date}.`;
}

const IncidentReportPDF = ({ incident }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Image src={tecsupLogo} style={styles.logo} />
        <View>
          <Text style={styles.label}>Fecha de reporte</Text>
          <Text style={styles.value}>
            {incident.report_date
              ? new Date(incident.report_date).toLocaleDateString()
              : ''}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Responsable y reportado por */}
      <View style={styles.section}>
        <Text>
          <Text style={styles.label}>Responsable: </Text>
          <Text style={styles.value}>
            {incident.app_user_incident_assigned_admin_idToapp_user?.email || 'Sin responsable'}
          </Text>
        </Text>
        <Text>
          <Text style={styles.label}>Reportado por: </Text>
          <Text style={styles.value}>
            {incident.app_user_incident_user_idToapp_user?.email || ''}
          </Text>
        </Text>
      </View>

      {/* Descripción */}
      <View style={styles.section}>
        <Text style={styles.label}>Descripción :</Text>
        <Text style={styles.description}>{incident.description}</Text>
      </View>

      {/* Historial de cambios */}
      <View style={styles.section}>
        <Text style={styles.historyTitle}>Detalle del incidente</Text>
        <View style={styles.history}>
          {(incident.incident_history || []).length === 0 && (
            <Text style={{ color: '#888', fontSize: 11 }}>No hay cambios registrados.</Text>
          )}
          {(incident.incident_history || []).map(hist => (
            <View key={hist.id} style={styles.historyItem}>
              <Text>{formatHistorySentence(hist)}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Imagen adjunta */}
      {incident.image_url && (
        <View style={styles.section}>
          <Text style={styles.attachLabel}>Archivo Adjunto:</Text>
          <Image src={incident.image_url} style={styles.attachImg} />
        </View>
      )}

      {/* Fila de tipo, prioridad, estado */}
      <View style={styles.row}>
        <View style={styles.cell}>
          <Text style={styles.cellLabel}>Tipo</Text>
          <Text style={styles.cellValue}>{incident.incident_type?.name}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellLabel}>Prioridad</Text>
          <Text style={styles.cellValue}>{incident.priority}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={styles.cellLabel}>Estado</Text>
          <Text style={styles.cellValue}>{incident.incident_status?.name}</Text>
        </View>
      </View>

      {/* Sello */}
      <View style={styles.selloContainer}>
        <Image src={sello} style={styles.selloImg} />
      </View>

      {/* Footer */}
      <View style={styles.footer} fixed>
        <Text style={styles.footerDate}>
          {new Date().toLocaleDateString('es-PE', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })}
        </Text>
        <Image src={tecsupLogo} style={styles.footerLogo} />
      </View>
    </Page>
  </Document>
);

export default IncidentReportPDF;