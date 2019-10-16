/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, select } from '@storybook/addon-knobs';
import { performer } from 'src/__fixtures__';
import { AvatarGroup } from '.';

const stories = storiesOf('AvatarGroup', module);

stories.add('Normal', () => {
  const align = select('Alignment', ['right', 'left'], 'left');
  const gap = number('Gap', -18);
  const size = number('Size', 50);
  const background = select(
    'Background type',
    ['auto', 'performerColor'],
    'auto',
  );

  return (
    <AvatarGroup
      performers={[performer, performer, performer]}
      size={size}
      background={background}
      gap={gap}
      align={align}
    />
  );
});
