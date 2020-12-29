import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  addons.setConfig({
    theme: themes.dark,
  });
}

