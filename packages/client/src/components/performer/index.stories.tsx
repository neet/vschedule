/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Performer } from 'src/components/performer';
import { performer } from 'src/__fixtures__';
import { boolean } from '@storybook/addon-knobs';

storiesOf('Performer', module)
  .add('Normal', () => {
    return <Performer performer={performer} />;
  })
  .add('Loading', () => {
    const isLoading = boolean('isLoading', true);
    return (
      <Performer loading={isLoading} performer={performer} withDescription />
    );
  })
  .add('With description', () => {
    return <Performer performer={performer} withDescription />;
  });
