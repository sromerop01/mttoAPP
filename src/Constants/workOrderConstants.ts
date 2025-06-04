import type { FieldConfig } from '../Types/types'

// ============= CONFIGURACIONES DE CAMPOS =============
export const solicitudField: FieldConfig[] = [
  { id: "fecha_solicitud", label: "Fecha de solicitud:", type: "date", required: true },
  { id: "orden_trabajo_nro", label: "Orden de trabajo Nro:", type: "text", placeholder: "Ej: 2023-001", required: true },
  { id: "facultad", label: "Facultad", type: "text", placeholder: "Facultad de Minas", required: true },
  { id: "nro_solicitud", label: "Nro. Solicitud", type: "text", placeholder: "Ej: S-002", required: true },
  { id: "ubicacion_equipo_solicitud", label: "Ubicacion del equipo", type: "text", placeholder: "Edificio M3 - Oficina 210", required: true },
  { id: "laboratorio", label: "Laboratorio", type: "text", placeholder: "Laboratorio de Química", required: true },
]

export const equipoInfoField: FieldConfig[] = [
  { id: "nombre_equipo", label: "Equipo:", type: "text", placeholder: "Ej: Microscopio Electrónico", required: true },
  { id: "placa_unal", label: "Identificación del equipo (Placa UNAL):", type: "text", placeholder: "Ej: 123456", labelClassNameOverwrite: "block text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap", required: true },
  { id: "marca_equipo", label: "Marca:", type: "text", placeholder: "Ej: Olympus" },
  { id: "modelo_equipo", label: "Modelo:", type: "text", placeholder: "Ej: BX53" },
  { id: "serie_equipo", label: "Número de serie:", type: "text", placeholder: "Ej: SN987654", labelClassNameOverwrite: "block text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap" },
]

export const recursosItems = [
  { id: 'personal', label: 'Personal' },
  { id: 'equipos_herramientas', label: 'Equipos/Herramientas' },
  { id: 'insumos', label: 'Insumos' },
  { id: 'elementos_proteccion', label: 'Elementos de protección personal' },
  { id: 'otros_recursos', label: 'Otros' },
]

export const mantenimientoOptions = [
  { value: 'preventivo', label: 'Preventivo' },
  { value: 'correctivo', label: 'Correctivo' },
]

// ============= ESTILOS =============
export const styles = {
  input: "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
  label: "block text-sm font-medium text-gray-900 dark:text-white mb-1",
  cell: {
    base: "p-2 border-gray-300 dark:border-gray-600",
    header: "dark:bg-gray-700 font-medium text-gray-800 dark:text-white text-center border-b border-r",
    data: "bg-white dark:bg-gray-900",
    rowLabel: "text-white dark:bg-gray-750 font-medium flex items-center",
  },
  criticidad: {
    mainTitle: "p-3 bg-gray-700 text-white font-semibold text-center border-b border-gray-400 dark:border-gray-500",
    header: "p-2 bg-gray-600 text-white font-medium text-sm text-center border-b border-r border-gray-400 dark:border-gray-500",
    data: "p-1 bg-white dark:bg-gray-800 border-b border-r border-gray-400 dark:border-gray-500",
  }
}

// ============= TEXTOS Y LABELS =============
export const diagnosticoHeaders = [
  'Equipo APTO para el mantenimiento',
  'N° Personas que realizaron el diagnóstico',
  'Tiempo de diagnóstico (h)',
  'Costo diagnóstico'
]

export const recursosHeaders = [
  'Recursos Necesarios', 
  'Características', 
  'Cantidad', 
  'Observaciones'
]

export const criticidadHeaders = [
  'Valor total', 
  'Afectación', 
  'Probabilidad de falla', 
  'Detección', 
  'Tipo de mantenimiento'
]

export const costosLabels = [
  { field: 'costo_total_mant_valor', label: 'Costo total' },
  { field: 'costo_repuestos_valor', label: 'Repuestos' },
  { field: 'costo_mano_obra_valor', label: 'Mano de obra' }
]