---
name: 'component'
root: '.'
output: '**/*'
ignore: []
questions:
  name: What is the name of your component?
---

# `{{ inputs.name | pascal }}/index.ts`

```tsx
export { {{ inputs.name | pascal }} } from './{{ inputs.name | pascal }}';
```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal }}.tsx`

```tsx
export interface {{ inputs.name | pascal }}Props {}

export const {{ inputs.name | pascal }} = (props: {{ inputs.name | pascal }}Props): JSX.Element => {
  const {} = props;

  return (
    <></>
  );
};

```

# `{{ inputs.name | pascal }}/{{ inputs.name | pascal  }}.stories.tsx`

```tsx
import { {{inputs.name | pascal }} } from './{{ inputs.name | pascal }}';

export default {
  title: '{{ inputs.name | pascal }}',
  component: {{ inputs.name | pascal }},
};

export const Default = (): JSX.Element => <{{ inputs.name | pascal }} />;

```
