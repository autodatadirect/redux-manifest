import cloneDeep from 'lodash/cloneDeep'

const sorter = id => (a, b) => {
  var nameA = a[id]
  var nameB = b[id]
  if (typeof nameA === 'string') nameA = nameA.toUpperCase()
  if (typeof nameB === 'string') nameB = nameB.toUpperCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1
  return 0
}

const fetchPage = (data, filter) => {
  const {page = 0, pageSize = 10} = filter
  const pageData = []
  const start = page * pageSize
  for (let i = start; i < (start + pageSize); i++) {
    if (i >= 0 && i < data.length) {
      pageData.push(data[i])
    }
  }
  return pageData
}

const sortData = (data, sorts) => {
  // TODO Multi-column Sort Support #7
  if (!sorts || !sorts.length) return
  const sort = sorts[0]

  if (!sort || !sort.id) return
  data.sort(sorter(sort.id))

  if (!sort.isAsc) {
    data.reverse()
  }
}

export default (data, filter) => {
  const newData = cloneDeep(data)
  sortData(newData, filter.sorts)
  return {
    data: fetchPage(newData, filter),
    count: newData.length
  }
}
