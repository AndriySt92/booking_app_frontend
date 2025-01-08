import cn from 'classnames'
import { generatePagination } from '../../utils/generatePagination'

interface Props {
  page: number
  pages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ page, pages, onPageChange }: Props) => {
  const paginationItems = generatePagination(page, pages)

  return (
    <div className="flex justify-center">
      <ul className="flex">
        {paginationItems.map((item, index) => (
          <li className="flex items-end" key={index}>
            {typeof item === 'number' ? (
              <button
                className={cn('px-2 py-1 sm:px-3 sm:py-2 mx-1 font-semibold rounded ', {
                  'border border-slate-300': typeof item === 'number',
                  'bg-slate-300 cursor-default font-bold': page === item,
                  'hover:bg-slate-200 hover:border-slate-400': page !== item,
                })}
                onClick={() => onPageChange(item)}>
                {item}
              </button>
            ) : (
              <span className="mx-1 tracking-widest">{item}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
