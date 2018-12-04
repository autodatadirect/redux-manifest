import * as filterFunctions from './filterFnRegistry'
import expect from 'expect'

const name = 'NAME'
const name2 = 'NAME2'

describe('filterFnRegistry', () => {
  it('exists', () => expect(filterFunctions).toBeTruthy())
  it('registers and unregisters valid function', () => {
    filterFunctions.register(name, () => 1)
    expect(filterFunctions.get(name)()).toBe(1)
    filterFunctions.deregister(name)
    expect(filterFunctions.get(name)).toBeUndefined()
    filterFunctions.register(name2, () => 2)
    expect(filterFunctions.get(name2)()).toBe(2)
    filterFunctions.deregister(name2)
    expect(filterFunctions.get(name2)).toBeUndefined()
  })
  it('registers undefined', () => {
    filterFunctions.register(name)
    expect(filterFunctions.get(name)).toBeUndefined()
  })
  it('registers undefined key', () => {
    filterFunctions.register()
    expect(filterFunctions.get()).toBeUndefined()
  })
})
