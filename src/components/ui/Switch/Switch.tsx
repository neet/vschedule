/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
import { useToggleState } from '@react-stately/toggle';
import classNames from 'classnames';
import type { PropsWithoutRef } from 'react';
import { forwardRef, useRef } from 'react';
import { useFocusRing, useSwitch, VisuallyHidden } from 'react-aria';

export type SwitchProps = PropsWithoutRef<Element> & {
  readonly value: boolean;
  readonly onChange?: (value: boolean) => void;
};

export const Switch = (props: SwitchProps): JSX.Element => {
  const { value, className, onChange, ...rest } = props;
  const ref = useRef<HTMLInputElement | null>(null);

  const state = useToggleState({ isSelected: value, onChange });
  const { isFocusVisible, focusProps } = useFocusRing();
  const { inputProps } = useSwitch(rest, state, ref);

  return (
    <label
      className={classNames(
        'rounded-full',
        'h-6',
        'w-12',
        'transition-colors',
        'duration-300',
        'box-border',
        'p-0.5',
        state.isSelected
          ? 'bg-primary-500 dark:bg-primary-400'
          : 'bg-coolGray-300 dark:bg-trueGray-700',
        isFocusVisible && ['outline-none', 'ring', 'ring-primary-300'],
        className,
      )}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>

      <div
        aria-hidden
        role="presentation"
        className={classNames(
          'bg-white',
          'rounded-full',
          'relative',
          'transform',
          'h-5',
          'w-5',
          'transition-transform',
          'duration-300',
          state.isSelected && 'translate-x-6',
        )}
      />
    </label>
  );
};
