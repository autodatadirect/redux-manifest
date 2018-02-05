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

  describe('determinePages', () => {
    it('exists', () => expect(pagerLogic.determinePages).toBeTruthy())
    it('list pages from start', () => expect(pagerLogic.determinePages(0, false, 10, 1000)).toEqual([0, 1, 2]))
    it('list pages from middle', () => expect(pagerLogic.determinePages(5, false, 10, 1000)).toEqual([3, 4, 5, 6, 7]))
    it('list pages from end', () => expect(pagerLogic.determinePages(10, false, 10, 101)).toEqual([8, 9, 10]))
    it('handles loading from 0', () => expect(pagerLogic.determinePages(0, true, 0, 0)).toEqual([0, 1]))
    it('handles loading from 1', () => expect(pagerLogic.determinePages(1, true, 0, 0)).toEqual([0, 1, 2]))
    it('handles loading from 2', () => expect(pagerLogic.determinePages(2, true, 0, 0)).toEqual([0, 1, 2, 3]))
    it('handles loading from 10', () => expect(pagerLogic.determinePages(10, true, 0, 0)).toEqual([8, 9, 10, 11]))
  })
})
