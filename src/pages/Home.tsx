import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useQuery } from 'react-query'
import { fetchHotels } from '../services/hotelApi'
import { HomeCard, Loader } from '../components'
import { IHotel } from '../types/hotelTypes'

const Home = () => {
  const [hotels, setHotels] = useState<IHotel[] | []>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  const [limit, setLimit] = useState<number>(12)
  const { data, isError, isLoading } = useQuery(['fetchQuery', page], () =>
    fetchHotels(page, limit),
  )
  
  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (data) {
      setHotels([...hotels, ...data.hotels])
      setTotalPages(data.totalCount / limit)
    }
  }, [data])

  useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1)
    }
  }, [inView])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {hotels && hotels.map((hotel) => <HomeCard hotel={hotel} key={hotel._id} />)}
        </div>
      </div>
      {isError && <span className='text-3xl text-red-600 mx-8 block text-center mt-5'>Occured some error with fetching hotels</span>}
      {hotels.length > 0 && page < totalPages && <div ref={ref}></div>}
    </div>
  )
}

export default Home
