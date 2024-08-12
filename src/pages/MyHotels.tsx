import { BsBuilding, BsMap } from 'react-icons/bs'
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi'
import { Button, Loader } from '../components'
import { useDeleteMyHotel, useGetMyHotels } from '../hooks'

const MyHotels = () => {
  const { data: hotels, isLoading } = useGetMyHotels()
  const { mutate, isLoading: isDeleting } = useDeleteMyHotel()

  const handleDelete = (hotelId: string) => {
    mutate(hotelId)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Button role="link" to="/add-hotel" classes="bg-blue-600 text-white hover:bg-blue-500">
          Add Hotel
        </Button>
      </span>
      {hotels?.length === 0 && <h3 className="text-2xl font-bold text-center">No hotels found</h3>}
      {hotels && (
        <div className="grid grid-cols-1 gap-8">
          {hotels.map((hotel) => (
            <div
              data-testid="hotel-card"
              className="flex flex-col justify-between rounded-lg p-3 md:p-8 gap-5 shadow-[0px_6px_20px_3px_#00000024]"
              key={hotel._id}>
              <h2 className="text-2xl font-bold">{hotel.name}</h2>
              <div className="whitespace-pre-line">{hotel.description}</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsMap className="mr-1" />
                  {hotel.city}, {hotel.country}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BsBuilding className="mr-1" />
                  {hotel.type}
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiMoney className="mr-1" />€ {hotel.pricePerNight} per night
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiHotel className="mr-1" />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>
                <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                  <BiStar className="mr-1" />
                  {hotel.starRating} Star Rating
                </div>
              </div>
              <div className="flex  justify-between sm:justify-end gap-4">
                <Button
                  onClick={!isDeleting ? () => handleDelete(hotel._id) : undefined}
                  classes="bg-blue-600 text-white hover:bg-blue-500">
                  Delete
                </Button>
                <Button
                  role="link"
                  to={`/edit-hotel/${hotel._id}`}
                  classes="bg-blue-600 text-white hover:bg-blue-500">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyHotels
