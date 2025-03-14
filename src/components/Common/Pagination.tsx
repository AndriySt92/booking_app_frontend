import cn from 'classnames'
import { generatePagination } from '../../utils/generatePagination'
import Text from './Text'
import Button from '../Buttons/Button'

interface Props {
  page: number
  pages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ page, pages, onPageChange }: Props) => {
  const paginationItems = generatePagination(page, pages)

  return (
    <div className="flex justify-center py-3">
      <ul className="flex gap-1 sm:gap-2 items-center">
        {paginationItems.map((item, index) => (
          <li className="flex items-end h-full" key={index}>
            {typeof item === 'number' ? (
              <Button
                className={cn(
                  'min-w-[35px] h-[40px] sm:min-w-[40px] sm:h-[45px] !px-2 !sm:px-3',
                  'rounded-lg border duration-300',
                  'hover:shadow-md',
                  {
                    'bg-blue-600 border-blue-700 text-white shadow-lg': page === item,
                    'border-gray-300 text-gray-700 hover:bg-gray-50': page !== item,
                  },
                )}
                onClick={() => onPageChange(item)}
                aria-current={page === item ? 'page' : undefined}>
                {item}
              </Button>
            ) : (
              <Text
                className="px-2 sm:px-3 select-none tracking-widest"
                as="p"
                color="gray-800"
                weight="medium">
                {item}
              </Text>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
