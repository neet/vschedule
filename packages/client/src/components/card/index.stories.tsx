/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { Card } from 'src/components/card';

const stories = storiesOf('Card', module);

stories.add('Normal', () => {
  const textContent = text('Text', 'Hello');
  return <Card>{textContent}</Card>;
});
