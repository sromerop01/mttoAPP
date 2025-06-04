import type { FormData } from '../Types/types'
import { recursosItems } from '../Constants/workOrderConstants'

// ============= UTILIDADES PARA MANEJO DE NÚMEROS =============
export const parseNumericValue = (value: string): number | null => {
  if (value.trim() === '') return null
  const num = parseFloat(value)
  return isNaN(num) ? null : num
}

export const formatNumericInput = (value: number | null): string => {
  return value === null ? '' : String(value)
}

// ============= CREACIÓN DE DATOS INICIALES =============
export const createInitialFormData = (): FormData => ({
  informacionSolicitud: {
    fecha_solicitud: '',
    orden_trabajo_nro: '',
    facultad: '',
    nro_solicitud: '',
    ubicacion_equipo_solicitud: '',
    laboratorio: '',
  },
  informacionEquipo: {
    nombre_equipo: '',
    placa_unal: '',
    info_disponible_qr_filename: '',
    qrImagePreviewUrl: null,
    qrImageFile: null,
    marca_equipo: '',
    modelo_equipo: '',
    serie_equipo: '',
  },
  resultadosDiagnostico: {
    apto_mantenimiento: '',
    nro_personas_diagnostico: 1,
    tiempo_diagnostico_h: 0,
    costo_diagnostico_valor: 0,
  },
  planeacionMantenimiento: {
    recursos: recursosItems.map(item => ({
      ...item,
      caracteristicas: '',
      cantidad: '',
      observaciones: '',
    })),
    criticidad: {
      valor_total_npr: 0,
      afectacion_npr: 0,
      probabilidad_falla: 0,
      deteccion_npr: 0,
      tipo_mantenimiento: '',
    },
    fechas: {
      fecha_inicio_prog: '',
      fecha_fin_mant: ''
    },
    costos: {
      costo_total_mant_valor: 0,
      costo_repuestos_valor: 0,
      costo_mano_obra_valor: 0,
      personal_asignado_costo: '',
      tiempo_estimado_mant_horas: 0,
      tiempo_mant_horas: 0,
    },
  },
})

// ============= VALIDACIONES =============
export const validateFormData = (formData: FormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  // Validar información de solicitud
  if (!formData.informacionSolicitud.fecha_solicitud) {
    errors.push('La fecha de solicitud es requerida')
  }
  if (!formData.informacionSolicitud.orden_trabajo_nro) {
    errors.push('El número de orden de trabajo es requerido')
  }

  // Validar información del equipo
  if (!formData.informacionEquipo.nombre_equipo) {
    errors.push('El nombre del equipo es requerido')
  }
  if (!formData.informacionEquipo.placa_unal) {
    errors.push('La placa UNAL es requerida')
  }

  // Validar diagnóstico
  if (!formData.resultadosDiagnostico.apto_mantenimiento) {
    errors.push('Debe indicar si el equipo está apto para mantenimiento')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// ============= FORMATEO DE DATOS PARA ENVÍO =============
export const formatFormDataForSubmission = (formData: FormData) => {
  return {
    ...formData,
    // Convertir valores null a 0 para números
    resultadosDiagnostico: {
      ...formData.resultadosDiagnostico,
      nro_personas_diagnostico: formData.resultadosDiagnostico.nro_personas_diagnostico ?? 1,
      tiempo_diagnostico_h: formData.resultadosDiagnostico.tiempo_diagnostico_h ?? 0,
      costo_diagnostico_valor: formData.resultadosDiagnostico.costo_diagnostico_valor ?? 0,
    },
    planeacionMantenimiento: {
      ...formData.planeacionMantenimiento,
      criticidad: {
        ...formData.planeacionMantenimiento.criticidad,
        valor_total_npr: formData.planeacionMantenimiento.criticidad.valor_total_npr ?? 0,
        afectacion_npr: formData.planeacionMantenimiento.criticidad.afectacion_npr ?? 0,
        probabilidad_falla: formData.planeacionMantenimiento.criticidad.probabilidad_falla ?? 0,
        deteccion_npr: formData.planeacionMantenimiento.criticidad.deteccion_npr ?? 0,
      },
      costos: {
        ...formData.planeacionMantenimiento.costos,
        costo_total_mant_valor: formData.planeacionMantenimiento.costos.costo_total_mant_valor ?? 0,
        costo_repuestos_valor: formData.planeacionMantenimiento.costos.costo_repuestos_valor ?? 0,
        costo_mano_obra_valor: formData.planeacionMantenimiento.costos.costo_mano_obra_valor ?? 0,
        tiempo_estimado_mant_horas: formData.planeacionMantenimiento.costos.tiempo_estimado_mant_horas ?? 0,
        tiempo_mant_horas: formData.planeacionMantenimiento.costos.tiempo_mant_horas ?? 0,
      }
    }
  }
}