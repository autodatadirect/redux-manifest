import * as logic from './logic'
import expect from 'expect'

describe('Pager Logic', () => {
  describe('determineTotalPages', () => {
    /* (pageSize, count) */
    it('exists', () => expect(logic.determineTotalPages).toBeTruthy())
    it('has correct one page logic', () => expect(logic.determineTotalPages(10, 10)).toBe(1))
    it('has correct one page logic when less', () => expect(logic.determineTotalPages(10, 2)).toBe(1))
    it('has correct page multi-page logic when half over', () => expect(logic.determineTotalPages(10, 15)).toBe(2))
    it('has correct page multi-page logic when barely over', () => expect(logic.determineTotalPages(10, 11)).toBe(2))
    it('has correct page multi-page logic when mostly over', () => expect(logic.determineTotalPages(10, 19)).toBe(2))
    it('has correct third page logic', () => expect(logic.determineTotalPages(10, 21)).toBe(3))
  })
})
