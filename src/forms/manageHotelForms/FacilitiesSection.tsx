import { useFormContext } from 'react-hook-form'
import { hotelFacilities } from '../../config/hotelConfigs'
import { IHotelFormData } from '../../types/hotelTypes'
import { Error, Input } from '../../components'

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IHotelFormData>()

  return (
    <fieldset>
      <legend className="text-2xl font-bold mb-3">Facilities</legend>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <Input
            key={facility}
            register={register}
            name="facilities"
            type="checkbox"
            label={facility}
            option={facility}
            validation={{
              validate: (facilities) =>
                facilities?.length > 0 || 'At least one facilities are required',
            }}
          />
        ))}
      </div>
      {errors.facilities && <Error message={errors.facilities.message as string} size="small" />}
    </fieldset>
  )
}

export default FacilitiesSection
