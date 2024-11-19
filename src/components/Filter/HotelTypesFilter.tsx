import { hotelTypes } from "../../config/hotelOptionsConfig";

interface Props {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-xl font-semibold mb-2">Hotel Type</h4>
      {hotelTypes.map((hotelType) => (
        <label className="flex items-center space-x-2" key={hotelType}>
          <input
            type="checkbox"
            className="h-5 w-5 cursor-pointer"
            value={hotelType}
            checked={selectedHotelTypes.includes(hotelType)}
            onChange={onChange}
          />
          <span className="text-md sm:text-lg cursor-pointer">{hotelType}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypesFilter;