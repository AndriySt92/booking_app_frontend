export interface IBooking {
  _id: string
  userId: string
  hotelId: string
  firstName: string
  lastName: string
  email: string
  adultCount: number
  childCount: number
  checkIn: Date
  checkOut: Date
  totalCost: number
  paymentIntentId: string
}

export interface IPaymentIntentResponse {
  paymentIntentId: string
  clientSecret: string
  totalCost: number
}
