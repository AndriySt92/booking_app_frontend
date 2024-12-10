import { useQuery } from 'react-query'
import { fetchHotelsCountriesSummary } from '../services/hotelApi'

const useGetHotelsCountriesSummery = (limit: number) => {
  return useQuery('fetchHotelsCountriesSummary',() => fetchHotelsCountriesSummary(limit), {
    staleTime: Infinity,
  })
}

export default useGetHotelsCountriesSummery