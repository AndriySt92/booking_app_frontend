import { UseFormRegister, RegisterOptions } from 'react-hook-form'
import cn from 'classnames'
import { Error } from '../'

interface Option {
  label: string
  value: string | number
}

interface Props {
  name: string
  label?: string
  options: Option[]
  placeholder?: string
  error?: string
  disabled?: boolean
  register: UseFormRegister<any>
  validation?: RegisterOptions
  selectClassNames?: string
  labelClassNames?: string
  wrapperClassNames?: string
}

const Select = ({
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
}: Props) => {
  return (
    <div className={cn(wrapperClassNames, 'flex flex-col space-y-1')}>
      {label && (
        <label htmlFor={name} className={cn(labelClassNames, ' text-sm font-semibold')}>
          {label}
        </label>
      )}
      <select
        id={name}
        className={cn(
          selectClassNames,
          'p-2 border rounded-md w-full cursor-pointer focus:outline-none focus:ring focus:ring-blue-200',
        )}
        disabled={disabled}
        {...register(name, validation)}>
        <option value="" className="cursor-pointer">
          {placeholder}
        </option>
        {options.map((option) => (
          <option className="cursor-pointer" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <Error message={error} />}
    </div>
  )
}

export default Select
