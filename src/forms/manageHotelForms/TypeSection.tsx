import { useFormContext } from 'react-hook-form'
import { hotelTypes } from '../../config/hotelConfigs'
import { IHotelFormData } from '../../types/hotelTypes'
import { Error, Input } from '../../components'

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<IHotelFormData>()

  const typeWatch = watch('type')

  return (
    <fieldset>
      <legend className="text-2xl font-bold mb-3">Type</legend>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <Input
            key={type}
            name="type"
            type="radio"
            label={type}
            option={type}
            selected={typeWatch === type}
            register={register}
            validation={{
              required: 'This field is required',
            }}
            wrapperClassNames="mb-0"
          />
        ))}
      </div>
      {errors.type && <Error message={errors.type.message as string} size="small" />}
    </fieldset>
  )
}

export default TypeSection
