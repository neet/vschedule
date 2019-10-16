/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, select } from '@storybook/addon-knobs';
import { performer } from 'src/__fixtures__';
import { Avatar } from '.';

const stories = storiesOf('Avatar', module);

stories.add('Normal', () => {
  // const image = text('Avatar', '.png, .jpg, .jpeg');
  const size = number('Size', 50);
  const background = select(
    'Background type',
    ['auto', 'performerColor'],
    'auto',
  );
  return <Avatar performer={performer} size={size} background={background} />;
});
