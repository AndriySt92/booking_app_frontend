import { IUser, ISignUpData, ISignInData } from '../types/userTypes'
const API_BASE_URL = 'http://localhost:3001'

export const fetchCurrentUser = async (): Promise<IUser> => {
  const response = await fetch(`${API_BASE_URL}/api/auth/current`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Error fetching user')
  }

  return response.json()
}

export const signUp = async (formData: ISignUpData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  const body = await response.json()

  if (!response.ok) {
    throw new Error(body.message)
  }
}

export const signIn = async (formData: ISignInData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  const body = await response.json()

  if (!response.ok) {
    throw new Error(body.message)
  }

  return body
}

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Token invalid')
  }

  return response.json()
}

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  })

  if (!response.ok) {
    throw new Error('Error during sign out')
  }
}
