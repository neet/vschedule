import en from '@ril/locales/en/translation.json';
import ja from '@ril/locales/ja/translation.json';
import dayjs from 'dayjs';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

/* eslint-disable import/default */
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
/* eslint-enable import/default */

// eslint-disable-next-line import/no-unassigned-import
import 'dayjs/locale/ja';

export function normalizeLanguageForDayjs(lng: string) {
  return [
    'de-at',
    'en-gb',
    'es-do',
    'es-us',
    'pt-br',
    'sr-cyrl',
    'zh-cn',
    'zh-hk',
    'zh-tw',
  ].includes(lng)
    ? lng
    : lng.split('-')[0];
}

export const initDayjs = () => {
  dayjs.extend(localizedFormat);
  dayjs.extend(relativeTime);
};

export const createI18n = (lng?: string) => {
  i18next.on('initialized', options => {
    if (!options.lng) return;
    dayjs.locale(normalizeLanguageForDayjs(options.lng));
  });

  i18next.on('languageChanged', lng => {
    if (!lng) return;
    dayjs.locale(normalizeLanguageForDayjs(lng));
  });

  i18next.use(LanguageDetector).init({
    debug: process.env.NODE_ENV === 'development',
    resources: {
      en: { translation: en },
      ja: { translation: ja },
    },
    ns: ['translation'],
    defaultNS: 'translation',
    lng,
    fallbackLng: 'en',
    react: {
      wait: true,
    },
    interpolation: {
      escapeValue: true,
    },
  });

  return i18next;
};
