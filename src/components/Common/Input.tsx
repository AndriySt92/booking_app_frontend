import React from 'react'

interface Props {
    name: string
    type: string
    errors: string
    register: any
    validate: any
}

const Input = ({name, type, errors, register, ...validations}: Props) => {
  return (
    <label className="text-gray-700 text-sm font-bold flex-1">
        {name}
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register(`${name}`, { ...validations})}
        ></input>
        {errors && (
          <span className="text-red-500">{errors}</span>
        )}
      </label>
  )
}

export default Input