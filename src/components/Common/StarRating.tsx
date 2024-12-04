import { AiFillStar } from 'react-icons/ai'

interface Props {
  starRating: number
}

const StarRating = ({ starRating }: Props) => {
  return (
    <>
      {Array.from({ length: starRating }).map((_, i) => (
        <AiFillStar className="fill-yellow-400" key={i} />
      ))}
    </>
  )
}

export default StarRating
