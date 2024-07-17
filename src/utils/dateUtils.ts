import { IBookedDates } from '../types/hotelTypes'

const getDatesInRange = (startDate: Date, endDate: Date): Date[] => {
  const date = new Date(startDate.getTime())
  const dates = []

  while (date <= endDate) {
    dates.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }

  return dates
}

export const transformBookedDates = (bookedDates: IBookedDates[]): Date[] => {
  return bookedDates.flatMap((booking) =>
    getDatesInRange(new Date(booking.checkIn), new Date(booking.checkOut)),
  )
}

export const validateDateRange = (bookedDates: IBookedDates[], checkIn: Date, checkOut: Date) => {
  return bookedDates.some((dateRange) => {
    const startDate = new Date(dateRange.checkIn)
    const endDate = new Date(dateRange.checkOut)

    return (
      (checkIn < startDate && checkOut < startDate) || 
      (checkIn > endDate && checkOut > startDate)
    )
  })
}
