export interface IPaginatedResponse<T> {
  data: T[]
  pagination: {
    total: number
    page: number
    pages: number
  }
}

export interface IPaginationParams {
  page: number
  limit?: number
}
