import React from 'react'
import { Page, Text, View, Document } from '@react-pdf/renderer'
import { styles, infoEquipoStyle, diagStyle, mttoStyle } from '../Constants/PDFStyleSheets'
import type { FormData, RecursoItemData } from '../Types/types' // Ajusta la ruta a tus tipos


interface WorkOrderPDFProps {
  data: FormData
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
      <View style={styles.sectionTitle}>
        <Text>Información del equipo</Text>
      </View>
      {data.informacionEquipo && (
        <>
          <View style={infoEquipoStyle.tableContainer}>
          {/* PRIMERA FILA */}
          <View style={infoEquipoStyle.tableRow}>
            <View style={infoEquipoStyle.topHeaderCell}>
              <Text style={infoEquipoStyle.boldText}>Equipo:</Text>
            </View>
            <View style={infoEquipoStyle.topValueCell}>
              <Text style={infoEquipoStyle.cellText}>{data.informacionEquipo.nombre_equipo || ''}</Text>
            </View>
          </View>

          {/* SEGUNDA FILA (la que tiene celdas combinadas) */}
          <View style={infoEquipoStyle.tableRow}>
            {/* Celda izquierda con el texto largo (simula rowspan) */}
            <View style={infoEquipoStyle.rowSpanCell}>
              <Text style={infoEquipoStyle.boldText}>Información disponible del equipo QR:</Text>
            </View>

            {/* Contenedor derecho con las 4 filas anidadas */}
            <View style={infoEquipoStyle.nestedTable}>
              {/* Fila anidada 1 */}
              <View style={infoEquipoStyle.nestedRow}>
                <View style={infoEquipoStyle.nestedKeyCell}>
                  <Text style={infoEquipoStyle.cellText}>Identificación del equipo (Placa UNAL):</Text>
                </View>
                <View style={infoEquipoStyle.nestedValueCell}>
                  <Text style={infoEquipoStyle.cellText}>{data.informacionEquipo.placa_unal || ''}</Text>
                </View>
              </View>
              {/* Fila anidada 2 */}
              <View style={infoEquipoStyle.nestedRow}>
                <View style={infoEquipoStyle.nestedKeyCell}>
                  <Text style={infoEquipoStyle.cellText}>Marca:</Text>
                </View>
                <View style={infoEquipoStyle.nestedValueCell}>
                  <Text style={infoEquipoStyle.cellText}>{data.informacionEquipo.marca_equipo || ''}</Text>
                </View>
              </View>
              {/* Fila anidada 3 */}
              <View style={infoEquipoStyle.nestedRow}>
                <View style={infoEquipoStyle.nestedKeyCell}>
                  <Text style={infoEquipoStyle.cellText}>Modelo:</Text>
                </View>
                <View style={infoEquipoStyle.nestedValueCell}>
                  <Text style={infoEquipoStyle.cellText}>{data.informacionEquipo.modelo_equipo || ''}</Text>
                </View>
              </View>
              {/* Fila anidada 4 (sin borde inferior) */}
              <View style={infoEquipoStyle.lastNestedRow}>
                <View style={infoEquipoStyle.nestedKeyCell}>
                  <Text style={infoEquipoStyle.cellText}>Número de serie:</Text>
                </View>
                <View style={infoEquipoStyle.nestedValueCell}>
                  <Text style={infoEquipoStyle.cellText}>{data.informacionEquipo.serie_equipo || ''}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        </>
      )}

      {/* --- Resultado del diagnóstico --- */}
      <View style={styles.sectionTitle}>
        <Text>Resultado del diagnóstico</Text>
      </View>
      {data.resultadosDiagnostico && (
        <View style={diagStyle.table}>
          <View style={diagStyle.tableRow}>
            <View style={{...diagStyle.tableColHeader, ...diagStyle.diagCol}}>
              <Text style={diagStyle.tableCellHeader}>Equipo APTO para el mantenimiento</Text>
            </View>
            <View style={{...diagStyle.tableColHeader, ...diagStyle.diagCol}}>
              <Text style={diagStyle.tableCellHeader}>N° Personas que realizaron el diagnóstico</Text>
            </View>
            <View style={{...diagStyle.tableColHeader, ...diagStyle.diagCol}}>
              <Text style={diagStyle.tableCellHeader}>Tiempo de diagnóstico (h)</Text>
            </View>
            <View style={{...diagStyle.tableColHeader, ...diagStyle.diagCol, borderRightWidth:0}}>
              <Text style={diagStyle.tableCellHeader}>Costo diagnóstico</Text>
            </View>
          </View>

          <View style={diagStyle.tableRow}>
            <View style={{...diagStyle.tableCol, ...diagStyle.diagCol}}>
              <Text style={diagStyle.tableCell}>{data.resultadosDiagnostico.apto_mantenimiento === 'yes' ? 'Sí' : data.resultadosDiagnostico.apto_mantenimiento === 'no' ? 'No' : ''}</Text>
            </View>
            <View style={{...diagStyle.tableCol, ...diagStyle.diagCol}}>
              <Text style={diagStyle.tableCell}>{String(data.resultadosDiagnostico.nro_personas_diagnostico ?? '')}</Text>
            </View>
            <View style={{...diagStyle.tableCol, ...diagStyle.diagCol}}>
              <Text style={diagStyle.tableCell}>{String(data.resultadosDiagnostico.tiempo_diagnostico_h ?? '')}</Text>
            </View>
            <View style={{...diagStyle.tableCol, ...diagStyle.diagCol, borderRightWidth:0}}>
              <Text style={diagStyle.tableCell}>{String(data.resultadosDiagnostico.costo_diagnostico_valor ?? '0')}</Text>
            </View>
          </View>
        </View>
      )}
      
      {/* --- Planeación del mantenimiento --- */}
      <View style={styles.sectionTitle}>
        <Text>Planeación del mantenimiento</Text>
      </View>
      {data.planeacionMantenimiento && (
        <>
          {/* Recursos Necesarios */}
          <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 4, marginTop: 8 }}>Recursos Necesarios</Text>
          <View style={mttoStyle.table}>
            <View style={mttoStyle.tableRow}>
              <View style={{...mttoStyle.tableColHeader, ...mttoStyle.recursoCol1}}>
                <Text style={mttoStyle.tableCellHeader}>Recurso Necesario</Text>
              </View>
              <View style={{...mttoStyle.tableColHeader, ...mttoStyle.recursoCol2}}>
                <Text style={mttoStyle.tableCellHeader}>Características</Text>
              </View>
              <View style={{...mttoStyle.tableColHeader, ...mttoStyle.recursoCol3}}>
                <Text style={mttoStyle.tableCellHeader}>Cantidad</Text>
              </View>
              <View style={{...mttoStyle.tableColHeader, ...mttoStyle.recursoCol4, borderRightWidth:0}}>
                <Text style={mttoStyle.tableCellHeader}>Observaciones</Text>
              </View>
            </View>
            {data.planeacionMantenimiento.recursos.map((item: RecursoItemData) => (
              <View style={mttoStyle.tableRow} key={item.id}>
                <View style={{...mttoStyle.tableCol, ...mttoStyle.recursoCol1}}>
                  <Text style={mttoStyle.tableCell}>{item.label}</Text>
                </View>
                <View style={{...mttoStyle.tableCol, ...mttoStyle.recursoCol2}}>
                  <Text style={mttoStyle.tableCell}>{item.caracteristicas}</Text>
                </View>
                <View style={{...mttoStyle.tableCol, ...mttoStyle.recursoCol3}}>
                  <Text style={mttoStyle.tableCell}>{String(item.cantidad ?? '')}</Text>
                </View>
                <View style={{...mttoStyle.tableCol, ...mttoStyle.recursoCol4, borderRightWidth:0}}>
                  <Text style={mttoStyle.tableCell}>{item.observaciones}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Criticidad del mantenimiento */}
          <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 4, marginTop: 8 }}>Criticidad del mantenimiento</Text>
          <View style={mttoStyle.table}>
            <View style={mttoStyle.tableRow}>
              <View style={{...mttoStyle.tableColHeader, ...mttoStyle.criticidadCol}}>
                <Text style={mttoStyle.tableCellHeader}>Valor NPR</Text>
              </View>
              <View style={{...mttoStyle.tableColHeader, ...mttoStyle.criticidadCol}}>
                <Text style={mttoStyle.tableCellHeader}>Afectación</Text>
              </View>
              <View style={{...mttoStyle.tableColHeader, ...mttoStyle.criticidadCol}}>
                <Text style={mttoStyle.tableCellHeader}>Probabilidad de falla</Text>
              </View>
              <View style={{...mttoStyle.tableColHeader, ...mttoStyle.criticidadCol}}>
                <Text style={mttoStyle.tableCellHeader}>Detección</Text>
              </View>
              <View style={{...mttoStyle.tableColHeader, ...mttoStyle.criticidadCol, borderRightWidth:0}}>
                <Text style={mttoStyle.tableCellHeader}>Tipo de mantenimiento</Text>
              </View>
            </View>
            <View style={mttoStyle.tableRow}>
              <View style={{...mttoStyle.tableCol, ...mttoStyle.criticidadCol}}>
                <Text style={mttoStyle.tableCell}>{String(data.planeacionMantenimiento.criticidad.valor_total_npr ?? '')}</Text>
              </View>
              <View style={{...mttoStyle.tableCol, ...mttoStyle.criticidadCol}}>
                <Text style={mttoStyle.tableCell}>{data.planeacionMantenimiento.criticidad.afectacion_npr || ''}</Text>
              </View>
              <View style={{...mttoStyle.tableCol, ...mttoStyle.criticidadCol}}>
                <Text style={mttoStyle.tableCell}>{data.planeacionMantenimiento.criticidad.probabilidad_falla || ''}</Text>
              </View>
              <View style={{...mttoStyle.tableCol, ...mttoStyle.criticidadCol}}>
                <Text style={mttoStyle.tableCell}>{data.planeacionMantenimiento.criticidad.deteccion_npr || ''}</Text>
              </View>
              <View style={{...mttoStyle.tableCol, ...mttoStyle.criticidadCol, borderRightWidth:0}}>
                <Text style={mttoStyle.tableCell}>{data.planeacionMantenimiento.criticidad.tipo_mantenimiento || ''}</Text>
              </View>
            </View>
          </View>

          {/* Fechas (dentro de Planeación) */}
          <View style={{...mttoStyle.table, marginTop: 8}}>
             <View style={mttoStyle.tableRow}>
                <View style={{...mttoStyle.tableColHeader, ...mttoStyle.criticidadCol, width: '25%'}}>
                  <Text style={mttoStyle.tableCellHeader}>Fecha programada de inicio</Text>
                </View>
                <View style={{...mttoStyle.tableCol, ...mttoStyle.criticidadCol, width: '25%'}}>
                  <Text style={mttoStyle.tableCell}>{data.planeacionMantenimiento.fechas.fecha_inicio_prog || ''}</Text>
                </View>
                <View style={{...mttoStyle.tableColHeader, ...mttoStyle.criticidadCol, width: '25%'}}>
                  <Text style={mttoStyle.tableCellHeader}>Fecha de finalización del mantenimiento</Text>
                </View>
                <View style={{...mttoStyle.tableCol, ...mttoStyle.criticidadCol, width: '25%', borderRightWidth:0}}>
                  <Text style={mttoStyle.tableCell}>{data.planeacionMantenimiento.fechas.fecha_fin_mant || ''}</Text>
                </View>
             </View>
          </View>

          {/* Costo total del mantenimiento (dentro de Planeación) */}
          <Text style={{ fontSize: 11, fontWeight: 'bold', marginBottom: 4, marginTop: 8 }}>Costo total del mantenimiento</Text>
          <View style={mttoStyle.table}>
            <View style={mttoStyle.tableRow}>
                <View style={{...mttoStyle.tableColHeader, flex: 2}}>
                  <Text style={mttoStyle.tableCellHeader}>Concepto</Text>
                </View>
                <View style={{...mttoStyle.tableColHeader, flex: 1}}>
                  <Text style={mttoStyle.tableCellHeader}>Valor</Text>
                </View>
            </View>
            <View style={mttoStyle.tableRow}>
                <View style={{...mttoStyle.tableCol, flex: 2}}>
                  <Text style={mttoStyle.tableCell}>Costo total del mantenimiento</Text>
                </View>
                <View style={{...mttoStyle.tableCol, flex: 1, borderRightWidth:0}}>
                  <Text style={mttoStyle.tableCell}>{String(data.planeacionMantenimiento.costos.costo_total_mant_valor ?? '0')}</Text>
                </View>
            </View>
            <View style={mttoStyle.tableRow}>
                <View style={{...mttoStyle.tableCol, flex: 2}}>
                  <Text style={mttoStyle.tableCell}>Repuestos</Text>
                </View>
                <View style={{...mttoStyle.tableCol, flex: 1, borderRightWidth:0}}>
                  <Text style={mttoStyle.tableCell}>{String(data.planeacionMantenimiento.costos.costo_repuestos_valor ?? '0')}</Text>
                  </View>
            </View>
            <View style={mttoStyle.tableRow}>
                <View style={{...mttoStyle.tableCol, flex: 2}}>
                  <Text style={mttoStyle.tableCell}>Mano de obra mantenimiento</Text>
                </View>
                <View style={{...mttoStyle.tableCol, flex: 1, borderRightWidth:0}}>
                  <Text style={mttoStyle.tableCell}>{String(data.planeacionMantenimiento.costos.costo_mano_obra_valor ?? '0')}</Text>
                </View>
            </View>
          </View>
          
          {/* Personal Asignado y Tiempo */}
          <View style={{...mttoStyle.table, marginTop: 8}}>
             <View style={mttoStyle.tableRow}>
                <View style={{...mttoStyle.tableColHeader, flex:1}}>
                  <Text style={mttoStyle.tableCellHeader}>Personal Asignado</Text>
                </View>
                <View style={{...mttoStyle.tableColHeader, flex:1, borderRightWidth:0}}>
                  <Text style={mttoStyle.tableCellHeader}>Tiempo del mantenimiento (horas)</Text>
                </View>
             </View>
             <View style={mttoStyle.tableRow}>
                <View style={{...mttoStyle.tableCol, flex:1}}>
                  <Text style={mttoStyle.tableCell}>{data.planeacionMantenimiento.costos.personal_asignado_costo || ''}</Text>
                </View>
                <View style={{...mttoStyle.tableCol, flex:1, borderRightWidth:0}}>
                  <Text style={mttoStyle.tableCell}>{data.planeacionMantenimiento.costos.tiempo_estimado_mant_horas ?? ''}</Text>
                </View>
             </View>
          </View>
        </>
      )}
    </Page>
  </Document>
)

export default WorkOrderPDFDoc