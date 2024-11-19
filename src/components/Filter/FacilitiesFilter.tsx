import { hotelFacilities } from "../../config/hotelOptionsConfig";

interface Props {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-xl font-semibold mb-2">Facilities</h4>
      {hotelFacilities.map((facility) => (
        <label className="flex items-center space-x-2" key={facility}>
          <input
            type="checkbox"
            className="h-5 w-5 cursor-pointer"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChange}
          />
          <span className="text-md sm:text-lg cursor-pointer">{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;