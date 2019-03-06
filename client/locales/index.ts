import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import i18next from 'i18next';
import en from './en/translation.json';
import ja from './ja/translation.json';
import LanguageDetector from 'i18next-browser-languagedetector';

import 'dayjs/locale/ja';

function customFormatter(
  ...[value, format]: Parameters<i18next.FormatFunction>
): ReturnType<i18next.FormatFunction> {
  switch (format) {
    case 'fromNow':
      return (dayjs(value) as any).fromNow();
    default:
      return '';
  }
}

export const getLocale = () => {
  dayjs.extend(relativeTime);

  i18next.on('initialized', options => {
    if (!options.lng) return;
    dayjs.locale(options.lng);
  });

  i18next.on('languageChanged', lng => {
    dayjs.locale(lng);
  });

  i18next.use(LanguageDetector).init({
    debug: process.env.NODE_ENV === 'development',
    resources: {
      en: { translation: en },
      ja: { translation: ja },
    },
    ns: ['translation'],
    defaultNS: 'translation',
    fallbackLng: 'en',
    react: {
      wait: true,
    },
    interpolation: {
      escapeValue: true,
      format: customFormatter,
    },
  });

  return i18next;
};
