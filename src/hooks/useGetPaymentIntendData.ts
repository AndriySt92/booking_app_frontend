import { useQuery } from 'react-query'
import { createPaymentIntent } from '../services/bookingApi'

const useGetPaymentIntendData = ({
  hotelId,
  numberOfNights,
}: {
  hotelId: string
  numberOfNights: number
}) => {
  return useQuery(
    'createPaymentIntent',
    () => createPaymentIntent(hotelId, numberOfNights.toString()),
    {
      enabled: !!hotelId && numberOfNights > 0,
      staleTime: Infinity
    },
  )
}

export default useGetPaymentIntendData
