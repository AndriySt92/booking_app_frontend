import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useSearchContext } from '../../contexts/SearchContext'
import { MdTravelExplore } from 'react-icons/md'
import DatePicker from 'react-datepicker'
import { ISearchFormValues } from '../../types/hotelTypes'
import { Input, Button } from '../'

const SearchBar = () => {
  const navigate = useNavigate()
  const { destination, checkIn, checkOut, adultCount, childCount, saveSearchValues } =
    useSearchContext()

  const { register, handleSubmit, control, reset, getValues } = useForm<ISearchFormValues>({
    defaultValues: {
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount,
    },
  })

  const onSubmit = (data: ISearchFormValues) => {
    saveSearchValues(
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
      className="bg-orange-400 rounded shadow-md grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 items-center gap-4 -mt-[117px] 2xl:-mt-8 xl:-mt-[60px] sm:-mt-[60px] p-3">
      <div className="flex flex-row items-center flex-1 bg-white px-2 py-1">
        <MdTravelExplore size={25} className="mr-2" />
        <Input
          register={register}
          placeholder="Where are you going?"
          name="destination"
          inputClassNames="w-full !p-1 !text-lg focus:outline-none !border-none"
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2">
        <Input
          register={register}
          name="adultCount"
          label="Adults:"
          type="number"
          min={1}
          max={20}
          validation={{ minLength: 1, valueAsNumber: true }}
          inputClassNames="w-full !p-1 !text-lg !font-bold focus:outline-none !border-none"
          wrapperClassNames="flex items-center flex-1"
          labelClassNames="font-normal text-black !text-lg"
        />

        <Input
          register={register}
          name="childCount"
          label="Children:"
          type="number"
          min={0}
          max={20}
          validation={{ valueAsNumber: true }}
          inputClassNames="w-full !p-1 !text-lg !font-bold focus:outline-none !border-none"
          wrapperClassNames="flex items-center flex-1"
          labelClassNames="font-normal text-black !text-lg"
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
                className="w-full text-lg bg-white p-2 focus:outline-none"
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
                className="w-full text-lg bg-white p-2 focus:outline-none"
                wrapperClassName="w-full"
              />
            )}
          />
        </div>
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
