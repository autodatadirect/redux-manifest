import React from 'react'
import { storiesOf } from '@storybook/react'
import Headers from './index'
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import { withRedux } from '../../../.storybook/decorators'

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
