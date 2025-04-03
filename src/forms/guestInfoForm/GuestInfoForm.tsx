import { Controller, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import { IBookedDates, IGuestInfoFormData } from '../../types/hotelTypes'
import { Button, Error, Input, Title } from '../../components'
import { useBookingContext, useAppContext } from '../../hooks'
import { transformBookedDates, validateDateRange } from '../../utils/dateUtils'

interface Props {
  hotelId: string
  adultCount: number
  childCount: number
  pricePerNight: number
  bookedDates: IBookedDates[]
}

const GuestInfoForm = ({ adultCount, childCount, bookedDates, hotelId, pricePerNight }: Props) => {
  const booking = useBookingContext()
  const { isLoggedIn } = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    watch,
    register,
    handleSubmit,
    control,
    clearErrors,
    formState: { errors },
  } = useForm<IGuestInfoFormData>({
    mode: 'onChange',
    defaultValues: {
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      adultCount: booking.adultCount,
      childCount: booking.childCount,
    },
  })

  const checkIn = watch('checkIn')
  const checkOut = watch('checkOut')

  const minDate = new Date()
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)

  const onSignInClick = (data: IGuestInfoFormData) => {
    booking.saveBookingValues(
      hotelId,
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
    )

    navigate('/sign-in', { state: { from: location } })
  }

  const onSubmit = (data: IGuestInfoFormData) => {
    booking.saveBookingValues(
      hotelId,
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount,
    )

    navigate(`/hotel/${hotelId}/booking`)
  }

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4">
      <Title as="h4" size="sm" color="gray">
        €{pricePerNight} / night
      </Title>
      <form onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <Controller
              control={control}
              name="checkIn"
              rules={{
                required: 'Check-in date is required',
                validate: {
                  validDateRange: (value) => {
                    const isValid = validateDateRange(bookedDates, value, checkOut)
                    if (isValid) {
                      clearErrors('checkIn')
                      clearErrors('checkOut')
                    }
                    return isValid
                  },
                },
              }}
              render={({ field }) => (
                <DatePicker
                  required
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  selectsStart
                  excludeDates={transformBookedDates(bookedDates)}
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={minDate}
                  maxDate={maxDate}
                  placeholderText="Check-in Date"
                  className="sm:text-lg  min-w-full bg-white p-2 focus:outline-none"
                  wrapperClassName="min-w-full"
                  dateFormat="MMM d, yyyy"
                />
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="checkOut"
              rules={{
                required: 'Check-out date is required',
                validate: {
                  validDateRange: (value) => {
                    const isValid = validateDateRange(bookedDates, checkIn, value)
                    if (isValid) {
                      clearErrors('checkIn')
                      clearErrors('checkOut')
                    }
                    return isValid
                  },
                },
              }}
              render={({ field }) => (
                <DatePicker
                  required
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  selectsEnd
                  excludeDates={transformBookedDates(bookedDates)}
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={minDate}
                  maxDate={maxDate}
                  placeholderText="Check-out Date"
                  className="sm:text-lg min-w-full bg-white p-2 focus:outline-none mb-4"
                  wrapperClassName="min-w-full"
                  dateFormat="MMM d, yyyy"
                />
              )}
            />
            {(errors.checkOut || errors.checkIn) && (
              <Error size="small" message="Selected dates are not available" />
            )}
          </div>
          <div>
            <div className="flex bg-white px-2 py-1 gap-2">
              <Input
                register={register}
                name="adultCount"
                label="Adults:"
                type="number"
                min={1}
                max={adultCount}
                validation={{
                  required: 'This field is required',
                  min: {
                    value: 1,
                    message: 'There must be at least one adult',
                  },
                  max: {
                    value: adultCount,
                    message: `Maximum adult capacity of the hotel is ${adultCount} adults`,
                  },
                  valueAsNumber: true,
                }}
                inputClassNames="w-full !p-1 focus:outline-none !font-bold !border-none"
                wrapperClassNames="flex items-center flex-1"
                labelClassNames="font-normal text-black !mb-0"
              />

              <Input
                register={register}
                name="childCount"
                label="Children:"
                type="number"
                min={0}
                max={childCount}
                validation={{
                  valueAsNumber: true,
                  max: {
                    value: childCount,
                    message: `Maximum child capacity of the hotel is ${childCount} children`,
                  },
                }}
                inputClassNames="w-full !p-1 focus:outline-none !font-bold !border-none"
                wrapperClassNames="flex items-center flex-1"
                labelClassNames="font-normal text-black !mb-0"
              />
            </div>
            {(errors.adultCount || errors.childCount) && (
              <span className="text-red-500 font-semibold text-sm">
                {errors?.childCount?.message || errors?.adultCount?.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="flex justify-center bg-blue-600 text-white text-center hover:bg-blue-500">
            {isLoggedIn ? 'Reserve Now' : 'Sign in to Book'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default GuestInfoForm
