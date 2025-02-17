import cn from 'classnames'
import { UseFormRegister, RegisterOptions, FieldValues, Path } from 'react-hook-form'
import { Error } from '../'

interface Props<T extends FieldValues> {
  name: Path<T>
  label?: string
  type?: string
  placeholder?: string
  error?: string
  register: UseFormRegister<T>
  validation?: RegisterOptions
  inputClassNames?: string
  labelClassNames?: string
  wrapperClassNames?: string
  option?: string // For checkbox or radio
  selected?: boolean // To handle selected state for custom radios
  multiple?: boolean // For file input
  accept?: string // For file input
  min?: number
  max?: number
  readOnly?: boolean
  disabled?: boolean
}

const Input = <T extends FieldValues>({
  name,
  label,
  type = 'text',
  error,
  register,
  validation,
  option,
  selected,
  inputClassNames,
  labelClassNames,
  wrapperClassNames,
  multiple,
  accept,
  ...rest
}: Props<T>) => {
  const isTypeCheckbox = type === 'checkbox'
  const isTypeRadio = type === 'radio'
  const isTypeFile = type === 'file'

  const checkboxLabelClasses = 'flex gap-3 items-center space-x-2 order-2'
  const radioLabelClasses = 'rounded-full px-4 py-2 font-semibold transition-colors shadow-sm'
  const radioSelectedLabelClasses = selected ? 'bg-blue-300 text-white' : 'bg-gray-300 text-black'

  return (
    <div
      className={cn(
        wrapperClassNames,
        isTypeCheckbox && 'flex items-center gap-2 mb-1',
        isTypeRadio && 'inline-block cursor-pointer',
        isTypeFile && 'flex flex-col gap-2',
      )}>
      {/* Default Input */}
      {!isTypeRadio && !isTypeCheckbox ? (
        <>
          {label && (
            <label
              htmlFor={name}
              className={cn(labelClassNames, 'text-gray-700 sm:text-lg font-bold mb-1')}>
              {label}
            </label>
          )}
          <input
            id={name}
            type={type}
            className={cn(
              inputClassNames,
              error ? 'border-red-600 border-2 shadow-md focus:ring-0' : '',
              'border rounded w-full py-2 px-3 font-normal focus:outline-none focus:ring focus:ring-blue-200',
            )}
            {...register(name, validation)}
            {...(isTypeFile && { multiple: multiple, accept: accept })}
            {...rest}
          />
        </>
      ) : (
        // Checkbox & Radio Button
        <>
          {label && (
            <label
              htmlFor={option}
              className={cn(
                labelClassNames,
                'sm:text-lg flex items-center cursor-pointer',
                isTypeCheckbox ? checkboxLabelClasses : radioLabelClasses,
                isTypeRadio && radioSelectedLabelClasses,
              )}>
              {label}
            </label>
          )}
          <input
            id={option}
            type={type}
            className={cn(
              inputClassNames,
              isTypeCheckbox ? 'h-5 w-5 cursor-pointer order-1' : 'hidden',
            )}
            {...register(name, validation)}
            value={option}
            {...rest}
          />
        </>
      )}
      {error && <Error message={error} size="small" />}
    </div>
  )
}

export default Input
