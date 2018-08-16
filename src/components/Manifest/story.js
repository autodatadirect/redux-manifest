import React from 'react'
import { storiesOf } from '@storybook/react'
import Manifest from './component'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import { withRedux } from '../../../.storybook/decorators'

const stories = storiesOf('Manifest', module)
stories.addDecorator(withKnobs)
stories.addDecorator(withRedux)
stories.add('Basic', () => (
  <Manifest
    name={text('name', 'testmanifest')}
    loading={boolean('loading', false)}
    error={text('error', '')}
    definition={[{
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
    } ]}
    onRowClick={action('onRowClick')}
  />
))
