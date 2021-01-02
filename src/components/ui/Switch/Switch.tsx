import classNames from 'classnames';
import { useState } from 'react';

export interface SwitchProps {
  readonly value: boolean;
  readonly onChange?: (value: boolean) => void;
}

export const Switch = (props: SwitchProps): JSX.Element => {
  const { value, onChange } = props;

  const [enabled, setEnabled] = useState(value);

  const handleChange = (): void => {
    setEnabled(!enabled);
    onChange?.(!enabled);
  };

  return (
    <button
      className={classNames(
        'rounded-full',
        'h-6',
        'w-12',
        'transition-colors',
        'duration-300',
        'box-border',
        'p-0.5',
        enabled
          ? 'bg-primary-500 dark:bg-primary-400'
          : 'bg-coolGray-300 dark:bg-trueGray-700',
        'focus:outline-none',
        'focus:ring',
        'focus:ring-primary-300',
      )}
      onClick={handleChange}
    >
      <div
        className={classNames(
          'bg-white',
          'rounded-full',
          'relative',
          'transform',
          'h-5',
          'w-5',
          'transition-transform',
          'duration-300',
          enabled && 'translate-x-6',
        )}
      />
    </button>
  );
};
