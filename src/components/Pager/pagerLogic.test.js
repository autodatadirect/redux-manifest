import * as pagerLogic from './pagerLogic'
import expect from 'expect'

describe('Pager Logic', () => {
  describe('determineTotalPages', () => {
    /* (pageSize, count) */
    it('exists', () => expect(pagerLogic.determineTotalPages).toBeTruthy())
    it('has correct one page logic', () => expect(pagerLogic.determineTotalPages(10, 10)).toBe(1))
    it('has correct one page logic when less', () => expect(pagerLogic.determineTotalPages(10, 2)).toBe(1))
    it('has correct page multi-page logic when half over', () => expect(pagerLogic.determineTotalPages(10, 15)).toBe(2))
    it('has correct page multi-page logic when barely over', () => expect(pagerLogic.determineTotalPages(10, 11)).toBe(2))
    it('has correct page multi-page logic when mostly over', () => expect(pagerLogic.determineTotalPages(10, 19)).toBe(2))
    it('has correct third page logic', () => expect(pagerLogic.determineTotalPages(10, 21)).toBe(3))
  })
})
