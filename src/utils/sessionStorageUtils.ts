export const getSessionValue = (key: string) => {
  return sessionStorage.getItem(key)
}

export const setSessionValue = (key: string, value: string | Date) => {
  sessionStorage.setItem(key, value instanceof Date ? value.toISOString() : String(value))
}
