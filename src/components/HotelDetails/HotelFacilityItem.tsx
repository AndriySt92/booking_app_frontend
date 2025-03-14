import { Title, Text } from '../'

interface FacilityItemProps {
  icon: JSX.Element
  title: string
  description: string
}

const HotelFacilityItem = ({ icon, title, description }: FacilityItemProps) => (
  <div
    className="flex items-center p-4 space-x-4 bg-white rounded-xl shadow-sm 
                 hover:shadow-md transition-all duration-300 hover:-translate-y-1
                 border border-gray-100 hover:border-blue-100 group">
    <div
      className="flex-shrink-0 p-3 rounded-lg bg-opacity-10 
                    bg-blue-100 group-hover:bg-blue-50 transition-colors">
      {icon}
    </div>
    <div>
      <Title as="h4" size="xs" color="gray" weight="semibold">
        {title}
      </Title>
      <Text className="mt-1" as="p" color="gray-600" size="sm">
        {description}
      </Text>
    </div>
  </div>
)

export default HotelFacilityItem
