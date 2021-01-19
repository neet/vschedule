import { Radio } from './Radio';

export default {
  title: 'Radio',
  component: Radio,
};

export const Default = (): JSX.Element => (
  <form>
    <Radio name="hi" value="first">
      <Radio.Item label="First" value="first" />
      <Radio.Item label="Second" value="second" />
      <Radio.Item label="Third" value="third" />
    </Radio>
  </form>
);
