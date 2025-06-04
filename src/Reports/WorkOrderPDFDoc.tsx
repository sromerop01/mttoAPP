import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import type { FormData, RecursoItemData } from '../Types/types'; // Ajusta la ruta a tus tipos

// Define los estilos para el PDF (similar a CSS-in-JS)
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Helvetica', // O una fuente que hayas registrado
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#E0E0E0', // Un gris claro para el fondo del título
    padding: 5,
    marginTop: 15,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    width: '35%', // Ancho para las etiquetas
    marginRight: 5,
  },
  value: {
    fontSize: 10,
    width: '65%', // Ancho para los valores
    flexWrap: 'wrap',
  },
  // Estilos para tablas
  table: {
    display: "flex", // Usar "flex" en lugar de "table" para @react-pdf/renderer
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    backgroundColor: '#f2f2f2',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
    flexGrow: 1, // Para que las columnas se distribuyan
    textAlign: 'center',
  },
  tableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 4,
    flexGrow: 1,
  },
  tableCellHeader: {
    fontSize: 9,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 9,
    textAlign: 'left',
  },
  // Anchos específicos para columnas de tablas (ejemplo para Recursos)
  recursoCol1: { width: '25%' }, // Recurso Necesario
  recursoCol2: { width: '35%' }, // Características
  recursoCol3: { width: '15%' }, // Cantidad
  recursoCol4: { width: '25%' }, // Observaciones
  // Anchos para Criticidad (6 columnas)
  criticidadCol: { width: `${100/6}%` }, // Dividir equitativamente
});

interface WorkOrderPDFProps {
  data: FormData;
}

const WorkOrderPDFDoc: React.FC<WorkOrderPDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="portrait">
      <Text style={styles.header}>Orden de trabajo</Text>

      {/* --- Información de la Solicitud --- */}
      <View style={styles.sectionTitle}>
        <Text>Información de la Solicitud</Text>
        </View>
      {data.informacionSolicitud && (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha de solicitud:</Text>
            <Text style={styles.value}>{data.informacionSolicitud.fecha_solicitud || ''}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Orden de trabajo Nro:</Text>
            <Text style={styles.value}>{data.informacionSolicitud.orden_trabajo_nro || ''}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Facultad:</Text>
            <Text style={styles.value}>{data.informacionSolicitud.facultad || ''}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Nro. Solicitud:</Text>
            <Text style={styles.value}>{data.informacionSolicitud.nro_solicitud || ''}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ubicación del equipo:</Text>
            <Text style={styles.value}>{data.informacionSolicitud.ubicacion_equipo_solicitud || ''}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Laboratorio:</Text>
            <Text style={styles.value}>{data.informacionSolicitud.laboratorio || ''}</Text>
          </View>
        </>
      )}

      {/* --- Información del equipo --- */}
      <View style={styles.sectionTitle}><Text>Información del equipo</Text></View>
      {data.informacionEquipo && (
        <>
          <View style={styles.row}>
            <Text style={styles.label}>Equipo:</Text><Text style={styles.value}>{data.informacionEquipo.nombre_equipo || ''}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Identificación del equipo (Placa UNAL):</Text>
            <Text style={styles.value}>{data.informacionEquipo.placa_unal || ''}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Información disponible del equipo (QR):</Text>
            {/* Para la imagen QR, necesitarías tenerla como data URL o una URL pública */}
            {/* Por ahora, solo mostramos el nombre del archivo o un placeholder */}
            <Text style={styles.value}>{data.informacionEquipo.info_disponible_qr_filename || (data.informacionEquipo.qrImagePreviewUrl ? "(Imagen QR Adjunta)" : "N/A")}</Text>
            {/* Si tienes la imagen como dataURL en qrImagePreviewUrl: */}
            {/* {data.informacionEquipo.qrImagePreviewUrl && <Image style={{width: 50, height: 50}} src={data.informacionEquipo.qrImagePreviewUrl} />} */}
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Marca:</Text>
            <Text style={styles.value}>{data.informacionEquipo.marca_equipo || ''}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Modelo:</Text>
            <Text style={styles.value}>{data.informacionEquipo.modelo_equipo || ''}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Número de serie:</Text>
            <Text style={styles.value}>{data.informacionEquipo.serie_equipo || ''}</Text>
          </View>
        </>
      )}

      {/* --- Resultado del diagnóstico --- */}
      <View style={styles.sectionTitle}><Text>Resultado del diagnóstico</Text></View>
      {data.resultadosDiagnostico && (
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={{...styles.tableColHeader, ...styles.criticidadCol}}><Text style={styles.tableCellHeader}>Equipo APTO para el mantenimiento</Text></View>
            <View style={{...styles.tableColHeader, ...styles.criticidadCol}}><Text style={styles.tableCellHeader}>N° Personas que realizaron el diagnóstico</Text></View>
            <View style={{...styles.tableColHeader, ...styles.criticidadCol}}><Text style={styles.tableCellHeader}>Tiempo de diagnóstico (h)</Text></View>
            <View style={{...styles.tableColHeader, ...styles.criticidadCol, borderRightWidth:0}}><Text style={styles.tableCellHeader}>Costo diagnóstico</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={{...styles.tableCol, ...styles.criticidadCol}}><Text style={styles.tableCell}>{data.resultadosDiagnostico.apto_mantenimiento === 'yes' ? 'Sí' : data.resultadosDiagnostico.apto_mantenimiento === 'no' ? 'No' : ''}</Text></View>
            <View style={{...styles.tableCol, ...styles.criticidadCol}}><Text style={styles.tableCell}>{String(data.resultadosDiagnostico.nro_personas_diagnostico ?? '')}</Text></View>
            <View style={{...styles.tableCol, ...styles.criticidadCol}}><Text style={styles.tableCell}>{String(data.resultadosDiagnostico.tiempo_diagnostico_h ?? '')}</Text></View>
            <View style={{...styles.tableCol, ...styles.criticidadCol, borderRightWidth:0}}><Text style={styles.tableCell}>{String(data.resultadosDiagnostico.costo_diagnostico_valor ?? '0')}</Text></View>
          </View>
        </View>
      )}
      
      {/* --- Planeación del mantenimiento --- */}
      <View style={styles.sectionTitle}><Text>Planeación del mantenimiento</Text></View>
      {data.planeacionMantenimiento && (
        <>
          {/* Recursos Necesarios */}
          <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 4, marginTop: 8 }}>Recursos Necesarios</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={{...styles.tableColHeader, ...styles.recursoCol1}}><Text style={styles.tableCellHeader}>Recurso Necesario</Text></View>
              <View style={{...styles.tableColHeader, ...styles.recursoCol2}}><Text style={styles.tableCellHeader}>Características</Text></View>
              <View style={{...styles.tableColHeader, ...styles.recursoCol3}}><Text style={styles.tableCellHeader}>Cantidad</Text></View>
              <View style={{...styles.tableColHeader, ...styles.recursoCol4, borderRightWidth:0}}><Text style={styles.tableCellHeader}>Observaciones</Text></View>
            </View>
            {data.planeacionMantenimiento.recursos.map((item: RecursoItemData) => (
              <View style={styles.tableRow} key={item.id}>
                <View style={{...styles.tableCol, ...styles.recursoCol1}}><Text style={styles.tableCell}>{item.label}</Text></View>
                <View style={{...styles.tableCol, ...styles.recursoCol2}}><Text style={styles.tableCell}>{item.caracteristicas}</Text></View>
                <View style={{...styles.tableCol, ...styles.recursoCol3}}><Text style={styles.tableCell}>{String(item.cantidad ?? '')}</Text></View>
                <View style={{...styles.tableCol, ...styles.recursoCol4, borderRightWidth:0}}><Text style={styles.tableCell}>{item.observaciones}</Text></View>
              </View>
            ))}
          </View>

          {/* Criticidad del mantenimiento */}
          <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 4, marginTop: 8 }}>Criticidad del mantenimiento</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={{...styles.tableColHeader, ...styles.criticidadCol}}><Text style={styles.tableCellHeader}>Cálculo del NPR</Text></View>
              <View style={{...styles.tableColHeader, ...styles.criticidadCol}}><Text style={styles.tableCellHeader}>Valor total</Text></View>
              <View style={{...styles.tableColHeader, ...styles.criticidadCol}}><Text style={styles.tableCellHeader}>Afectación</Text></View>
              <View style={{...styles.tableColHeader, ...styles.criticidadCol}}><Text style={styles.tableCellHeader}>Probabilidad de falla</Text></View>
              <View style={{...styles.tableColHeader, ...styles.criticidadCol}}><Text style={styles.tableCellHeader}>Detección</Text></View>
              <View style={{...styles.tableColHeader, ...styles.criticidadCol, borderRightWidth:0}}><Text style={styles.tableCellHeader}>Tipo de mantenimiento</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={{...styles.tableCol, ...styles.criticidadCol}}><Text style={styles.tableCell}>{String(data.planeacionMantenimiento.criticidad.valor_total_npr ?? '')}</Text></View>
              <View style={{...styles.tableCol, ...styles.criticidadCol}}><Text style={styles.tableCell}>{data.planeacionMantenimiento.criticidad.afectacion_npr || ''}</Text></View>
              <View style={{...styles.tableCol, ...styles.criticidadCol}}><Text style={styles.tableCell}>{data.planeacionMantenimiento.criticidad.probabilidad_falla || ''}</Text></View>
              <View style={{...styles.tableCol, ...styles.criticidadCol}}><Text style={styles.tableCell}>{data.planeacionMantenimiento.criticidad.deteccion_npr || ''}</Text></View>
              <View style={{...styles.tableCol, ...styles.criticidadCol, borderRightWidth:0}}><Text style={styles.tableCell}>{data.planeacionMantenimiento.criticidad.tipo_mantenimiento || ''}</Text></View>
            </View>
          </View>

          {/* Fechas (dentro de Planeación) */}
          <View style={{...styles.table, marginTop: 8}}>
             <View style={styles.tableRow}>
                <View style={{...styles.tableColHeader, ...styles.criticidadCol, width: '25%'}}><Text style={styles.tableCellHeader}>Fecha programada de inicio</Text></View>
                <View style={{...styles.tableCol, ...styles.criticidadCol, width: '25%'}}><Text style={styles.tableCell}>{data.planeacionMantenimiento.fechas.fecha_inicio_prog || ''}</Text></View>
                <View style={{...styles.tableColHeader, ...styles.criticidadCol, width: '25%'}}><Text style={styles.tableCellHeader}>Fecha de finalización del mantenimiento</Text></View>
                <View style={{...styles.tableCol, ...styles.criticidadCol, width: '25%', borderRightWidth:0}}><Text style={styles.tableCell}>{data.planeacionMantenimiento.fechas.fecha_fin_mant || ''}</Text></View>
             </View>
          </View>

          {/* Costo total del mantenimiento (dentro de Planeación) */}
          <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 4, marginTop: 8 }}>Costo total del mantenimiento</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
                <View style={{...styles.tableColHeader, flex: 2}}><Text style={styles.tableCellHeader}>Concepto</Text></View>
                <View style={{...styles.tableColHeader, flex: 1}}><Text style={styles.tableCellHeader}>Valor</Text></View>
            </View>
            <View style={styles.tableRow}>
                <View style={{...styles.tableCol, flex: 2}}><Text style={styles.tableCell}>Costo total del mantenimiento</Text></View>
                <View style={{...styles.tableCol, flex: 1, borderRightWidth:0}}><Text style={styles.tableCell}>{String(data.planeacionMantenimiento.costos.costo_total_mant_valor ?? '0')}</Text></View>
            </View>
            <View style={styles.tableRow}>
                <View style={{...styles.tableCol, flex: 2}}><Text style={styles.tableCell}>Repuestos</Text></View>
                <View style={{...styles.tableCol, flex: 1, borderRightWidth:0}}><Text style={styles.tableCell}>{String(data.planeacionMantenimiento.costos.costo_repuestos_valor ?? '0')}</Text></View>
            </View>
            <View style={styles.tableRow}>
                <View style={{...styles.tableCol, flex: 2}}><Text style={styles.tableCell}>Mano de obra mantenimiento</Text></View>
                <View style={{...styles.tableCol, flex: 1, borderRightWidth:0}}><Text style={styles.tableCell}>{String(data.planeacionMantenimiento.costos.costo_mano_obra_valor ?? '0')}</Text></View>
            </View>
          </View>
          
          {/* Personal Asignado y Tiempo */}
          <View style={{...styles.table, marginTop: 8}}>
             <View style={styles.tableRow}>
                <View style={{...styles.tableColHeader, flex:1}}><Text style={styles.tableCellHeader}>Personal Asignado</Text></View>
                <View style={{...styles.tableColHeader, flex:1, borderRightWidth:0}}><Text style={styles.tableCellHeader}>Tiempo del mantenimiento (horas)</Text></View>
             </View>
             <View style={styles.tableRow}>
                <View style={{...styles.tableCol, flex:1}}><Text style={styles.tableCell}>{data.planeacionMantenimiento.costos.personal_asignado_costo || ''}</Text></View>
                <View style={{...styles.tableCol, flex:1, borderRightWidth:0}}><Text style={styles.tableCell}>{String(data.planeacionMantenimiento.costos.tiempo_estimado_mant_horas ?? '')}</Text></View>
             </View>
          </View>
        </>
      )}
    </Page>
  </Document>
);

export default WorkOrderPDFDoc;