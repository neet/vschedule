import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTimetable } from 'src/hooks/use-timetable';
import { LoadingIndicator } from 'src/components/loading-indicator';
import { Feed } from './feed';

export const Timetable = () => {
  const {
    activities,
    onLoadNext,
    onLoadPrevious,
    loading,
    hasNextPage,
    hasPreviousPage,
  } = useTimetable();

  const { t } = useTranslation();

  // Show loading indicator only in the 1st rendering
  if (loading && !activities) {
    return (
      <LoadingIndicator>
        {t('timetable.loading', { defaultValue: 'Loading Timetable...' })}
      </LoadingIndicator>
    );
  }

  if (!activities || !activities.length) {
    return (
      <span>
        {t('timetable.not_found', { defaultValue: 'No activities found' })}
      </span>
    );
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
