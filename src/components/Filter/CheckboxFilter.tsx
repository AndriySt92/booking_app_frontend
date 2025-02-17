import React from 'react'
import { Input } from '../'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface Props<T extends FieldValues> {
  title: string
  options: string[]
  register: UseFormRegister<T>
  name: Path<T>
}

const CheckboxFilter = <T extends FieldValues>({ title, options, register, name }: Props<T>) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      {options.map((option) => (
        <React.Fragment key={option}>
          <Input register={register} name={name} type="checkbox" label={option} option={option} />
        </React.Fragment>
      ))}
    </div>
  )
}

export default CheckboxFilter
