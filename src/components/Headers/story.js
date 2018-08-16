import React from 'react'
import { storiesOf } from '@storybook/react'
import Headers from './component'
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import { withRedux } from '../../../.storybook/decorators'

const CustomHeader = ({ label }) =>
  <th>
    <div>THIS IS A TEST.</div>
    <div>{label}</div>
  </th>

const stories = storiesOf('Headers', module)
stories.addDecorator(withKnobs)
stories.addDecorator(withRedux)
stories.add('Basic', () => (
  <Headers
    name={text('name', 'testmanifest')}
    loading={boolean('loading', false)}

    updateSort={action('updateSort')}
    sorts={object('sorts', [{
      id: 'test',
      isAsc: true
    }])}
    definition={object('definition', [{
      id: 'col1',
      label: 'Column 1'
    }, {
      id: 'col2',
      label: 'Column 2'
    }, {
      id: 'col3',
      label: 'Column 3'
    }, {
      id: 'col4',
      label: 'Column 4'
    }])}
  />
))
stories.add('Custom', () => {
  const def = [{
    id: 'col1',
    label: 'Customer Header 1',
    headerComponent: CustomHeader
  }, {
    id: 'col2',
    label: 'Basic Header 2'
  }]

  return (<Headers
    name={text('name', 'testmanifest')}
    loading={boolean('loading', false)}

    updateSort={action('updateSort')}
    sorts={object('sorts', [{
      id: 'test',
      isAsc: true
    }])}
    definition={def}
  />)
})
