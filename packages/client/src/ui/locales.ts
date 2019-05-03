import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ja';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from 'client/locales/en/translation.json';
import ja from 'client/locales/ja/translation.json';

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

export const getLocale = () => {
  dayjs.extend(localizedFormat);
  dayjs.extend(relativeTime);
  dayjs.locale('en');

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
