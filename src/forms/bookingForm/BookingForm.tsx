import { useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElement } from '@stripe/stripe-js'
import { useAppContext } from '../../contexts/AppContext'
import { createRoomBooking } from '../../services/bookingApi'
import { useBookingContext } from '../../contexts/BookingContext'
import { IBooking, IPaymentIntentResponse } from '../../types/bookingTypes'
import { IUser } from '../../types/userTypes'
import { Button, LoadingButton } from '../../components'

interface Props {
  currentUser: IUser
  paymentIntent: IPaymentIntentResponse
}

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const { hotelId } = useParams()
  const stripe = useStripe()
  const elements = useElements()
  const booking = useBookingContext()
  const { showToast } = useAppContext()

  const { mutate: bookRoom, isLoading } = useMutation(createRoomBooking, {
    onSuccess: () => {
      showToast({ message: 'Booking Saved!', type: 'SUCCESS' })
    },
    onError: () => {
      showToast({ message: 'Error saving booking', type: 'ERROR' })
    },
  })

  const { handleSubmit, register } = useForm<IBooking>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: booking.adultCount,
      childCount: booking.childCount,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  })

  const onSubmit = async (formData: IBooking) => {
    if (!stripe || !elements) {
      return
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    })
    
    if (result.paymentIntent?.status === 'succeeded') {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register('firstName')}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register('lastName')}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register('email')}
          />
        </label>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: €{paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
        <CardElement id="payment-element" className="border rounded-md p-2 text-sm" />
      </div>

      <div className="flex justify-end">
        {!isLoading ? (
          <Button
            disabled={isLoading}
            btnType="submit"
            classes="bg-blue-600 text-white hover:bg-blue-500 disabled:bg-gray-500">
            Confirm Booking
          </Button>
        ) : (
          <LoadingButton classes="bg-blue-600 text-white hover:bg-blue-500">
            Saving...
          </LoadingButton>
        )}
      </div>
    </form>
  )
}

export default BookingForm
