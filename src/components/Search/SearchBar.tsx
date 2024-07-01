import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSearchContext } from '../../contexts/SearchContext';
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

interface SearchFormValues {
  destination: string;
  checkIn: Date | null;
  checkOut: Date | null;
  adultCount: number;
  childCount: number;
}

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const { handleSubmit, control, reset, getValues } = useForm<SearchFormValues>({
    defaultValues: {
      destination: search.destination,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const onSubmit = (data: SearchFormValues) => {
    search.saveSearchValues(
      data.destination,
      data.checkIn!,
      data.checkOut!,
      data.adultCount,
      data.childCount
    );
    navigate('/search');
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <Controller
          name="destination"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder="Where are you going?"
              className="text-md w-full focus:outline-none"
            />
          )}
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2">
        <label className="items-center flex">
          Adults:
          <Controller
            name="adultCount"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
              />
            )}
          />
        </label>
        <label className="items-center flex">
          Children:
          <Controller
            name="childCount"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
              />
            )}
          />
        </label>
      </div>
      <div>
        <Controller
          name="checkIn"
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Check-in Date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              selectsStart
              startDate={field.value as Date}
              endDate={getValues('checkOut') as Date}
              minDate={minDate}
              maxDate={maxDate}
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          )}
        />
      </div>
      <div>
        <Controller
          name="checkOut"
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Check-out Date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
              selectsEnd
              startDate={getValues('checkIn') as Date}
              endDate={field.value as Date}
              minDate={getValues('checkIn') as Date}
              maxDate={maxDate}
              className="min-w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          )}
        />
      </div>
      <div className="flex gap-1">
        <Button
          classes="w-2/3 flex justify-center bg-blue-600 text-white text-center hover:bg-blue-500"
          btnType="submit"
        >
          Search
        </Button>
        <Button
          classes="w-1/3 flex justify-center bg-red-600 text-white hover:bg-red-500"
          btnType="button"
          onClick={() => reset()}
        >
          Clear
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;