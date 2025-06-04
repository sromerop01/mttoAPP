import React from 'react'
import type { FormFieldProps } from '../../Types/types'

// Usaremos las clases que ya definiste como por defecto
const defaultInputClasses = "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
const defaultLabelClasses = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type = 'text',
  placeholder,
  required,
  value,
  onChange,
  inputClassName,
  labelClassName,
  wrapperClassName = "", // Por defecto sin clases extra el wrapper
  pattern,
  min,
  max,
  step,
  rows,
  accept,
  children,
}) => {
  const finalInputClasses = inputClassName || defaultInputClasses
  const finalLabelClasses = labelClassName || defaultLabelClasses

  const commonInputProps = {
    id,
    name: id,
    className: finalInputClasses,
    placeholder,
    required,
    value,
    onChange,
    pattern,
    min,
    max,
    step,
    accept,
  }

  return (
    <div className={wrapperClassName}>
      <label htmlFor={id} className={finalLabelClasses}>
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea {...commonInputProps} rows={rows || 3}></textarea>
      ) : type === 'select' ? (
        <select {...commonInputProps}>{children}</select>
      ) : (
        <input type={type} {...commonInputProps} />
      )}
    </div>
  )
}

export default FormField