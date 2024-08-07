import { useQuery } from 'react-query';
import { fetchHotels } from '../services/hotelApi'

const useGetHotels = (page: number, limit: number) => {
  return useQuery(['fetchHotels', page], () => fetchHotels(page, limit));
};

export default useGetHotels;