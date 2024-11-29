import { useFormContext } from 'react-hook-form'
import { IHotelFormData } from '../../types/hotelTypes'
import { Input } from '../../components'

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IHotelFormData>()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
        <Input
          register={register}
          name="adultCount"
          type="number"
          label="Adults"
          placeholder="Enter maximum adults capacity"
          min={1}
          max={200}
          error={errors.adultCount?.message}
          validation={{
            required: 'This field is required',
            min: {
              value: 10,
              message: 'Minimum number of adults are 10 persons',
            },
            max: {
              value: 200,
              message: 'Maximum number of adults are 200 persons',
            },
            valueAsNumber: true,
          }}
          wrapperClassNames="flex-1"
        />

        <Input
          register={register}
          name="childCount"
          type="number"
          label="Children"
          min={0}
          max={200}
          placeholder="Enter maximum children capacity"
          error={errors.childCount?.message}
          validation={{
            max: {
              value: 200,
              message: 'Maximum number of children are 200 persons',
            },
            valueAsNumber: true,
          }}
          wrapperClassNames="flex-1"
        />
      </div>
    </div>
  )
}

export default GuestsSection
