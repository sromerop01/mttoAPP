import {StyleSheet } from '@react-pdf/renderer'

//Estilos para el PDF
export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Helvetica', // O una fuente que hayas registrado
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
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
})
export const infoEquipoStyle = StyleSheet.create({
    // Contenedor principal de toda la tabla
  tableContainer: {
    flexDirection: 'column',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    width: '100%',
  },
  // Contenedor para una fila de la tabla principal
  tableRow: {
    flexDirection: 'row',
  },
  // --- Celdas de la primera fila ---
  topHeaderCell: {
    width: '35%', // Ancho de la primera columna
    backgroundColor: '#f2f2f2',
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  topValueCell: {
    width: '65%', // Ancho de la segunda columna
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  // --- Celdas de la segunda fila (la compleja) ---
  // Celda izquierda que simula el 'rowspan'
  rowSpanCell: {
    width: '35%',
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
    justifyContent: 'center', // Centra el texto verticalmente
  },
  // Contenedor para las 4 filas pequeñas de la derecha
  nestedTable: {
    width: '65%',
    flexDirection: 'column',
  },
  // Fila dentro de la tabla anidada
  nestedRow: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#bfbfbf',
  },
  // La última fila anidada no necesita borde inferior
  lastNestedRow: {
    flexDirection: 'row',
  },
  // Celda de "etiqueta" (ej. "Marca:")
  nestedKeyCell: {
    width: '40%',
    padding: 5,
    backgroundColor: '#f2f2f2',
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderColor: '#bfbfbf',
  },
  // Celda de "valor" (la vacía)
  nestedValueCell: {
    width: '60%',
    padding: 5,
  },
  // Estilos del texto
  cellText: {
    fontSize: 10,
  },
  boldText: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
  },
})
export const diagStyle = StyleSheet.create({
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
  diagCol: { width: `${100/5}%` }, // Dividir equitativamente
    equipoSectionTitle: { // Prefijo para el título de la sección
    marginBottom: 10,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    padding: 5,
    textAlign: 'center',
  },
  tableCellHeader: {
    fontSize: 9,
    fontWeight: 'bold',
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
  tableCell: {
    fontSize: 9,
    textAlign: 'left',
  },
})
export const mttoStyle = StyleSheet.create({
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
  recursoCol1: { width: '25%' }, // Recurso Necesario
  recursoCol2: { width: '35%' }, // Características
  recursoCol3: { width: '15%' }, // Cantidad
  recursoCol4: { width: '25%' }, // Observaciones
  tableCellHeader: {
    fontSize: 9,
    fontWeight: 'bold',
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
  tableCell: {
    fontSize: 9,
    textAlign: 'left',
  },
   criticidadCol: { width: `${100/5}%` },
})
