import React from 'react';
import type { FormData } from '../../Types/types'; // Ajusta la ruta
import { styles } from '../../Constants/workOrderConstants';
import { formatNumericInput } from '../../Utils/workOrderUtils';
import { mantenimientoOptions } from '../../Constants/workOrderConstants';

interface CriticidadSectionProps {
  criticidadData: FormData['planeacionMantenimiento']['criticidad'];
  fechasData: FormData['planeacionMantenimiento']['fechas'];
  costosData: FormData['planeacionMantenimiento']['costos'];
  onPlaneacionChange: (
    subSection: keyof FormData['planeacionMantenimiento'], 
    field: string, 
    value: number | string | null, 
    isNumber?: boolean
  ) => void;
}

const CriticidadSection: React.FC<CriticidadSectionProps> = ({
  criticidadData,
  fechasData,
  costosData,
  onPlaneacionChange,
}) => {
  return (
    <div className="border border-gray-400 dark:border-gray-500 rounded-lg overflow-hidden">
      {/* Título principal de Criticidad */}
      <div className={styles.criticidad.mainTitle}>Criticidad del mantenimiento</div>
      
      {/* Headers de criticidad */}
      <div className="grid grid-cols-5">
        {['NPR', 'Afectación', 'Probabilidad de falla', 'Detección', 'Tipo de mantenimiento'].map((header, index, arr) => (
          <div 
            key={header}
            className={`${styles.criticidad.header} ${index === arr.length - 1 ? 'border-r-0' : ''}`}
          >
            {header}
          </div>
        ))}
      </div>
      
      {/* Inputs de criticidad */}
      <div className="grid grid-cols-5">
        {[
          {id: 'valor_total_npr', placeholder: '0', isNumber: true}, 
          {id: 'afectacion_npr', placeholder: '0', isNumber: true}, // Asumiendo que afectación es numérico
          {id: 'probabilidad_falla', placeholder: '0', isNumber: true}, // Asumiendo numérico
          {id: 'deteccion_npr', placeholder: '0', isNumber: true} // Asumiendo numérico
        ].map(f => (
          <div key={f.id} className={styles.criticidad.data}>
            <input type="number" id={f.id} name={f.id} className={styles.input} placeholder={f.placeholder} 
              value={formatNumericInput(criticidadData[f.id as keyof typeof criticidadData] as number | null)}
              onChange={(e) => onPlaneacionChange('criticidad', f.id, e.target.value, true)} />
          </div>
        ))}
        <div className={`${styles.criticidad.data} border-r-0`}>
          <select 
            id="tipo_mantenimiento" name="tipo_mantenimiento" className={styles.input}
            value={criticidadData.tipo_mantenimiento}
            onChange={(e) => onPlaneacionChange('criticidad', 'tipo_mantenimiento', e.target.value)}
          >
            <option value="">-</option>
            {mantenimientoOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Sección de fechas */}
      <div className="grid grid-cols-4 items-center border-t border-gray-300 dark:border-gray-600">
        <div className={`${styles.cell.base} ${styles.cell.rowLabel} border-b-0`}>Fecha programada de inicio</div>
        <div className={`${styles.cell.base} ${styles.cell.data} border-b-0 p-1`}><input type="date" id="fecha_inicio_prog" name="fecha_inicio_prog" className={styles.input} value={fechasData.fecha_inicio_prog} onChange={(e) => onPlaneacionChange('fechas', 'fecha_inicio_prog', e.target.value)} /></div>
        <div className={`${styles.cell.base} ${styles.cell.rowLabel} border-b-0`}>Fecha de finalización del mantenimiento</div>
        <div className={`${styles.cell.base} ${styles.cell.data} border-b-0 p-1`}><input type="date" id="fecha_fin_mant" name="fecha_fin_mant" className={styles.input} value={fechasData.fecha_fin_mant} onChange={(e) => onPlaneacionChange('fechas', 'fecha_fin_mant', e.target.value)} /></div>
      </div>
      
      {/* Sección de costos - Título */}
      <div className={`${styles.criticidad.mainTitle} border-t`}>Costo total del mantenimiento</div>
      
      {/* Fila de Costos */}
      <div className="grid grid-cols-4 items-center border-t border-gray-300 dark:border-gray-600">
        <div className={`${styles.cell.base} ${styles.cell.rowLabel}`}>Costo total del mantenimiento</div>
        {[
          { field: 'costo_total_mant_valor', label: 'Costo total' },
          { field: 'costo_repuestos_valor', label: 'Repuestos' },
          { field: 'costo_mano_obra_valor', label: 'Mano de obra' }
        ].map(({ field, label }, index) => (
          <div key={field} className={`${styles.cell.base} ${styles.cell.data} p-1 ${index === 2 ? 'border-r-0' : ''}`}>
            <label className={`${styles.label} text-xs text-center`}>{label}</label>
            <input 
              type="number" 
              className={styles.input} 
              placeholder="0" 
              min="0"
              value={formatNumericInput(costosData[field as keyof typeof costosData] as number)}
              onChange={(e) => onPlaneacionChange('costos', field, e.target.value, true)}
            />
          </div>
        ))}
      </div>
      
      {/* Sección de personal y tiempo */}
      <div className="grid grid-cols-6 items-center border-t border-gray-300 dark:border-gray-600">
        <div className={styles.cell.base + ' ' + styles.cell.rowLabel}>Personal Asignado</div>
        <div className={`${styles.cell.base} ${styles.cell.data} col-span-2 p-1`}>
          <input type="text" id="personal_asignado_costo" name="personal_asignado_costo" className={styles.input} placeholder="Nombres o roles"
            value={costosData.personal_asignado_costo}
            onChange={(e) => onPlaneacionChange('costos', 'personal_asignado_costo', e.target.value)} />
        </div>
        <div className={`${styles.cell.base} ${styles.cell.rowLabel} border-r flex-col !items-center justify-center text-xs text-center`}>
          <div>Tiempo estimado para el mantenimiento</div>
          <div>Tiempo del mantenimiento (horas)</div>
        </div>
        <div className={`${styles.cell.base} ${styles.cell.data} grid gap-6 col-span-2 border-r-0 p-1`}>
          <input 
            type="number" 
            className={styles.input} 
            placeholder="0" 
            min="0" 
            step="0.1"
            value={formatNumericInput(costosData.tiempo_estimado_mant_horas)}
            onChange={(e) => onPlaneacionChange('costos', 'tiempo_estimado_mant_horas', e.target.value, true)}
          />
          <input 
            type="number" 
            className={styles.input} 
            placeholder="0" 
            min="0" 
            step="0.1"
            value={formatNumericInput(costosData.tiempo_mant_horas)}
            onChange={(e) => onPlaneacionChange('costos', 'tiempo_mant_horas', e.target.value, true)}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CriticidadSection)
