import '../../../mocha.setup.js'
import React from 'react'
import isFunction from 'lodash/isFunction'
import {shallow} from 'enzyme'
import expect from 'expect'

import Manifest from '../Manifest'
import ManifestPager from '../ManifestPager'

let component
let props

const initProps = {
  def: {
    columns: [],
    rows: {
      classNameFunc: f => f
    }
  },
  filter: {
    offset: 0,
    limit: 0,
    sort: []
  },
  data: [],
  changeManifestFilter: () => f => f
}

let setProps = function (p) {
  props = Object.assign({}, initProps, p)
  component = shallow(<Manifest {...props} />)
}

describe('<Manifest/>', () => {
  beforeEach(() => {
    component = shallow(<Manifest {...initProps} />)
  })

  describe('Controls', () => {
    it('has a manifest-controls child', () => {
      expect(component.find('.manifest-controls').length).toBeGreaterThan(0)
    })

    it('has a pager child', () => {
      expect(component.find(ManifestPager).length).toBeGreaterThan(0)
    })

    it('has a row-limit select input child', () => {
      expect(component.find('select.row-limit').length).toBeGreaterThan(0)
    })

    it('has a .total-records child', () => {
      expect(component.find('.total-records').length).toBeGreaterThan(0)
    })

    it('has a pager child', () => {
      expect(component.find(ManifestPager).length).toBeGreaterThan(0)
    })
  })

  describe('Column Headers', () => {
    it('has as many <th/> as columns in props.def', () => {
      setProps({
        def: {
          columns: [],
          rows: { classNameFunc: f => f }
        }
      })
      expect(component.find('th').length).toEqual(0)

      setProps({
        def: {
          columns: [{header: '', valueFunc: f => f}, {header: '', valueFunc: f => f}],
          rows: { classNameFunc: f => f }
        }
      })
      expect(component.find('th').length).toEqual(2)
    })

    it('has a sortable class to indicate sortability when def.sort is defined', () => {
      setProps({
        def: {
          columns: [{sort: 'test', header: 'Test', valueFunc: f => f}],
          rows: { classNameFunc: f => f }
        }
      })
      expect(component.find('th').first().hasClass('sortable')).toBeTruthy()

      setProps({
        def: {
          columns: [{header: 'Test', valueFunc: f => f}],
          rows: { classNameFunc: f => f }
        }
      })
      expect(component.find('th').first().hasClass('sortable')).toBeFalsy()
    })

    it('has an icon to indicate sorting when current filter is equal to def.sort value', () => {
      setProps({
        filter: {sort: [{field: 'test'}], limit: 0, offset: 0},
        def: {
          columns: [{sort: 'test', header: 'Test', valueFunc: f => f}],
          rows: { classNameFunc: f => f }
        }
      })
      expect(component.find('th').first().find('span.sort').length).toEqual(1)

      setProps({
        filter: {sort: [{field: 'test2'}], limit: 0, offset: 0},
        def: {
          columns: [{sort: 'test', header: 'Test', valueFunc: f => f}],
          rows: { classNameFunc: f => f }
        }
      })
      expect(component.find('th').first().find('span.sort').length).toEqual(0)
    })
  })

  describe('Data Row', () => {
    it('has a <tr.loading/> when props.loadingData is true', () => {
      setProps({loadingData: true, data: []})
      expect(component.find('tbody tr').length).toEqual(1)
      expect(component.find('tbody tr.loading').length).toEqual(1)
      setProps({loadingData: true, data: [{}, {}, {}]})
      expect(component.find('tbody tr').length).toEqual(1)
      expect(component.find('tbody tr.loading').length).toEqual(1)
    })

    it('has a <tr.no-records/> when no props.data or props.data.length = 0', () => {
      expect(component.find('tbody tr').length).toEqual(1)
      expect(component.find('tbody tr.no-records').length).toEqual(1)
      setProps({data: []})
      expect(component.find('tbody tr').length).toEqual(1)
      expect(component.find('tbody tr.no-records').length).toEqual(1)
      setProps({data: [], loading: false})
      expect(component.find('tbody tr').length).toEqual(1)
      expect(component.find('tbody tr.no-records').length).toEqual(1)
    })

    it('has as many <tr/> in <tbody/> as rows in props.data', () => {
      setProps({data: [{}, {}]})
      expect(component.find('tbody tr').length).toEqual(2)
    })

    it('has no onClick when the props.onRowClick is undefined', () => {
      expect(component.find('tbody tr').first().prop('onClick')).toBeFalsy()
    })

    it('has an onClick function when props.onRowClick property is defined and props.onRowClick is provided and props.onRowClick returns a function', () => {
      setProps({
        data: [{}],
        onRowClick: undefined
      })
      expect(component.find('tbody tr').first().prop('onClick')).toBeFalsy()
      expect(isFunction(component.find('tbody tr').first().prop('onClick'))).toBeFalsy()

      setProps({
        data: [{}],
        onRowClick: () => f => f
      })
      expect(component.find('tbody tr').first().prop('onClick')).toBeTruthy()
      expect(isFunction(component.find('tbody tr').first().prop('onClick'))).toBeTruthy()
    })
  })
})
