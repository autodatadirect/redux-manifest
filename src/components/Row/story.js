import React from 'react'
import { storiesOf } from '@storybook/react'
import Row from './index'
import { withKnobs, boolean, object } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import { withRedux } from '../../../.storybook/decorators'
import Cell from '../CellEpochDate'

const stories = storiesOf('Row', module)
stories.addDecorator(withKnobs)
stories.addDecorator(withRedux)
stories.add('Basic', () => (
  <Row
    rowCells={object('rowCells', [{
      data: '2018-02-12T12:45:12.184Z',
      def: {
        id: 1,
        cellComponent: Cell
      }
    }, {
      data: '2018-02-12T12:45:12.184Z',
      def: {
        id: 2,
        cellComponent: Cell
      }
    }])}
    handleRowClick={action('handleRowClick')}
    focused={boolean('focused', false)}
  />
))
