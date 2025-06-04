import FormField from '../Form/FormField'
import FormSection from '../Form/FormSection'
import { equipoInfoField } from '../../Constants/workOrderConstants'
import type { FormData } from '../../Types/types'
import { styles } from '../../Constants/workOrderConstants'

interface EquipoSectionProps {
  formData: FormData['informacionEquipo']
  onChange: (field: string, value: string) => void
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const EquipoSection = ({ formData, onChange, onFileChange }: EquipoSectionProps) => {
    return(
        <FormSection 
            title="Información del equipo" 
            contentContainerClassName="border border-gray-300 dark:border-gray-600 rounded-lg grid md:grid-cols-[1fr_1.5fr]"
        >
        {/* Dropzone para QR */}
        <div className="p-3 border-e md:border-e-gray-300 md:dark:border-e-gray-600">
            <label htmlFor="dropzone-file-qr" className={`${styles.label} mb-2`}>
            Información disponible del equipo (QR)
            </label>
            <div className="flex items-center justify-center w-full">
            <label 
                htmlFor="dropzone-file-qr"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click para subir</span> o arrastra y suelta
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG o GIF (MAX. 800x400px)</p>
                </div>
                <input 
                    id="dropzone-file-qr"
                    type="file" 
                    className="hidden" 
                    accept="image/png, image/jpeg, image/gif, image/svg+xml"
                    onChange={onFileChange}
                />
                {formData.info_disponible_qr_filename && (
                <p className="text-xs mt-1">Archivo: {formData.info_disponible_qr_filename}</p>
                )}
            </label>
            </div> 
        </div>
        
        {/* Información del equipo */}
        <div className="p-3">
            {equipoInfoField.map(field => (
                
            <FormField
                key={field.id}
                {...field}
                wrapperClassName={`grid grid-cols-[max-content_1fr] items-center gap-x-3 gap-y-1 ${field.id === 'serie_equipo' ? 'mb-0' : 'mb-3'}`}
                labelClassName={field.labelClassNameOverwrite || styles.label}
                value={formData[field.id as keyof typeof formData]}
                onChange={(e) => {onChange(field.id, e.target.value)}}
            />
            ))}
        </div>
        </FormSection>
    )
}

export default EquipoSection