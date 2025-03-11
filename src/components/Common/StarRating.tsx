import { AiFillStar } from 'react-icons/ai'
import cn from 'classnames'

interface Props {
  starRating: number
  className?: string
}

const StarRating = ({ starRating, className }: Props) => {
  return (
    <div className={cn(className, 'flex items-center space-x-1')}>
      {Array.from({ length: starRating }).map((_, i) => (
        <AiFillStar
          key={i}
          className="star-animation transition-transform duration-300 text-yellow-500"
          style={{ animationDelay: `${i * 0.3}s` }}
          size={20}
        />
      ))}
    </div>
  )
}

export default StarRating
