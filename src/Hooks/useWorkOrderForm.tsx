import { useState, useCallback } from 'react'
import type { FormData, RecursoItemData } from '../Types/types'
import { 
  createInitialFormData, 
  parseNumericValue, 
  validateFormData,
  formatFormDataForSubmission 
} from '../Utils/workOrderUtils'

import WorkOrderPDFDoc from '../Reports/WorkOrderPDFDoc';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

export const useWorkOrderForm = () => {
  const [formData, setFormData] = useState<FormData>(createInitialFormData)

  // ============= HANDLERS DE CAMBIO =============
  const handleSimpleChange = useCallback((
    section: keyof FormData,
    field: string,
    value: string | number | boolean,
    isNumber: boolean = false
  ) => {
    setFormData(prev => {
      const sectionData = prev[section]
      const processedValue = isNumber && typeof value === 'string' 
        ? parseNumericValue(value) 
        : value

      return {
        ...prev,
        [section]: {
          ...sectionData,
          [field]: processedValue,
        },
      }
    })
  }, [])

  const handlePlaneacionChange = useCallback((
    subSection: keyof FormData['planeacionMantenimiento'],
    field: string,
    value: string | number | null,
    isNumber: boolean = false
  ) => {
    setFormData(prev => {
      const processedValue = isNumber && typeof value === 'string' 
        ? parseNumericValue(value) 
        : value

      return {
        ...prev,
        planeacionMantenimiento: {
          ...prev.planeacionMantenimiento,
          [subSection]: {
            ...prev.planeacionMantenimiento[subSection],
            [field]: processedValue,
          }
        }
      }
    })
  }, [])

  const handleRecursoChange = useCallback((
    index: number,
    field: keyof Omit<RecursoItemData, 'id' | 'label'>,
    value: string
  ) => {
    setFormData(prev => {
      const updatedRecursos = prev.planeacionMantenimiento.recursos.map((item, i) =>
        i === index ? { 
          ...item, 
          [field]: field === 'cantidad' ? (parseInt(value) || '') : value 
        } : item
      )
      return {
        ...prev,
        planeacionMantenimiento: {
          ...prev.planeacionMantenimiento,
          recursos: updatedRecursos,
        },
      }
    })
  }, [])

  // const handleQrFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0]
  //   if (file) {
  //     setFormData(prev => ({
  //       ...prev,
  //       informacionEquipo: {
  //         ...prev.informacionEquipo,
  //         info_disponible_qr_filename: file.name,
  //       },
  //     }))
  //   }
  // }, [])

  const handleQrFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]; // El objeto File en sí
  
  setFormData(prev => {
    // Si había una URL de vista previa anterior, la revocamos para liberar memoria
    if (prev.informacionEquipo.qrImagePreviewUrl) {
      URL.revokeObjectURL(prev.informacionEquipo.qrImagePreviewUrl);
    }

    if (file) {
      return {
        ...prev,
        informacionEquipo: {
          ...prev.informacionEquipo,
          info_disponible_qr_filename: file.name,        // Guardar nombre del archivo
          qrImagePreviewUrl: URL.createObjectURL(file),  // Crear y guardar URL de vista previa
          qrImageFile: file,                             // Guardar el objeto File
        },
      };
    } else { // No se seleccionó archivo o se canceló
      return {
        ...prev,
        informacionEquipo: {
          ...prev.informacionEquipo,
          info_disponible_qr_filename: '',
          qrImagePreviewUrl: null,
          qrImageFile: null, // Limpiar el objeto File también
        },
      };
    }
  });

  // Importante: Limpiar el valor del input de archivo
  // Esto permite que el evento onChange se dispare si el usuario selecciona el MISMO archivo otra vez
  if (e.target) {
    e.target.value = '';
  }
  }, []);

  // const handleSubmit = useCallback(async ( // Marcado como async si vas a hacer llamadas API
  //     e: React.FormEvent<HTMLFormElement>,
  //     onSuccess?: (submissionPayload: globalThis.FormData, processedData: FormData) => void, // Cambiado tipo de onSuccess
  //     onError?: (errors: string[]) => void
  //   ) => {
  //     e.preventDefault();
      
  //     const validation = validateFormData(formData); // Tu función de validación
      
  //     if (!validation.isValid) {
  //       console.error('Errores de validación:', validation.errors);
  //       onError?.(validation.errors);
  //       return;
  //     }
  
  //     // Prepara los datos para el envío, incluyendo el archivo
  //     // Tu función formatFormDataForSubmission podría hacer esto, o lo haces aquí.
  //     // Por ahora, asumiré que formatFormDataForSubmission devuelve el objeto FormData de React
  //     // y nosotros creamos el objeto FormData de la API Web aquí.
  //     const reactFormData = formatFormDataForSubmission(formData); // Tus datos procesados/parseados
  //     console.log('Formulario React listo para procesar:', reactFormData);
  
  //     const submissionPayload = new globalThis.FormData(); // Objeto FormData de la API Web
  
  //     // Añadir campos al submissionPayload
  //     // Debes decidir cómo estructurar esto para tu backend.
  //     // Ejemplo: enviar cada sección como un JSON string, o campos individuales.
  //     for (const sectionKey in reactFormData) {
  //       if (Object.prototype.hasOwnProperty.call(reactFormData, sectionKey)) {
  //         const sectionValue = reactFormData[sectionKey as keyof FormData];
  //         if (sectionKey === 'informacionEquipo' && typeof sectionValue === 'object' && sectionValue !== null) {
  //           const { qrImageFile, ...restoEquipo } = sectionValue as FormData['informacionEquipo'];
  //           submissionPayload.append(sectionKey, JSON.stringify(restoEquipo)); // Enviar resto como JSON
  //           if (qrImageFile instanceof File) {
  //             submissionPayload.append('qrImage', qrImageFile, qrImageFile.name); // 'qrImage' es el nombre del campo para el backend
  //           }
  //         } else if (sectionKey === 'planeacionMantenimiento' && typeof sectionValue === 'object' && sectionValue !== null) {
  //             // Manejar el array de recursos y otros objetos anidados si es necesario
  //             submissionPayload.append(sectionKey, JSON.stringify(sectionValue));
  //         }
  //         else if (typeof sectionValue === 'object' && sectionValue !== null) {
  //           submissionPayload.append(sectionKey, JSON.stringify(sectionValue));
  //         } else if (sectionValue !== undefined && sectionValue !== null) {
  //           submissionPayload.append(sectionKey, String(sectionValue));
  //         }
  //       }
  //     }
      
  //     console.log('Payload para enviar al backend (FormData API):');
  //     for(const pair of submissionPayload.entries()) {
  //       console.log(pair[0]+ ', ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
  //     }
  
  //     // Aquí harías la llamada a tu API:
  //     // try {
  //     //   // const response = await fetch('/api/tu-endpoint', { method: 'POST', body: submissionPayload });
  //     //   // if (!response.ok) throw new Error('Error en la respuesta del servidor');
  //     //   // const result = await response.json();
  //     //   // onSuccess?.(submissionPayload, result); // o solo result
  //     //   alert('Simulación de envío exitoso!');
  //          onSuccess?.(submissionPayload, reactFormData); // Pasar el FormData de API y los datos procesados
  //     // } catch (apiError) {
  //     //   console.error('Error al enviar al API:', apiError);
  //     //   onError?.(['Error al conectar con el servidor']);
  //     // }
  
  //   }, [formData]); // formatFormDataForSubmission y validateFormData son dependencias

    const handleSubmit = useCallback(async ( // Marcado como async por la generación del PDF
      e: React.FormEvent<HTMLFormElement>,
      onSuccess?: (processedData: FormData) => void, // onSuccess ahora solo con los datos procesados
      onError?: (errors: string[]) => void
    ) => {
      e.preventDefault();
      
      const validation = validateFormData(formData); 
      
      if (!validation.isValid) {
        console.error('Errores de validación:', validation.errors);
        onError?.(validation.errors);
        return;
      }
  
      const processedReactFormData = formatFormDataForSubmission(formData); // Tus datos procesados
      console.log('Formulario React listo para procesar y/o enviar al backend:', processedReactFormData);
  
      // -----------------------------------------------------------------
      // --- PASO 1: (Opcional) Envío de datos al Backend ---
      // -----------------------------------------------------------------
      let backendSubmissionSuccessful = true; // Asume éxito si no hay backend
      try {
        // Aquí iría tu lógica para enviar 'processedReactFormData' o un 'submissionPayload' (FormData API) a tu backend
        // Ejemplo:
        // const apiSubmissionPayload = new globalThis.FormData();
        // // ... (llenar apiSubmissionPayload con processedReactFormData y formData.informacionEquipo.qrImageFile) ...
        // const response = await fetch('/api/tu-endpoint', { method: 'POST', body: apiSubmissionPayload });
        // if (!response.ok) {
        //   throw new Error('Error al enviar datos al servidor');
        // }
        // const backendResult = await response.json();
        // console.log('Respuesta del backend:', backendResult);
        console.log("Simulación: Datos enviados al backend (si aplica).");
  
      } catch (apiError) {
        console.error('Error en el envío al API:', apiError);
        onError?.([apiError instanceof Error ? apiError.message : 'Error al conectar con el servidor']);
        backendSubmissionSuccessful = false;
      }
  
      // Si el envío al backend fue exitoso (o si no hay envío al backend y solo quieres generar PDF), procede:
      if (backendSubmissionSuccessful) {
        // ----------------------------------------------------
        // --- PASO 2: Generación y Descarga del PDF ---
        // ----------------------------------------------------
        try {
          // Es importante que processedReactFormData contenga todos los datos necesarios para el PDF
          // Si WorkOrderPDFDoc necesita la imagen QR como base64, deberías convertirla aquí
          // desde formData.informacionEquipo.qrImageFile ANTES de pasarla.
          
          const pdfBlob = await pdf(<WorkOrderPDFDoc data={processedReactFormData} />).toBlob();
          saveAs(pdfBlob, `OrdenDeTrabajo_${processedReactFormData.informacionSolicitud.orden_trabajo_nro || 'NUEVA'}.pdf`);
          console.log('PDF generado y descarga iniciada.');
          onSuccess?.(processedReactFormData); // Llama a onSuccess después de todo
        } catch (pdfError) {
          console.error('Error generando el PDF:', pdfError);
          // Puedes decidir si llamar a onError aquí también o manejarlo de otra forma
          onError?.(['Error al generar el PDF.']);
        }
      }
    }, [formData]); // Incluye las funciones que usas de utils


  // ============= FUNCIONES DE UTILIDAD =============
  const resetForm = useCallback(() => {
    setFormData(createInitialFormData())
  }, [])

  const setInitialData = useCallback((initialData: Partial<FormData>) => {
    setFormData(prev => ({
      ...prev,
      ...initialData
    }))
  }, [])

  const isFormValid = useCallback(() => {
    return validateFormData(formData).isValid
  }, [formData])

  return {
    // Estado
    formData,
    
    // Handlers
    handleSimpleChange,
    handlePlaneacionChange,
    handleRecursoChange,
    handleQrFileChange,
    handleSubmit,
    
    // Utilidades
    resetForm,
    setInitialData,
    isFormValid,
  }
}