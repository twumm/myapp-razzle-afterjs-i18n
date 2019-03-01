import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const options = {
  fallbackLng: 'en',
  load: 'languageOnly',

  // a common namespace used around the full app.
  ns: ['translations'],
  defaultNS: 'translations',

  saveMissing: true,
  debug: true,

  // cache: {
  //   enabled: true
  // },

  interpolation: {
    escapeValue: false, // not needed for react
    formatSeparator: ',',
    format: (value, format, lng) => {
      if (format === 'uppercase') return value.toUpperCase();
      return value;
    },
  },
  wait: process && !process.release,
};

// for browser use xhr backend to load translations and browser lng detector
if (process && !process.release) {
  i18n
    .use(XHR)
    // .use(Cache)
    .use(LanguageDetector);
}

// initialize if not already initialized
if (i18n.isInitialized) i18n.init(options);

export default i18n;
