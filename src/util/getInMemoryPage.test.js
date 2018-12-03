import getInMemoryPage from './getInMemoryPage'
import expect from 'expect'

describe('getInMemoryPage', () => {
  it('exists', () => expect(getInMemoryPage).toBeTruthy())
  it('sorts are case insensitive', () => {
    const data = [{n: 'c'}, {n: 'B'}, {n: 'a'}]
    const filter = {sorts: [{id: 'n', isAsc: true}]}
    expect(getInMemoryPage(data, filter)).toEqual({
      count: 3,
      data: [{n: 'a'}, {n: 'B'}, {n: 'c'}]
    })
  })
  it('applies a filterFn', () => {
    const data = [{n: 'c'}, {n: 'B'}, {n: 'a'}]
    const filter = {sorts: [{id: 'n', isAsc: true}], search: 'B'}
    const filterFn = (data, filter) => data.filter(datum => datum.n === filter.search)
    expect(getInMemoryPage(data, filter, filterFn)).toEqual({
      count: 1,
      data: [{n: 'B'}]
    })
  })
  it('throws Error when filterFn returns non array', () => {
    const data = [{n: 'c'}, {n: 'B'}, {n: 'a'}]
    const filter = {sorts: [{id: 'n', isAsc: true}], search: 'B'}
    const filterFn = (data, filter) => 'abc'
    expect(() => getInMemoryPage(data, filter, filterFn)).toThrow('filterFn returned non-array')
  })
})
