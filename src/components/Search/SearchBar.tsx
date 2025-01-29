import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useSearchContext } from '../../contexts/SearchContext'
import { MdTravelExplore } from 'react-icons/md'
import DatePicker from 'react-datepicker'
import { ISearchFormValues } from '../../types/hotelTypes'
import { Input, Button } from '../'
import { useCallback, useEffect, useMemo } from 'react'

const SearchBar = () => {
  const navigate = useNavigate()
  const { destination, checkIn, checkOut, adultCount, childCount, saveSearchValues } =
    useSearchContext()

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { isDirty },
  } = useForm<ISearchFormValues>({
    defaultValues: {
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
    },
  })

  // Sync the form values with SearchContext values
  useEffect(() => {
    setValue('destination', destination)
    setValue('checkIn', checkIn)
    setValue('checkOut', checkOut)
    setValue('adultCount', adultCount)
    setValue('childCount', childCount)
  }, [destination, checkIn, checkOut, adultCount, childCount, setValue])

  const onSubmit = (data: ISearchFormValues) => {
    saveSearchValues({
      ...data,
      checkIn: data.checkIn as Date,
      checkOut: data.checkOut as Date,
    })

    navigate('/search')
  }

  const handleClear = useCallback(() => {
    reset()

    const today = new Date()
    saveSearchValues({
      destination: '',
      checkIn: today,
      checkOut: today,
      adultCount: 1,
      childCount: 0,
    })
  }, [])

  const { minDate, maxDate } = useMemo(() => {
    const today = new Date()

    return {
      minDate: today,
      maxDate: new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()),
    }
  }, [])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-orange-400 rounded shadow-md grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 items-center gap-2 lg:gap-3 -mt-[100px] sm:-mt-[56px] lg:-mt-[63px] 2xl:-mt-[33.6px] p-2 lg:p-3">
      <div className="flex flex-row items-center flex-1 bg-white px-2 sm:py-0.5">
        <MdTravelExplore size={25} className="mr-2" />
        <Input
          register={register}
          placeholder="Where are you going?"
          name="destination"
          wrapperClassNames="w-full"
          inputClassNames="border-none bg-white outline-none focus:ring-0 focus:outline-0"
        />
      </div>

      <div className="flex bg-white px-3 p-1 sm:py-1.5 gap-2">
        <Input
          register={register}
          name="adultCount"
          label="Adults:"
          type="number"
          min={1}
          max={100}
          validation={{ minLength: 1, valueAsNumber: true }}
          inputClassNames="w-full !p-1 !font-bold !bg-white border-none outline-none focus:ring-0 focus:outline-0"
          wrapperClassNames="flex items-center flex-1"
          labelClassNames="font-normal text-black !mb-0"
        />

        <Input
          register={register}
          name="childCount"
          label="Children:"
          type="number"
          min={0}
          max={100}
          validation={{ valueAsNumber: true }}
          inputClassNames="w-full !p-1 !font-bold !bg-white border-none outline-none focus:ring-0 focus:outline-0"
          wrapperClassNames="flex items-center flex-1"
          labelClassNames="font-normal text-black !mb-0"
        />
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <Controller
            name="checkIn"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText="Check-in Date"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                selectsStart
                startDate={field.value as Date}
                endDate={getValues('checkOut') as Date}
                minDate={minDate}
                maxDate={maxDate}
                className="w-full sm:text-lg bg-white p-2 focus:outline-none"
                wrapperClassName="w-full"
              />
            )}
          />
        </div>

        <div className="flex-1">
          <Controller
            name="checkOut"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText="Check-out Date"
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                selectsEnd
                startDate={getValues('checkIn') as Date}
                endDate={field.value as Date}
                minDate={getValues('checkIn') as Date}
                maxDate={maxDate}
                className="w-full sm:text-lg bg-white p-2 focus:outline-none"
                wrapperClassName="w-full"
              />
            )}
          />
        </div>
      </div>

      <div className="flex gap-1">
        <Button
          className="w-2/3 flex justify-center bg-blue-600 text-white text-center hover:bg-blue-500 py-1.5 text-lg"
          type="submit">
          Search
        </Button>
        <Button
          onClick={handleClear}
          className="w-1/3 flex justify-center bg-red-600 text-white hover:bg-red-500 py-1.5 text-lg"
          type="button"
          disabled={!isDirty && !destination}>
          Clear
        </Button>
      </div>
    </form>
  )
}

export default SearchBar
