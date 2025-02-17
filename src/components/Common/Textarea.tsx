import cn from 'classnames'
import type { UseFormRegister, RegisterOptions, FieldValues, Path } from 'react-hook-form'
import { Error } from '..'

interface Props<T extends FieldValues> {
  name: Path<T>
  label?: string
  placeholder?: string
  error?: string
  register: UseFormRegister<T>
  validation?: RegisterOptions
  textareaClassNames?: string
  labelClassNames?: string
  wrapperClassNames?: string
  rows?: number
  maxLength: number
}

const Textarea = <T extends FieldValues>({
  name,
  label,
  error,
  register,
  validation,
  textareaClassNames,
  labelClassNames,
  wrapperClassNames,
  ...rest
}: Props<T>) => {
  return (
    <div className={wrapperClassNames}>
      {label && (
        <label
          htmlFor={name}
          className={cn(labelClassNames, 'text-gray-700 sm:text-lg font-bold flex-1')}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        className={cn(
          textareaClassNames,
          'border rounded w-full py-2 px-3 mt-1  font-normal focus:outline-none focus:ring focus:ring-blue-200',
          error ? 'border-red-600 border-2' : '',
        )}
        {...register(name, validation)}
        {...rest}
      />
      {error && <Error message={error} size="small" />}
    </div>
  )
}

export default Textarea
