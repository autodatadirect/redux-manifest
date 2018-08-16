import React from 'react'
import { storiesOf } from '@storybook/react'
import Pager from './component'
import { withKnobs, text, number, boolean, object } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import { buildArrayOfNumberedPagerButtons } from './pagerLogic'

const buttonData = buildArrayOfNumberedPagerButtons({
  filter: {
    page: 5,
    pageSize: 10
  },
  count: 23423,
  loadingCount: false,
  loadingData: false,
  changePage: f => f
})

const stories = storiesOf('Pager', module)
stories.addDecorator(withKnobs)
stories.add('Basic', () => (
  <Pager
    name={text('name', 'testmanifest')}
    loadingCount={boolean('loadingCount', false)}
    loadingData={boolean('loadingData', false)}
    changePage={action('changePage')}
    filter={object('filter', {})}
    count={number('count', 2548)}
    numberedPageButtons={object('numberedPageButtons', buttonData)}
  />
))
