import { useFormContext } from 'react-hook-form'
import { IHotelFormData } from '../../types/hotelTypes'
import { Input, Select, Textarea } from '../../components'
import { hotelStarsSelectData } from '../../config/hotelConfigs'

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IHotelFormData>()

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>

      <Input
        register={register}
        placeholder="Enter hotel name"
        name="name"
        label="Name"
        error={errors.name?.message}
        validation={{
          required: 'This field is required',
          minLength: {
            value: 10,
            message: 'Minimum number of symbols is 10',
          },
          maxLength: {
            value: 100,
            message: 'Maximum number of symbols is 100',
          },
        }}
      />

      <div className="flex gap-4">
        <Input
          register={register}
          placeholder="Enter city"
          name="city"
          label="City"
          error={errors.city?.message}
          validation={{
            required: 'This field is required',
            minLength: {
              value: 2,
              message: 'Minimum number of symbols is 2',
            },
            maxLength: {
              value: 100,
              message: 'Maximum number of symbols is 100',
            },
          }}
          wrapperClassNames="flex-1"
        />

        <Input
          register={register}
          placeholder="Enter country"
          name="country"
          label="Country"
          error={errors.country?.message}
          validation={{
            required: 'This field is required',
            minLength: {
              value: 2,
              message: 'Minimum number of symbols is 2',
            },
            maxLength: {
              value: 100,
              message: 'Maximum number of symbols is 100',
            },
          }}
          wrapperClassNames="flex-1"
        />
      </div>

      <Textarea
        register={register}
        name="description"
        label="Description"
        error={errors.description?.message}
        validation={{
          required: 'This field is required',
          minLength: {
            value: 200,
            message: 'Minimum number of symbols is 200',
          },
          maxLength: {
            value: 2000,
            message: 'Maximum number of symbols is 2000',
          },
        }}
        rows={5}
        maxLength={2000}
        placeholder="Enter hotel description"
      />

      <div className="flex items-top gap-4">
        <Input
          register={register}
          name="pricePerNight"
          label="Price Per Night"
          type="number"
          min={3}
          max={50000}
          placeholder="Enter price per night (in euros)"
          error={errors.pricePerNight?.message}
          validation={{
            required: 'This field is required',
            min: {
              value: 3,
              message: 'Minimum price per night is 3 euro',
            },
            max: {
              value: 50000,
              message: 'Maximum price per night is 50000 euro',
            },
            valueAsNumber: true,
          }}
          wrapperClassNames="flex-1"
        />

        <Select
          name="starRating"
          label="Star Rating"
          options={hotelStarsSelectData}
          placeholder="Select star rating"
          register={register}
          error={errors.starRating?.message}
          validation={{
            required: 'This field is required',
          }}
          wrapperClassNames="flex-1"
        />
      </div>
    </div>
  )
}

export default DetailsSection
