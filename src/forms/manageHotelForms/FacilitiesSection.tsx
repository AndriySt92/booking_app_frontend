import { useFormContext } from 'react-hook-form'
import { hotelFacilities } from '../../config/hotelOptionsConfig'
import { IHotelFormData } from '../../types/hotelTypes'

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IHotelFormData>()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label
            className="text-md sm:text-lg flex gap-1 items-center text-gray-700 cursor-pointer" // Add cursor-pointer
            key={facility}>
            <input
              type="checkbox"
              value={facility}
              className="w-5 h-5 cursor-pointer"
              {...register('facilities', {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true
                  } else {
                    return 'At least one facility is required'
                  }
                },
              })}
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">{errors.facilities.message}</span>
      )}
    </div>
  )
}

export default FacilitiesSection
