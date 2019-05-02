const glob = require('glob');
const path = require('path');
const typescriptTransform = require('i18next-scanner-typescript');

const lngs = glob
  .sync('client/locales/!(*.*)')
  .map(dir => dir.match(/.*\/(.+?)$/)[1]);

const isPluralLng = lng => !['ja'].includes(lng);

module.exports = {
  options: {
    lngs,
    sort: true,
    debug: 'true',
    defaultLng: 'en',
    defaultNs: 'translation',
    ns: ['translation'],
    func: {
      extensions: ['.ts', '.tsx'],
      list: ['t', 'props.t', 'i18n.t'],
    },
    trans: {
      component: 'Trans',
      extensions: ['.tsx'],
    },
    plural: isPluralLng,
    resource: {
      loadPath: path.resolve(__dirname, 'client/locales/{{lng}}/{{ns}}.json'),
      savePath: path.resolve(__dirname, 'client/locales/{{lng}}/{{ns}}.json'),
    },
  },
  transform: typescriptTransform({ extensions: ['.tsx'] }),
};
