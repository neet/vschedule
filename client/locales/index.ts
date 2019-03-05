// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';
import i18next from 'i18next';
// import en from 'src/locales/en/translation.json';
// import ja from 'src/locales/ja/translation.json';
import LanguageDetector from 'i18next-browser-languagedetector';

// import 'dayjs/locale/ja';

export const getLocale = () => {
  i18next.use(LanguageDetector).init({
    debug: process.env.NODE_ENV === 'development',

    resources: {
      // en: { translation: en },
      // ja: { translation: ja },
    },

    ns: ['translation'],
    defaultNS: 'translation',

    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,

      format: (value, format) => {
        switch (format) {
          case 'relativeDatetime':
            // return (dayjs(value) as any).fromNow();
            return 'todo';
          default:
            return;
        }
      },
    },

    react: {
      wait: true,
    },
  });

  i18next.on('languageChanged', lng => {
    // dayjs.locale(lng);
  });

  return i18next;
};
