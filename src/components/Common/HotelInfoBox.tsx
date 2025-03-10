import { ReactNode } from "react";

interface Props {
  icon: ReactNode;
  title: string;
  text: string;
}

const HotelInfoBox = ({ icon, title, text }: Props) => (
  <div className="flex items-center p-3 border border-slate-300 rounded-lg group hover:border-blue-300 cursor-pointer">
    <div className="mr-4 p-3 bg-blue-100/20 rounded-full group-hover:bg-blue-100/50 transition-colors">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="font-semibold">{text}</p>
    </div>
  </div>
)

export default HotelInfoBox
