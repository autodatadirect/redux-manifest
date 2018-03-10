import React from 'react'
import { storiesOf } from '@storybook/react'
import PageSizer from './index'
import { withKnobs, text, boolean, object } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import { withRedux } from '../../../.storybook/decorators'

const stories = storiesOf('PageSizer', module)
stories.addDecorator(withKnobs)
stories.addDecorator(withRedux)
stories.add('Basic', () => (
  <PageSizer
    name={text('name', 'testmanifest')}
    loading={boolean('loading', false)}

    changePageSize={action('changePageSize')}
    filter={object('filter', {
      page: 3,
      pageSize: 10
    })}
  />
))
