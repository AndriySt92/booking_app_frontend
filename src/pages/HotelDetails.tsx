import { useParams } from 'react-router-dom'
import { useGetHotel } from '../hooks'
import {
  StarRating,
  Gallery,
  SkeletonHotelDetailsPage,
  Error,
  HotelInfoList,
  Title,
  Text,
  HotelFacilities,
  HotelAvailability,
} from '../components'

const HotelDetails = () => {
  const { hotelId } = useParams()
  const { data: hotel, isLoading, isError } = useGetHotel((hotelId as string) || '')

  if (isLoading) {
    return <SkeletonHotelDetailsPage />
  }

  if (!hotel) {
    return null
  }

  return (
    <div className="space-y-7 sm:space-y-9  detail">
      <div className="space-y-3">
        <Title as="h1" size="lg" color="blue">
          {hotel.name}
        </Title>

        <StarRating starRating={hotel.starRating} />
      </div>

      {/* Hotel Photo Gallery */}
      <Gallery images={hotel.imageUrls} />

      {/* Description & Info */}
      <section className="space-y-4">
        <Title as="h3" size="md" color="gray">
          Property Details
        </Title>
        <Text className="leading-relaxed" size="md">
          {hotel.description}
        </Text>

        {/* Hotel Property List */}
        <HotelInfoList
          city={hotel.city}
          type={hotel.type}
          pricePerNight={hotel.pricePerNight}
          childCount={hotel.childCount}
          adultCount={hotel.adultCount}
          starRating={hotel.starRating}
        />
      </section>

      {/* Facilities */}
      <section className="space-y-4">
        <Title as="h3" size="md" color="gray">
          Featured Amenities
        </Title>
        <HotelFacilities facilities={hotel.facilities} />
      </section>

      {/* Booking Calendar & Guest Form */}
      <section>
        <HotelAvailability
          hotelId={hotel._id}
          pricePerNight={hotel.pricePerNight}
          childCount={hotel.childCount}
          adultCount={hotel.adultCount}
        />
      </section>

      {/* Error */}
      {isError && (
        <Error message="An error occurred while fetching the data." size="large" center />
      )}
    </div>
  )
}

export default HotelDetails
