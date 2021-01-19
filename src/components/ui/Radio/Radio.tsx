import classNames from 'classnames';
import type { ChangeEvent, ReactNode } from 'react';
import { createContext, useCallback, useContext, useState } from 'react';

import { Button } from '../Button';

interface RadioContextType {
  readonly name: string;
  readonly value?: string;
  readonly setValue: (name: string) => void;
}

const RadioContext = createContext<RadioContextType>({
  name: 'unknown',
  value: 'unknown',
  setValue: (_name: string): void => {
    /* noop */
  },
});

export interface RadioItemProps {
  readonly label: string;
  readonly value: string;
}

const RadioItem = (props: RadioItemProps): JSX.Element => {
  const { label, value: boundedValue } = props;

  const { name, value, setValue } = useContext(RadioContext);
  const checked = boundedValue === value;

  // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, [setValue]);

  return (
    <Button
      as="label"
      variant={checked ? 'secondary' : 'wash'}
      shape="circle"
      size="sm"
    >
      {label}

      <input
        type="radio"
        name={name}
        value={boundedValue}
        checked={checked}
        className="sr-only"
        onChange={handleChange}
      />
    </Button>
  );
};

export interface RadioProps {
  readonly name: string;
  readonly value?: string;
  readonly children: ReactNode;
  readonly onChange?: (value: string) => void;
}

export const Radio = (props: RadioProps): JSX.Element => {
  const { children, name, onChange } = props;
  const [value, setValue] = useState<string | undefined>(props.value);

  const handleChange = (newValue: string): void => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <RadioContext.Provider
      value={{
        name,
        value,
        setValue: handleChange,
      }}
    >
      <div className={classNames('space-x-2')}>{children}</div>
    </RadioContext.Provider>
  );
};

Radio.Item = RadioItem;
