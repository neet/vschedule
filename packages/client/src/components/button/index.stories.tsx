/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
import { Button } from '.';

const stories = storiesOf('Button', module);

stories.add('Primary', () => {
  const textContent = text('Text', 'Hello');
  return <Button onClick={action('onClick')}>{textContent}</Button>;
});
