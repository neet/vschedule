const path = require('path');
const glob = require('glob');
const typescriptTransform = require('i18next-scanner-typescript');

const lngs = glob
  .sync('packages/locales/!(*.*)')
  .map(dir => dir.match(/.*\/(.+?)$/)[1]);

const checkIfUsePlural = lng => !['ja'].includes(lng);

module.exports = {
  options: {
    debug: 'true',
    lngs,
    sort: true,
    removeUnusedKeys: true,
    plural: checkIfUsePlural,
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
    resource: {
      loadPath: path.resolve(__dirname, 'packages/locales/{{lng}}/{{ns}}.json'),
      savePath: path.resolve(__dirname, 'packages/locales/{{lng}}/{{ns}}.json'),
    },
  },
  transform: typescriptTransform({ extensions: ['.tsx'] }),
};
