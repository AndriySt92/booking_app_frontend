import cn from 'classnames'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'
import { Error } from '..'

interface Props {
  name: string
  label?: string
  type?: string
  placeholder?: string
  error?: string
  register: UseFormRegister<any>
  validation?: RegisterOptions
  inputClassNames?: string
  labelClassNames?: string
  wrapperClassNames?: string
  option?: string
}

const Input = ({
  name,
  placeholder,
  label = '',
  type = 'text',
  error = '',
  register,
  validation,
  option,
  inputClassNames,
  labelClassNames,
  wrapperClassNames,
}: Props) => {
  const isCheckbox = type === 'checkbox'

  return (
    <div className={cn(wrapperClassNames, isCheckbox && 'flex items-center gap-2 mb-1')}>
      {label && (
        <label
          htmlFor={isCheckbox ? option : name}
          className={cn(
            labelClassNames,
            isCheckbox
              ? 'flex gap-3 items-center space-x-2 order-2 cursor-pointer'
              : 'text-gray-700 text-md sm:text-lg font-bold flex-1',
          )}>
          {label}
        </label>
      )}
      <input
        id={isCheckbox ? option : name}
        type={type}
        placeholder={placeholder}
        className={cn(
          inputClassNames,
          isCheckbox
            ? 'h-5 w-5 cursor-pointer order-1'
            : 'border rounded w-full py-1 px-2 font-normal',
        )}
        {...register(name, validation)}
        {...(isCheckbox && { value: option })}
      />
      {error && <Error message={error} />}
    </div>
  )
}

export default Input
