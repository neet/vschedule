import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Timetable } from 'src/components/timetable';

export const Activities = React.memo(() => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>
          {t('activities.page_title', {
            defaultValue: 'Activities - Refined Itsukara.link',
          })}
        </title>
      </Helmet>

      <Timetable />
    </>
  );
});
