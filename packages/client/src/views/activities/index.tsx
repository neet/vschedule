import React from 'react';
import { Seo } from 'src/components/seo';
import { useTranslation } from 'react-i18next';
import { Timetable } from 'src/components/timetable';

export const Activities = React.memo(() => {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title={t('activities.page_title', {
          defaultValue: 'Activities - Refined Itsukara.link',
        })}
        description={t('activities.description', {
          defaultValue: 'Recent activities of Nijisanji streamers',
        })}
      />

      <Timetable />
    </>
  );
});
