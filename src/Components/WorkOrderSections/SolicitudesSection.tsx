import FormField from '../Form/FormField'
import FormSection from '../Form/FormSection'
import { solicitudField } from '../../Constants/workOrderConstants'
import type { FormData } from '../../Types/types'

interface SolicitudSectionProps {
  formData: FormData['informacionSolicitud']
  onChange: (field: string, value: string) => void
}

const SolicitudSection = ({ formData, onChange }: SolicitudSectionProps) => {
  return (
    <FormSection 
      title="Información de la Solicitud" 
      contentContainerClassName="p-3 grid gap-6 md:grid-cols-2"
    >
      {solicitudField.map(field => (
        <FormField
          key={field.id}
          {...field}
          value={formData[field.id as keyof typeof formData]}
          onChange={(e) => onChange(field.id, e.target.value)}
        />
      ))}
    </FormSection>
  )
}

export default SolicitudSection