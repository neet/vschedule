/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { Category } from 'src/components/category';
import { category } from 'src/__fixtures__/category';

const stories = storiesOf('Category', module);

stories
  .add('Normal', () => {
    return <Category category={category} />;
  })
  .add('With count badge', () => {
    return <Category category={category} withCount />;
  });
