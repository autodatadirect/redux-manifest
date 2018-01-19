
// TODO handle remainder correctly
export const determineTotalPages = (pageSize, count) => Math.round(count / pageSize)

export const determinePages = (currentPage, totalPages) => {
  const pages = []
  for (let i = currentPage - 1; i <= currentPage + 3; i++) {
    if (i > 0 && i <= totalPages) pages.push(i - 1)
  }
  return pages
}
