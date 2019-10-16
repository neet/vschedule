/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { activity } from 'src/__fixtures__';
import { Marker } from '.';

storiesOf('Marker', module).add('Normal', () => {
  return <Marker activity={activity} />;
});
