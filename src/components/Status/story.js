import React from 'react'
import { storiesOf } from '@storybook/react'
import Status from './component'
import { withKnobs, text, boolean, object, number } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import { withRedux } from '../../../.storybook/decorators'

const stories = storiesOf('Status', module)
stories.addDecorator(withKnobs)
stories.addDecorator(withRedux)
stories.add('Basic', () => (
  <Status
    name={text('name', 'testmanifest')}
    count={number('count', 1684)}
    loadingCount={boolean('loadingCount', false)}
    filter={object('filter', {
      page: 3,
      pageSize: 10
    })}
    error={text('error', '')}
  />
))
