import { IHotel } from '../types/hotelTypes'

const API_BASE_URL = 'http://localhost:3001'

export const fetchHotels = async (page: number, limit: number): Promise<{hotels: IHotel[], totalCount: number}> => {
  const response = await fetch(`${API_BASE_URL}/api/hotedls/?limit=${limit}&page=${page}`);
    debugger
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