import React from 'react';
import { useTimetable } from 'src/hooks/use-timetable';
import { Feed } from './feed';
import { Placeholder } from './placeholder';

export const Timetable = () => {
  const {
    activities,
    onLoadNext,
    onLoadPrevious,
    loading,
    hasNextPage,
    hasPreviousPage,
  } = useTimetable();

  if (loading) {
    return <Placeholder />;
  }

  if (!activities || !activities.length) {
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
