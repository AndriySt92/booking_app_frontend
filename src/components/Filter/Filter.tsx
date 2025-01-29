import cn from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, CheckboxFilter, LoadingButton, Select } from '../'
import { IFilterHotels } from '../../types/hotelTypes'
import {
  hotelFacilities,
  hotelMaxPrice,
  hotelStars,
  hotelTypes,
  initialFilterValue,
} from '../../config/hotelConfigs'
import { useCallback } from 'react'

interface Props {
  handleFilterApply: (filter: IFilterHotels) => void
  handleClearFilters: () => void
  isLoading: boolean
}

const Filter = ({ handleFilterApply, handleClearFilters, isLoading }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<IFilterHotels>({
    defaultValues: initialFilterValue,
  })

  const onSubmit = (data: IFilterHotels) => {
    handleFilterApply(data)
  }

  const clearAllFilters = useCallback(() => {
    reset(initialFilterValue)
    handleClearFilters()
  }, [handleClearFilters, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <h3 className="text-xl font-semibold border-b border-slate-300 pb-5">Filter by:</h3>

      <CheckboxFilter
        title="Property stars"
        options={hotelStars}
        register={register}
        name="stars"
      />

      <CheckboxFilter
        title="Facilities"
        options={hotelFacilities}
        register={register}
        name="facilities"
      />

      <CheckboxFilter title="Hotel Type" options={hotelTypes} register={register} name="types" />

      <Select
        name="maxPrice"
        label="Max price"
        options={hotelMaxPrice}
        placeholder="Select Max Price"
        register={register}
        labelClassNames="text-xl font-semibold mb-2"
      />

      <div className="flex justify-end gap-3">
        {!isLoading ? (
          <Button
            disabled={!isDirty}
            type="submit"
            className={cn('lg:w-2/3 px-2 py-1 sm:px-3 sm:py-2 font-semibold rounded text-white', {
              'bg-blue-600 hover:bg-blue-500': isDirty, // Active state
              'bg-blue-400': !isDirty, // Disabled state
            })}>
            Apply
          </Button>
        ) : (
          <LoadingButton className="lg:w-2/3 bg-blue-600 text-white hover:bg-blue-500">
            Applying...
          </LoadingButton>
        )}
        <Button
          type="button"
          onClick={clearAllFilters}
          disabled={!isDirty || isLoading}
          className={cn('lg:w-1/3 px-2 py-1 sm:px-3 sm:py-2 font-semibold text-white rounded', {
            'bg-red-600 hover:bg-red-500': isDirty && !isLoading, // Active state
            'bg-red-400': !isDirty || isLoading, // Disabled state
          })}>
          Clear
        </Button>
      </div>
    </form>
  )
}

export default Filter
