interface Props {
  selectedStars: string[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-xl font-semibold mb-2">Property Rating</h4>
      {['5', '4', '3', '2', '1'].map((star) => (
        <label className="flex items-center space-x-2" key={star}>
          <input
            type="checkbox"
            className="h-5 w-5 cursor-pointer"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
          />
          <span className="text-md sm:text-lg cursor-pointer">{star} Stars</span>
        </label>
      ))}
    </div>
  )
}

export default StarRatingFilter
