import { IBooking } from "./bookingTypes";

export interface IHotelFormData {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
}

export interface IHotel extends IHotelFormData {
  _id: string
  userId: string
  lastUpdated: Date
  bookings: IBooking[]
}

export interface IBookedDates {
  checkIn: Date
  checkOut: Date
}

export interface IGuestInfoFormData {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

export interface ISearchParams {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export interface IHotelSearchResponse {
  data: IHotel[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export interface ISearchFormValues {
  destination: string;
  checkIn: Date | null;
  checkOut: Date | null;
  adultCount: number;
  childCount: number;
}