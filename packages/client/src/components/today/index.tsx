import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { Button } from 'src/components/button';

export const Today = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const handleClickToday = () => {
    const node = document.getElementById('now');

    if (node && node instanceof Element) {
      node.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      });
    } else {
      history.push('/activities');
    }
  };

  return (
    <Button appearance="primary" onClick={handleClickToday}>
      {t('today.label', { defaultValue: 'Today' })}
    </Button>
  );
};
