import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';
import isChromatic from 'chromatic/isChromatic';

if (
  !isChromatic() &&
  window.matchMedia('(prefers-color-scheme: dark)').matches
) {
  addons.setConfig({
    theme: themes.dark,
  });
}
