
import { useWorkOrderForm } from "../../Hooks/useWorkOrderForm"
import SolicitudSection from "../../Components/WorkOrderSections/SolicitudesSection"
import EquipoSection from '../../Components/WorkOrderSections/EquipoSection'
import DiagnosticoSection from '../../Components/WorkOrderSections/DiagnosticoSection'
import PlaneacionSection from '../../Components/WorkOrderSections/PlaneacionSection'
import WorkOrderPDFDoc from "../../Reports/WorkOrderPDFDoc"
import { PDFViewer } from "@react-pdf/renderer"

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


  // ============= HANDLERS ESPECÍFICOS =============
  const handleSolicitudChange = (field: string, value: string) => {
    handleSimpleChange('informacionSolicitud', field, value)
  }

  const handleEquipoChange = (field: string, value: string) => {
    handleSimpleChange('informacionEquipo', field, value)
  }

  const handleDiagnosticoChange = (field: string, value: string, isNumber = false) => {
    handleSimpleChange('resultadosDiagnostico', field, value, isNumber)

    if (field === 'nro_personas_diagnostico' || field === 'tiempo_diagnostico_h') {
      // Obtenemos los valores actualizados para el cálculo.
      const nroPersonasStr = field === 'nro_personas_diagnostico' ? value : String(formData.resultadosDiagnostico.nro_personas_diagnostico);
      const tiempoDiagnosticoStr = field === 'tiempo_diagnostico_h' ? value : String(formData.resultadosDiagnostico.tiempo_diagnostico_h);
      const nroPersonas = parseFloat(nroPersonasStr);
      const tiempoDiagnostico = parseFloat(tiempoDiagnosticoStr);

      let costoDiagnostico = 0;
      if (!isNaN(nroPersonas) && !isNaN(tiempoDiagnostico) && nroPersonas >= 0 && tiempoDiagnostico >= 0) {
        costoDiagnostico = (nroPersonas * tiempoDiagnostico * 17700); // 17,700 es el valor por hora
      }

      // Actualiza el campo costo_diagnostico_valor en el formData
      handleSimpleChange('resultadosDiagnostico', 'costo_diagnostico_valor', costoDiagnostico, true);
    }
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(
      e,
      (data) => {
        // Lógica de éxito
        console.log('✅ Orden de trabajo creada exitosamente:', data)
      },
      (errors) => {
        // Lógica de error
        console.error('❌ Errores en el formulario:', errors)
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

          {/* Sección de Planeación */}
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

        {/* Opcional: Para visualizar el PDF directamente en la página */}
        <div style={{ marginTop: '20px', height: '70vh', border: '1px solid #ccc' }}>
          <PDFViewer width="100%" height="100%">
            <WorkOrderPDFDoc data={formData} />
          </PDFViewer>
        </div>

      </div>
    </>
  )
}

export default WorkOrder