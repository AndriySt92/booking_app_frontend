import { IBooking, IPaymentIntentResponse } from '../types/bookingTypes'
import { IPaginatedResponse, IPaginationParams } from '../types/commonTypes'

const API_BASE_URL = 'http://localhost:3001'

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string,
): Promise<IPaymentIntentResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, {
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ numberOfNights }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Error fetching payment intent')
  }

  return response.json()
}

export const createRoomBooking = async (formData: IBooking) => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    throw new Error('Error booking room')
  }
}

export const fetchMyBookings = async (
  params: IPaginationParams,
): Promise<IPaginatedResponse<IBooking>> => {
  const queryParams = new URLSearchParams()

  if (params.page !== undefined) queryParams.append('page', params.page.toString())
  if (params.limit !== undefined) queryParams.append('limit', params.limit.toString())

  const response = await fetch(`${API_BASE_URL}/api/bookings?${queryParams}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Unable to fetch bookings')
  }

  return response.json()
}
