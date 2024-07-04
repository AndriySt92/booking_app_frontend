import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useSearchContext } from '../../contexts/SearchContext'
import { MdTravelExplore } from 'react-icons/md'
import DatePicker from 'react-datepicker'
import Button from '../Button/Button'
import { ISearchFormValues } from '../../types/hotelTypes'

const SearchBar = () => {
  const navigate = useNavigate()
  const search = useSearchContext()

  const { register, handleSubmit, control, reset, getValues } = useForm<ISearchFormValues>({
    defaultValues: {
      destination: search.destination,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  })

  const onSubmit = (data: ISearchFormValues) => {
    search.saveSearchValues(
      data.destination,
      data.checkIn!,
      data.checkOut!,
      data.adultCount,
      data.childCount,
    )
    navigate('/search')
  }

  const minDate = new Date()
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          {...register('destination')}
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2">
        <label className="flex items-center flex-1">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            {...register('adultCount')}
            min={1}
            max={100}
          />
        </label>
        <label className="flex items-center flex-1">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            {...register('childCount')}
            min={0}
            max={100}
          />
        </label>
      </div>

      <div className="overflow-x-hidden">
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
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          )}
        />
      </div>

      <div className="overflow-x-hidden">
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
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          )}
        />
      </div>

      <div className="flex gap-1">
        <Button
          classes="w-2/3 flex justify-center bg-blue-600 text-white text-center hover:bg-blue-500"
          btnType="submit">
          Search
        </Button>
        <Button
          classes="w-1/3 flex justify-center bg-red-600 text-white hover:bg-red-500"
          btnType="button"
          onClick={() => reset()}>
          Clear
        </Button>
      </div>
    </form>
  )
}

export default SearchBar
