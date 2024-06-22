import { IHotel } from '../types/hotelTypes'

const API_BASE_URL = 'http://localhost:3001'

export const addMyHotel = async (hotelFormData: any) => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`, {
    method: 'POST',
    credentials: 'include',
    body: hotelFormData,
  })

  if (!response.ok) {
    throw new Error('Failed to add hotel')
  }

  return response.json()
}

export const fetchMyHotels = async (): Promise<IHotel[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Error fetching hotels')
  }

  return response.json()
}

export const fetchMyHotelById = async (hotelId: string): Promise<IHotel> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Error fetching Hotels')
  }

  return response.json()
}

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelFormData.get('hotelId')}`, {
    method: 'PUT',
    body: hotelFormData,
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to update Hotel')
  }

  return response.json()
}
