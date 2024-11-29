import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElement } from '@stripe/stripe-js'
import { useBookingContext } from '../../contexts/BookingContext'
import { IBooking, IPaymentIntentResponse } from '../../types/bookingTypes'
import { IUser } from '../../types/userTypes'
import { Button, Input, LoadingButton } from '../../components'
import { useCreateRoomBooking } from '../../hooks'
import { useAppContext } from '../../contexts/AppContext'

interface Props {
  currentUser: IUser
  paymentIntent: IPaymentIntentResponse
}

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const { hotelId } = useParams()
  const { showToast } = useAppContext()
  const stripe = useStripe()
  const elements = useElements()
  const booking = useBookingContext()

  const { mutate: bookingRoom, isLoading } = useCreateRoomBooking()

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
      bookingRoom({ ...formData, paymentIntentId: result.paymentIntent.id })
    }

    if (result.error) {
      const message = result.error.message || 'Confirm card payment error'
      showToast({ message: message, type: 'ERROR' })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 custom-shadow-rounded p-5">
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <Input
          label="First Name"
          register={register}
          name="firstName"
          inputClassNames="text-gray-700 bg-gray-200"
          readOnly
          disabled
        />
        <Input
          label="Last Name"
          register={register}
          name="lastName"
          inputClassNames="text-gray-700 bg-gray-200"
          readOnly
          disabled
        />
        <Input
          label="Email"
          register={register}
          name="email"
          inputClassNames="text-gray-700 bg-gray-200 font-normal"
          readOnly
          disabled
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>

        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: €{paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-md sm:text-lg">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold"> Payment Details</h3>
        <CardElement id="payment-element" className="border rounded-md py-2 px-3 text-lg" />
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
