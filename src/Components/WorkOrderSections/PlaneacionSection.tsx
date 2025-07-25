import React from 'react';
import FormSection from '../Form/FormSection';
import RecursosTable from './RecursosTable';
import CriticidadSection from './CriticidadSection';
import type { FormData, RecursoItemData } from '../../Types/types'


interface PlaneacionSectionProps {
  formData: FormData['planeacionMantenimiento'];
  onPlaneacionChange: (subSection: keyof FormData['planeacionMantenimiento'], field: string, value: number | string | null, isNumber?: boolean) => void;
  onRecursoChange: (index: number, field: keyof Omit<RecursoItemData, 'id' | 'label'>, value: string) => void;
}

const PlaneacionSection: React.FC<PlaneacionSectionProps> = ({
  formData,
  onPlaneacionChange,
  onRecursoChange,
}) => {
  return (
    <FormSection 
      title="Planeación del mantenimiento" 
      titleClassName="my-6 text-xl font-semibold dark:text-white border-b pb-2 pt-4 text-center"
      contentContainerClassName="overflow-hidden" 
    >
      <RecursosTable
        recursosData={formData.recursos}
        onRecursoChange={onRecursoChange}
      />
      <div className="mt-6"> {/* Espacio entre las dos "tablas" */}
        <CriticidadSection
          criticidadData={formData.criticidad}
          fechasData={formData.fechas}
          costosData={formData.costos}
          onPlaneacionChange={onPlaneacionChange}
        />
      </div>
    </FormSection>
  );
};

export default React.memo(PlaneacionSection);