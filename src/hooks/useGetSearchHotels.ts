import { useQuery } from 'react-query'
import { useAppContext } from '../contexts/AppContext'
import { searchHotels } from '../services/hotelApi'
import { ISearchParams } from '../types/hotelTypes'

const useGetSearchHotels = (searchParams: ISearchParams) => {
  const { showToast } = useAppContext()
  return useQuery(['searchHotels', searchParams], () => searchHotels(searchParams), {
    onError: (error: Error) => {
      let message = error.message || 'Error fetching hotel data'
      showToast({ message, type: 'ERROR' })
    },
  })
}

export default useGetSearchHotels
