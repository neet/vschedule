/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { performer, activity, category, team } from 'src/__fixtures__';
import { SearchResult } from '.';

storiesOf('SearchResult', module)
  .add('Normal', () => {
    return (
      <SearchResult
        result={{
          performers: [performer, performer],
          activities: [activity, activity],
          categories: [category, category],
          teams: [team, team],
        }}
      />
    );
  })
  .add('With group title', () => {
    return (
      <SearchResult
        withGroupTitle
        result={{
          performers: [performer, performer],
          activities: [activity, activity],
          categories: [category, category],
          teams: [team, team],
        }}
      />
    );
  });
