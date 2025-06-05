
export interface FormSectionProps {
  title: string
  titleClassName?: string
  children: React.ReactNode
  className?: string // Clases para el div que envuelve título y contenido
  contentContainerClassName?: string // Clases para el div que envuelve solo el children
}

export interface FormFieldProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  value?: string | number | null | File // Para componentes controlados
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  inputClassName?: string
  labelClassName?: string
  wrapperClassName?: string // Clases para el div que envuelve label e input
  pattern?: string
  min?: string | number
  max?: string | number
  step?: string | number
  rows?: number
  accept?: string
  children?: React.ReactNode // Para <select> options, por ejemplo
}

export interface FieldConfig {
  id: string
  label: string
  type?: string // Hacer 'type' opcional aquí si FormField siempre lo maneja
  placeholder?: string
  required?: boolean
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  labelClassNameOverwrite?: string
  wrapperClassNameOverwrite?: string // Para clases del div que envuelve label+input
  pattern?: string
}

export interface RecursoItemData {
  id: string;
  label: string;
  caracteristicas: string;
  cantidad: number | string; // Usar string para inputs, luego parsear, o number y manejar NaN
  observaciones: string;
}

export interface FormData {
  informacionSolicitud: {
    fecha_solicitud: string;
    orden_trabajo_nro: string;
    facultad: string;
    nro_solicitud: string;
    ubicacion_equipo_solicitud: string;
    laboratorio: string;
  };
  informacionEquipo: {
    nombre_equipo: string;
    placa_unal: string;
    info_disponible_qr_filename: string;   // Nombre del archivo
    qrImagePreviewUrl?: string | null;     // URL para la vista previa de la imagen
    qrImageFile?: File | null;
    marca_equipo: string;
    modelo_equipo: string;
    serie_equipo: string;
  };
  resultadosDiagnostico: {
    apto_mantenimiento: string; // 'yes', 'no', o ''
    nro_personas_diagnostico: number | null;
    tiempo_diagnostico_h: number | null;
    costo_diagnostico_valor: number | null;
  };
  planeacionMantenimiento: {
    recursos: RecursoItemData[];
    criticidad: {
      valor_total_npr: number | null;
      afectacion_npr: number | null;
      probabilidad_falla: number | null;
      deteccion_npr: number | null;
      tipo_mantenimiento: string;
    };
    fechas: {
      fecha_inicio_prog: string;
      fecha_fin_mant: string;
    };
    costos: {
      costo_total_mant_valor: number | null;
      costo_repuestos_valor: number | null;
      costo_mano_obra_valor: number | null;
      personal_asignado_costo: string;
      tiempo_estimado_mant_horas: number | null;
      tiempo_mant_horas: number | null;
    };
  };
}