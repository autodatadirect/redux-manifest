import React from 'react'
import { storiesOf } from '@storybook/react'
import PagerButton from './index'
import { withKnobs, text, number, boolean } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'

const stories = storiesOf('PagerButton', module)
stories.addDecorator(withKnobs)
stories.add('Basic', () => (
  <PagerButton
    loading={boolean('loading', false)}
    changePage={action('changePage')}
    page={number('page', 2)}
    currentPage={number('currentPage', 3)}
    children={text('children', 'Page 2')}
    className={text('className', '')}
  />
))
