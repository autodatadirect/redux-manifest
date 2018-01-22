
export const determineTotalPages = (pageSize, count) => Math.floor(count / pageSize) + (count % pageSize ? 1 : 0)

export const determinePages = (currentPage, totalPages) => {
  const pages = []
  for (let i = currentPage - 1; i <= currentPage + 3; i++) {
    if (i > 0 && i <= totalPages) pages.push(i - 1)
  }
  return pages
}
