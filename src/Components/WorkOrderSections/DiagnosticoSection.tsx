import FormSection from '../Form/FormSection'
import type { FormData } from '../../Types/types'
import { formatNumericInput } from '../../Utils/workOrderUtils'
import { styles } from '../../Constants/workOrderConstants'

interface DiagnosticoSectionProps {
  formData: FormData['resultadosDiagnostico']
  onChange: (field: string, value: string, isNumber?: boolean) => void
}

const DiagnosticoSection = ({ formData, onChange }: DiagnosticoSectionProps) => {
    return(
        <FormSection 
            title="Resultados del diagnóstico" 
            titleClassName="my-6 text-xl font-semibold dark:text-white border-b pb-2 pt-4 text-center" 
            contentContainerClassName="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"
        >
            {/* Headers */}
            <div className="grid grid-cols-4 text-center">
                {[
                'Equipo APTO para el mantenimiento',
                'N° Personas que realizaron el diagnóstico',
                'Tiempo de diagnóstico (h)',
                'Costo diagnóstico'
                ].map((header, index) => (
                <div 
                    key={header}
                    className={`p-3 font-medium text-sm text-gray-800 dark:text-white border-b border-gray-300 dark:border-gray-600 ${index < 3 ? 'border-r' : ''}`}
                >
                    {header}
                </div>
                ))}
            </div>
            
            {/* Inputs */}
            <div className="grid grid-cols-4">
                <div className="p-2 border-r border-gray-300 dark:border-gray-600">
                <select 
                    className={styles.input} 
                    required
                    value={formData.apto_mantenimiento}
                    onChange={(e) => onChange('apto_mantenimiento', e.target.value, false)}
                >
                    <option value="">- SI/NO -</option>
                    <option value="yes">Sí</option>
                    <option value="no">No</option>
                </select>
                </div>
                
                <div className="p-2 border-r border-gray-300 dark:border-gray-600">
                <input 
                    type="number" 
                    className={styles.input} 
                    step="1" 
                    min="1" 
                    max="4" 
                    required 
                    value={formatNumericInput(formData.nro_personas_diagnostico)}
                    onChange={(e) => onChange('nro_personas_diagnostico', e.target.value, true)}
                />
                </div>
                
                <div className="p-2 border-r border-gray-300 dark:border-gray-600">
                <input 
                    type="number" 
                    className={styles.input} 
                    step="0.01" 
                    min="0" 
                    required
                    value={formatNumericInput(formData.tiempo_diagnostico_h)}
                    onChange={(e) => onChange('tiempo_diagnostico_h', e.target.value, true)}
                />
                </div>
                
                <div className="p-2">
                <input 
                    type="number" 
                    className={styles.input} 
                    min="0" 
                    step="0.1" 
                    required 
                    value={formatNumericInput(formData.costo_diagnostico_valor)}
                    onChange={(e) => onChange('costo_diagnostico_valor', e.target.value, true)}
                />
                </div>
            </div>
        </FormSection>
    )
}

export default DiagnosticoSection