/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Performer } from 'src/components/performer';
import { performer } from 'src/__fixtures__';

storiesOf('Performer', module)
  .add('Normal', () => {
    return <Performer performer={performer} />;
  })
  .add('With description', () => {
    return <Performer performer={performer} withDescription />;
  });
