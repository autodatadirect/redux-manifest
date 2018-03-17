import React from 'react'
import { storiesOf } from '@storybook/react'
import Controls from './index'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { withRedux } from '../../../.storybook/decorators'

const stories = storiesOf('Controls', module)
stories.addDecorator(withKnobs)
stories.addDecorator(withRedux)
stories.add('Basic', () => (
  <Controls
    name={text('name', 'testmanifest')}
  />
))
