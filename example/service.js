import Chance from 'chance'

const chance = new Chance()
export const count = 13488
let data

export const getData = () => {
  if (!data) buildData()
  return data
}

const computeRow = index => ({
  id: index,
  date: chance.date().valueOf(),
  firstName: chance.first(),
  lastName: chance.last(),
  age: chance.age(),
  phone: chance.phone(),
  address: chance.address()
})

const buildData = () => {
  data = []
  for (let i = 0; i < count; i++) {
    data.push(computeRow(i))
  }
}

const sorter = id => (a, b) => {
  var nameA = a[id]
  var nameB = b[id]
  if (typeof nameA === 'string') nameA.toUpperCase()
  if (typeof nameB === 'string') nameB.toUpperCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1
  return 0
}

const fetchPage = ({page = 0, pageSize = 10, sorts}) => {
  const pageData = []
  const start = page * pageSize
  for (let i = start; i < (start + pageSize); i++) {
    if (i >= 0 && i < data.length) {
      pageData.push(data[i])
    }
  }
  return pageData
}

const sortData = sorts => {
  if (!sorts || !sorts.length) return
  const sort = sorts[0]

  if (!sort || !sort.id) return
  data.sort(sorter(sort.id))

  if (!sort.isAsc) {
    data.reverse()
  }
}

const compileResult = filter => {
  if (!data) buildData()
  sortData(filter.sorts)
  return {
    data: fetchPage(filter),
    count
  }
}

export default filter => new Promise((resolve, reject) => {
  if (chance.integer({min: 0, max: 100}) > 98) {
    reject(new Error('Service Failure'))
  }
  window.setTimeout(() => resolve(compileResult(filter)), 300 + chance.integer({min: 0, max: 300}))
})
