import React from 'react';
import type { RecursoItemData, FormData } from '../../Types/types'; // Ajusta la ruta
import { recursosItems } from '../../Constants/workOrderConstants';
import { styles } from '../../Constants/workOrderConstants';
import { formatNumericInput } from '../../Utils/workOrderUtils';

interface RecursosTableProps {
  recursosData: FormData['planeacionMantenimiento']['recursos'];
  onRecursoChange: (index: number, field: keyof Omit<RecursoItemData, 'id' | 'label'>, value: string) => void;
}

const RecursosTable: React.FC<RecursosTableProps> = ({
  recursosData,
  onRecursoChange,
}) => {
  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden mb-6">
      <div className="grid grid-cols-[minmax(150px,1.5fr)_minmax(150px,2fr)_minmax(80px,1fr)_minmax(150px,2fr)] text-center">
        {['Recursos Necesarios', 'Características', 'Cantidad', 'Observaciones'].map((header, index) => (
          <div 
            key={header}
            className={`${styles.cell.base} ${styles.cell.header} bg-gray-100 dark:bg-gray-700 border-b ${index < 3 ? 'border-r' : 'border-r-0'}`}
          >
            {header}
          </div>
        ))}
      </div>
      
      {recursosData.map((item, index) => (
        <div 
          key={item.id} 
          className={`grid grid-cols-[minmax(150px,1.5fr)_minmax(150px,2fr)_minmax(80px,1fr)_minmax(150px,2fr)] items-start ${index < recursosItems.length - 1 ? 'border-b' : ''} border-gray-300 dark:border-gray-600`}
        >
          <div className={`${styles.cell.base} ${styles.cell.rowLabel} min-h-[58px]`}>
            {item.label}
          </div>
          
          <div className={`${styles.cell.base} ${styles.cell.data} p-1`}>
            <textarea 
              id={`${item.id}_caracteristicas`}
              name={`${item.id}_caracteristicas`}
              rows={2} 
              className={`${styles.input} h-full`} 
              placeholder="..."
              value={item.caracteristicas}
              onChange={(e) => onRecursoChange(index, 'caracteristicas', e.target.value)}
            />
          </div>
          
          <div className={`${styles.cell.base} ${styles.cell.data} p-1`}>
            <input 
              type="number" 
              id={`${item.id}_cantidad`}
              name={`${item.id}_cantidad`}
              className={`${styles.input} h-full`} 
              placeholder="0" 
              min="0"
              value={formatNumericInput(item.cantidad as number | null)} // item.cantidad ahora es number | null
              onChange={(e) => onRecursoChange(index, 'cantidad', e.target.value)}
            />
          </div>
          
          <div className={`${styles.cell.base} ${styles.cell.data} border-r-0 p-1`}>
            <textarea 
              id={`${item.id}_observaciones`}
              name={`${item.id}_observaciones`}
              rows={2} 
              className={`${styles.input} h-full`} 
              placeholder="..."
              value={item.observaciones} 
              onChange={(e) => onRecursoChange(index, 'observaciones', e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
export default React.memo(RecursosTable)
// export default React.memo(RecursosTable); // Opcional: memorizar