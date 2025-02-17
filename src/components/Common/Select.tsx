import { UseFormRegister, RegisterOptions, FieldValues, Path } from 'react-hook-form'
import cn from 'classnames'
import { Error } from '../'

interface Option {
  label: string
  value: string | number
}

interface Props<T extends FieldValues> {
  name: Path<T>
  label?: string
  options: Option[]
  placeholder?: string
  error?: string
  disabled?: boolean
  register: UseFormRegister<T>
  validation?: RegisterOptions
  selectClassNames?: string
  labelClassNames?: string
  wrapperClassNames?: string
}

const Select = <T extends FieldValues>({
  name,
  label,
  options,
  placeholder = 'Select an option',
  error = '',
  disabled,
  register,
  validation,
  selectClassNames = '',
  labelClassNames = '',
  wrapperClassNames = '',
}: Props<T>) => {
  return (
    <div className={cn(wrapperClassNames)}>
      {label && (
        <label
          htmlFor={name}
          className={cn(labelClassNames, 'text-gray-700 sm:text-lg font-bold flex-1')}>
          {label}
        </label>
      )}
      <select
        id={name}
        className={cn(
          selectClassNames,
          'border rounded w-full py-2 px-3 font-normal focus:outline-none focus:ring focus:ring-blue-200',
          error ? 'border-red-600 border-2' : '',
        )}
        disabled={disabled}
        {...register(name, validation)}>
        <option value="" className="text-gray-700 cursor-pointer">
          {placeholder}
        </option>
        {options.map((option) => (
          <option className="cursor-pointer" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <Error message={error} size="small" />}
    </div>
  )
}

export default Select
