import React from 'react';
import { ActivityFragment } from 'src/generated/graphql';
import { Feed } from './feed';
import { Placeholder } from './placeholder';

export interface TimetableProps {
  activities?: ActivityFragment[];
  loading: boolean;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  onLoadNext?: () => void;
  onLoadPrevious?: () => void;
}

export const Timetable = (props: TimetableProps) => {
  const {
    activities,
    onLoadNext,
    onLoadPrevious,
    loading,
    hasNextPage,
    hasPreviousPage,
  } = props;

  if (!activities) {
    return <Placeholder />;
  }

  if (activities && !activities.length) {
    return <span>no activity found</span>;
  }

  return (
    <Feed
      activities={activities}
      onLoadNext={onLoadNext}
      onLoadPrevious={onLoadPrevious}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      loading={loading}
    />
  );
};
