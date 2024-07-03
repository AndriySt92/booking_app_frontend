interface Props {
  page: number
  pages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ page, pages, onPageChange }: Props) => {
  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300">
        {Array.from({ length: pages }, (_, i) => i + 1).map((number) => (
          <li className={`px-2 py-1 ${page === number ? 'bg-gray-200' : ''}`} key={number}>
            <button onClick={() => onPageChange(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
