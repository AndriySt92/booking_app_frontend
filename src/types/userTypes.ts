export interface IUser {
  _id: string
  lastName: string
  firstName: string
  email: string
}

export interface IRegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export interface ILoginData {
  email: string
  password: string
}
