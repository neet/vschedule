/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { LoadingIndicator } from 'src/components/loading-indicator';

storiesOf('LoadingIndicator ', module)
  .add('Normal', () => {
    return <LoadingIndicator />;
  })
  .add('With label', () => {
    return <LoadingIndicator>Loading...</LoadingIndicator>;
  });
