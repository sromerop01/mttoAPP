import React from 'react'
import type { FormSectionProps } from '../../Types/types'

const defaultSectionTitleClasses = "mb-4 text-xl font-semibold dark:text-white border-b pb-2 text-center"

const FormSection: React.FC<FormSectionProps> = ({
  title,
  titleClassName,
  children,
  className = "mb-6", // Margen por defecto entre secciones
  contentContainerClassName = "border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden p-4" // Estilo por defecto para el contenedor del contenido
}) => {
  const finalTitleClasses = titleClassName || defaultSectionTitleClasses
  return (
    <section className={className}>
      <h3 className={finalTitleClasses}>{title}</h3>
      <div className={contentContainerClassName}>
        {children}
      </div>
    </section>
  )
}

export default FormSection