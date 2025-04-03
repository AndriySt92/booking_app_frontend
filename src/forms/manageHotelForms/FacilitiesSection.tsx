import { useFormContext } from 'react-hook-form'
import { hotelFacilities } from '../../config/hotelConfigs'
import { IHotelFormData } from '../../types/hotelTypes'
import { Error, Input, Title } from '../../components'

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IHotelFormData>()

  return (
    <fieldset>
      <Title className="mb-3" as="h3" color="gray" size="md">
        Facilities
      </Title>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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
