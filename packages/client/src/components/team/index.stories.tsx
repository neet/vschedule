/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { team } from 'src/__fixtures__';
import { Team } from '.';

storiesOf('Team', module)
  .add('Normal', () => {
    return <Team team={team} />;
  })
  .add('With performer names', () => {
    return <Team team={team} withPerformerNames />;
  });
