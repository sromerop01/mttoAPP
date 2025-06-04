import { useEffect } from "react"
import { initFlowbite } from "flowbite"
import { useWorkOrderForm } from "../../Hooks/useWorkOrderForm"
import SolicitudSection from "../../Components/WorkOrderSections/SolicitudesSection"
import EquipoSection from '../../Components/WorkOrderSections/EquipoSection'
import DiagnosticoSection from '../../Components/WorkOrderSections/DiagnosticoSection'
import PlaneacionSection from '../../Components/WorkOrderSections/PlaneacionSection'


const WorkOrder = () => {
  const {
    formData,
    handleSimpleChange,
    handlePlaneacionChange,
    handleRecursoChange,
    handleQrFileChange,
    handleSubmit,
    isFormValid
  } = useWorkOrderForm()

  useEffect(() => {
    initFlowbite()
  }, [])

  // ============= HANDLERS ESPECÍFICOS =============
  const handleSolicitudChange = (field: string, value: string) => {
    handleSimpleChange('informacionSolicitud', field, value)
  }

  const handleEquipoChange = (field: string, value: string) => {
    handleSimpleChange('informacionEquipo', field, value)
  }

  const handleDiagnosticoChange = (field: string, value: string, isNumber = false) => {
    handleSimpleChange('resultadosDiagnostico', field, value, isNumber)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(
      e,
      (data) => {
        // Lógica de éxito
        console.log('✅ Orden de trabajo creada exitosamente:', data)
        // Aquí podrías hacer una llamada a la API, mostrar un toast, etc.
      },
      (errors) => {
        // Lógica de error
        console.error('❌ Errores en el formulario:', errors)
        // Aquí podrías mostrar los errores al usuario
        alert('Por favor, complete todos los campos requeridos:\n' + errors.join('\n'))
      }
    )
  }

  // ============= RENDER PRINCIPAL =============
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Orden de trabajo
      </h1>
      
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <form onSubmit={handleFormSubmit}>
          {/* Sección de Solicitud */}
          <SolicitudSection
            formData={formData.informacionSolicitud}
            onChange={handleSolicitudChange}
          />

          {/* Sección de Equipo */}
          <EquipoSection
            formData={formData.informacionEquipo}
            onChange={handleEquipoChange}
            onFileChange={handleQrFileChange}
          />

          {/* Sección de Diagnóstico */}
          <DiagnosticoSection
            formData={formData.resultadosDiagnostico}
            onChange={handleDiagnosticoChange}
          />

          {/* Sección de Planeación - Solo si el equipo está apto */}
          {formData.resultadosDiagnostico.apto_mantenimiento === 'yes' && (
            <PlaneacionSection
              formData={formData.planeacionMantenimiento}
              onPlaneacionChange={handlePlaneacionChange}
              onRecursoChange={handleRecursoChange}
            />
          )}

          {/* Botón de Envío */}
          <div className="mt-8">
            <button 
              type="submit" 
              disabled={!isFormValid()}
              className={`font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center transition-colors ${
                isFormValid()
                  ? 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  : 'text-gray-400 bg-gray-300 cursor-not-allowed dark:bg-gray-600 dark:text-gray-500'
              }`}
            >
              Crear Orden de Trabajo
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default WorkOrder