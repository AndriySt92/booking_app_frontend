export const generatePagination = (currentPage: number, totalPages: number) => {
  const pagination: (number | string)[] = []
  const delta = 2

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      pagination.push(i)
    } else if (pagination[pagination.length - 1] !== '...') {
      pagination.push('...')
    }
  }

  return pagination
}
