/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { DatePicker } from 'src/components/date-picker';

const stories = storiesOf('DatePicker', module);

stories.add('Normal', () => {
  return <DatePicker />;
});
