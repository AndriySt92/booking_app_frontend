import { IBooking } from './bookingTypes'

export interface IHotelFormData {
  name: string
  city: string
  country: string
  description: string
  type: string
  pricePerNight: number
  starRating: number
  facilities: string[]
  imageFiles: FileList
  imageUrls: string[]
  adultCount: number
  childCount: number
}

export interface IHotel extends IHotelFormData {
  _id: string
  userId: string
  lastUpdated: Date
  bookings: IBooking[]
}

export interface IFetchHotelResponse {
  hotels: IHotel[]
  total: number
}

export interface IBookedDates {
  checkIn: Date
  checkOut: Date
}

export interface IGuestInfoFormData {
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
}

export interface ISearchParams {
  destination?: string
  checkIn?: string
  checkOut?: string
  adultCount?: string
  childCount?: string
  page?: string
  facilities?: string[]
  types?: string[]
  stars?: string[]
  maxPrice?: string | null
  sortOption?: string
}

export interface IFilterHotels {
  stars: string[]
  types: string[]
  facilities: string[]
  maxPrice: string | null
}

export interface ISearchFormValues {
  destination: string
  checkIn: Date
  checkOut: Date
  adultCount: number
  childCount: number
}

export interface SaveSearchValues {
  destination: string
  checkIn?: Date
  checkOut?: Date
  adultCount?: number
  childCount?: number
  hotelId?: string
}

export interface IHotelsCountriesSummary {
  total: number
  hotelImageUrl: string
  country: string
}
