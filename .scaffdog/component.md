---
name: 'component'
description: 'Generate React component within JSX'
message: 'Enter the name of your component'
root: '.'
output: '**/*'
ignore: []
---

# `{{ input | pascal }}/index.ts`

```tsx
export { {{ input | pascal }} } from './{{ input | pascal }}';
```

# `{{ input | pascal }}/{{ input | pascal }}.tsx`

```tsx
export interface {{ input | pascal }}Props {}

export const {{ input | pascal }} = (props: {{ input | pascal }}Props): JSX.Element => {
  const {} = props;

  return (
    <></>
  );
};

```

# `{{ input | pascal }}/{{ input | pascal  }}.stories.tsx`

```tsx
import { {{input | pascal }} } from './{{ input | pascal }}';

export default {
  title: '{{ input | pascal }}',
  component: {{ input | pascal }},
};

export const Default = (): JSX.Element => <{{ input | pascal }} />;

```
