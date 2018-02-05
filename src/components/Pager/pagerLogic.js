
export const determineTotalPages = (pageSize, count) => Math.floor(count / pageSize) + (count % pageSize ? 1 : 0)

export const determinePages = (currentPage, loading, pageSize, count) => {
  const pages = []
  let totalPages

  if (loading) {
    totalPages = currentPage + 2
  } else {
    totalPages = determineTotalPages(pageSize, count)
  }

  for (let i = currentPage - 1; i <= currentPage + 3; i++) {
    if (i > 0 && i <= totalPages) {
      pages.push(i - 1)
    }
  }
  return pages
}

export const buildArrayOfNumberedPagerButtons = ({filter, count, loadingCount, loadingData, changePage}) => {
  const currentPage = filter.page
  const numberedPageButtons = []
  const pages = determinePages(currentPage, loadingCount, filter.pageSize, count)

  for (let i = 0; i < pages.length; i++) {
    numberedPageButtons.push({page: pages[i], loading: loadingData, currentPage, changePage})
  }

  return numberedPageButtons
}
