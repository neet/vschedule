import classNames from 'classnames';
import { meetsContrastGuidelines, setLightness } from 'polished';
import type { ReactNode } from 'react';
import useDarkMode from 'use-dark-mode';

interface MakerProps {
  readonly backgroundColor: string;
  readonly width: number;
  readonly children: ReactNode;
}

export const Marker = (props: MakerProps): JSX.Element => {
  const { backgroundColor, width, children } = props;

  const fgLight = meetsContrastGuidelines(backgroundColor, '#ffffff').AALarge
    ? '#ffffff'
    : '#000000';

  const { value: isDark } = useDarkMode();
  const bgDark = setLightness(0.09, backgroundColor);
  const bgBorder = setLightness(0.32, backgroundColor);

  return (
    <div
      className={classNames(
        'box-border',
        'flex',
        'p-1',
        'pr-4',
        'items-center',
        'rounded-full',
        'ease-out',
        'transition-shadow',
        'shadow',
        'dark:border',
        'hover:shadow-lg',
      )}
      style={{
        width,
        color: isDark ? 'white' : fgLight,
        borderColor: isDark ? bgBorder : 'transparent',
        backgroundColor: isDark ? bgDark : backgroundColor,
      }}
    >
      {children}
    </div>
  );
};

Marker.defaultProps = {
  width: 'auto',
};
