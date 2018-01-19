const computeRow = (page, pageSize) => (v, index) => {
  const id = (page * pageSize) + index

  return {
    id,
    date: (54321 + id) * 500,
    firstName: 'first' + id,
    lastName: 'last' + id
  }
}

const count = 168841

const computeData = ({page = 0, pageSize = 10, sort}) => ({
  data: Array.from(Array(pageSize)).map(computeRow(page, pageSize)),
  count
})

export default filter => new Promise((resolve, reject) => {
  window.setTimeout(() => resolve(computeData(filter)), 200)
})
