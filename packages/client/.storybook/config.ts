import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { withI18n } from 'storybook-addon-i18n';
import StoryRouter from 'storybook-react-router';
import { I18nProviderWrapper } from './i18next-provider-wrapper';
import { createI18n } from '../src/utils/locale';
import { withTheme } from './with-theme';

addDecorator(withInfo({ inline: true }));
addDecorator(withKnobs);
addDecorator(withI18n);
addDecorator(StoryRouter());
addDecorator(withTheme);

addParameters({
  i18n: {
    provider: I18nProviderWrapper,
    providerProps: {
      i18n: createI18n('en'),
    },
    supportedLocales: ['en', 'ja'],
  },
});

const req = require.context('../src', true, /.stories.tsx$/);
const loadStories = () => {
  req.keys().forEach(req);
};

configure(loadStories, module);
