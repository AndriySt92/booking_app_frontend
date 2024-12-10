import { IFetchHotelResponse, IHotel, IHotelSearchResponse, ISearchParams } from '../types/hotelTypes'

const API_BASE_URL = 'http://localhost:3001'

export const fetchHotels = async (page: number, limit: number): Promise<IFetchHotelResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/?limit=${limit}&page=${page}`);
  
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<IHotel> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`, {
      credentials: 'include',
    })
  
    if (!response.ok) {
      throw new Error('Error fetching Hotels')
    }
  
    return response.json()
  }

  export const searchHotels = async (
    searchParams: ISearchParams
  ): Promise<IHotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    
    if (searchParams.destination) queryParams.append("destination", searchParams.destination);
    if (searchParams.checkIn) queryParams.append("checkIn", searchParams.checkIn);
    if (searchParams.checkOut) queryParams.append("checkOut", searchParams.checkOut);
    if (searchParams.adultCount !== undefined) queryParams.append("adultCount", searchParams.adultCount.toString());
    if (searchParams.childCount !== undefined) queryParams.append("childCount", searchParams.childCount.toString());
    if (searchParams.page !== undefined) queryParams.append("page", searchParams.page.toString());
    if (searchParams.maxPrice) queryParams.append("maxPrice", searchParams.maxPrice);
    if (searchParams.sortOption) queryParams.append("sortOption", searchParams.sortOption);
  
    if (searchParams.facilities) {
      searchParams.facilities.forEach((facility) => queryParams.append("facilities", facility));
    }
  
    if (searchParams.types) {
      searchParams.types.forEach((type) => queryParams.append("types", type));
    }
  
    if (searchParams.stars) {
      searchParams.stars.forEach((star) => queryParams.append("stars", star.toString()));
    }
    
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/search?${queryParams}`
    );
  
    if (!response.ok) {
      throw new Error("Error fetching hotels");
    }
  
    return response.json();
  };

  export const fetchBookedDates = async (hotelId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/booked-dates`, {
      credentials: 'include',
    })
  
    if (!response.ok) {
      throw new Error('Error fetching booked dates')
    }
  
    return response.json()
  };

  export const fetchHotelsCountriesSummary = async (limit: number): Promise<IHotel> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/countries-summary/?limit=${limit}`, {
      credentials: 'include',
    })
    
    if (!response.ok) {
      throw new Error('Error fetching Hotels')
    }
  
    return response.json()
  }