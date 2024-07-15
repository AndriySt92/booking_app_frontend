import { IBooking, IPaymentIntentResponse } from '../types/bookingTypes'

const API_BASE_URL = 'http://localhost:3001'

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string,
): Promise<IPaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
  // const paymentIntentData = Promise.resolve({
  //   clientSecret: 'pi_3PcklDBplQwpmfr102sp4vyF_secret_lBJ2t5NAlUeoOglfuzSqbH34c',
  //   paymentIntentId: 'pi_3PcklDBplQwpmfr102sp4vyF',
  //   totalCost: 2502,
  // })
  // return paymentIntentData as any
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
