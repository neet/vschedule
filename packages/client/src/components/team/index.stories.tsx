/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import { team } from 'src/__fixtures__';
import { Team } from '.';

storiesOf('Team', module)
  .add('Normal', () => {
    return <Team team={team} />;
  })
  .add('Loading', () => {
    const isLoading = boolean('isLoading', true);
    return <Team loading={isLoading} team={team} withPerformerNames />;
  })
  .add('With performer names', () => {
    return <Team team={team} withPerformerNames />;
  });
