import { ReactNode } from 'react'
import { Text } from '../'

interface Props {
  icon: ReactNode
  title: string
  text: string
}

const HotelInfoBox = ({ icon, title, text }: Props) => (
  <div className="flex items-center p-3 border border-slate-300 rounded-lg group hover:border-blue-300 cursor-pointer">
    <div className="mr-3 p-3 bg-blue-100/20 rounded-full group-hover:bg-blue-100/50 transition-colors">
      {icon}
    </div>
    <div>
      <Text className="!whitespace-nowrap font-medium !text-gray-500" as="p" size="sm">
        {title}
      </Text>
      <Text className="!whitespace-nowrap !text-base font-semibold" as="p">
        {text}
      </Text>
    </div>
  </div>
)

export default HotelInfoBox
