import Slider from 'react-slick'
import { IHotelsCountriesSummary } from '../../types/hotelTypes'
import { sliderSettings } from '../../config/sliderConfig'
import { HomeSliderCard, Text, Title } from '../'

interface Props {
  hotelsCountriesSummary: IHotelsCountriesSummary[]
}

const HomeSlider = ({ hotelsCountriesSummary }: Props) => {
  return (
    <div>
      <Title className="text-center sm:text-left">Explore Popular Destinations</Title>
      <Text className="text-center sm:text-left" weight="normal" color="gray-800" size="lg">
        Discover the most popular countries and their unique stays, handpicked for you.
      </Text>
      <div className="-mx-[6px] mt-2 sm:mt-4">
        <Slider {...sliderSettings}>
          {hotelsCountriesSummary.map((item) => (
            <HomeSliderCard key={item.hotelImageUrl} hotelsCountriesSummaryItem={item} />
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default HomeSlider
