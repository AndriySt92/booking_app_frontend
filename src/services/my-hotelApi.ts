import { IHotel } from '../types/hotelTypes'

const API_BASE_URL = 'http://localhost:3001'

export const addMyHotel = async (hotelFormData: any) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
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
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Error fetching hotels')
  }

  return response.json()
}

export const fetchMyHotelById = async (hotelId: string): Promise<IHotel> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Error fetching hotels')
  }

  return response.json()
}

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const hotelId = hotelFormData.get('hotelId')
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    method: 'PUT',
    body: hotelFormData,
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to update hotel')
  }

  return response.json()
}

export const deleteMyHotel = async (hotelId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to delete hotel')
  }

  return response.json()
}
