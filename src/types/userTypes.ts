export interface IUser {
  _id: string
  lastName: string
  firstName: string
  email: string
}

export interface ISignUpData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export interface ISignInData {
  email: string
  password: string
}
