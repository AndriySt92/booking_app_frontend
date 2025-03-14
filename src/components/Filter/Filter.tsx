import cn from 'classnames'
import { useForm } from 'react-hook-form'
import { Button, CheckboxFilter, LoadingButton, Select, Title } from '../'
import { IFilterHotels } from '../../types/hotelTypes'
import {
  hotelFacilities,
  hotelMaxPrice,
  hotelStars,
  hotelTypes,
  initialFilterValue,
} from '../../config/hotelConfigs'
import { useCallback, useMemo } from 'react'

interface Props {
  filter: IFilterHotels
  handleFilterApply: (filter: IFilterHotels) => void
  handleClearFilters: () => void
  isLoading: boolean
}

const Filter = ({ filter, handleFilterApply, handleClearFilters, isLoading }: Props) => {
  const { register, handleSubmit, reset, watch } = useForm<IFilterHotels>({
    values: filter,
  })

  const onSubmit = (data: IFilterHotels) => {
    handleFilterApply(data)
  }

  const clearAllFilters = useCallback(() => {
    reset(initialFilterValue)
    handleClearFilters()
  }, [handleClearFilters, reset])

  const currentValues = watch() // Get current form values

  // Ensures consistent button states across desktop/mobile views
  const hasChanges = useMemo(() => {
    return (
      JSON.stringify(initialFilterValue) !== JSON.stringify(currentValues) ||
      JSON.stringify(initialFilterValue) !== JSON.stringify(filter)
    )
  }, [currentValues, filter])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Title className="border-b border-slate-300 pb-5" color="gray" size="md" as="h3">
        Filter by:
      </Title>

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
            disabled={!hasChanges}
            type="submit"
            className={cn('lg:w-2/3 px-2 py-1 sm:px-3 sm:py-2 font-semibold rounded text-white', {
              'bg-blue-600 hover:bg-blue-500 cursor-pointer': hasChanges,
              'bg-blue-400 cursor-not-allowed': !hasChanges,
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
          disabled={!hasChanges || isLoading}
          className={cn('lg:w-1/3 px-2 py-1 sm:px-3 sm:py-2 font-semibold text-white rounded', {
            'bg-red-600 hover:bg-red-500 cursor-pointer': hasChanges && !isLoading,
            'bg-red-400 cursor-not-allowed': !hasChanges || isLoading,
          })}>
          Clear
        </Button>
      </div>
    </form>
  )
}

export default Filter
