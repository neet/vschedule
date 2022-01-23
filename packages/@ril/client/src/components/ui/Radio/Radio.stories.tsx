import type { Meta } from '@storybook/react';

import { Radio } from './Radio';

export default {
  component: Radio,
} as Meta;

export const Default = {
  render: (): JSX.Element => (
    <form>
      <Radio name="hi" value="first">
        <Radio.Item label="First" value="first" />
        <Radio.Item label="Second" value="second" />
        <Radio.Item label="Third" value="third" />
      </Radio>
    </form>
  ),
};
