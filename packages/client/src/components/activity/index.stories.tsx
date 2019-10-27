/* eslint-disable import/no-extraneous-dependencies */
import { activity } from 'src/__fixtures__';
import React from 'react';
import { storiesOf } from '@storybook/react';
// import { number, select } from '@storybook/addon-knobs';
import { Activity } from '.';

const stories = storiesOf('Activity', module);

stories
  .add('Normal', () => {
    return <Activity activity={activity} />;
  })
  .add('With description', () => {
    return <Activity activity={activity} withDescription />;
  })
  .add('With performer', () => {
    return <Activity activity={activity} withPerforemer />;
  });
