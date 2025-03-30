import { IPaginatedResponse, IPaginationParams } from '../types/commonTypes'
import { IHotel } from '../types/hotelTypes'

const API_BASE_URL = 'http://localhost:3001'

export const fetchFavorites = async (
  params: IPaginationParams,
): Promise<IPaginatedResponse<IHotel>> => {
  const queryParams = new URLSearchParams()

  if (params.page !== undefined) queryParams.append('page', params.page.toString())
  if (params.limit !== undefined) queryParams.append('limit', params.limit.toString())

  const response = await fetch(`${API_BASE_URL}/api/favorites?${queryParams}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Error fetching hotels')
  }

  return response.json()
}

export const fetchFavoriteHotelIds = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/api/favorites/ids`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Error fetching hotel ids')
  }

  return response.json()
}

export const addFavorites = async (hotelId: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hotelId }),
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Error add the hotel to favorites')
  }

  return response.json()
}

export const removeFavorites = async (hotelId: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/favorites/${hotelId}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Error remove the hotel to favorites')
  }

  return response.json()
}
