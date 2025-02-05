interface Props {
  icon: JSX.Element
  text: string
}

const HotelInfoBox = ({ icon, text }: Props) => (
  <div className="border border-slate-300 rounded-sm p-3 flex items-center">
    {icon}
    <span className="ml-1">{text}</span>
  </div>
)

export default HotelInfoBox
