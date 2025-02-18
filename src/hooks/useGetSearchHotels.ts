import { useQuery } from 'react-query'
import { useAppContext } from '../hooks'
import { searchHotels } from '../services/hotelApi'
import { ISearchParams } from '../types/hotelTypes'

const useGetSearchHotels = (searchParams: ISearchParams) => {
  const { showToast } = useAppContext()
  
  return useQuery(['searchHotels', searchParams], () => searchHotels(searchParams), {
    onError: (error: Error) => {
      const message = error.message || 'Error fetching hotel data'
      showToast({ message, type: 'ERROR' })
    },
    staleTime: Infinity
  })
}

export default useGetSearchHotels
