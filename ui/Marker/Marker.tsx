import { ReactNode } from 'react';
import useDarkMode from 'use-dark-mode';
import { readableColor, setLightness } from 'polished';
import classNames from 'classnames';

interface MakerProps {
  readonly backgroundColor: string;
  readonly width: number;
  readonly children: ReactNode;
}

export const Marker = (props: MakerProps): JSX.Element => {
  const { backgroundColor, width, children } = props;
  const fgLight = readableColor(backgroundColor, '#ffffff', '#000000');

  const { value: isDark } = useDarkMode();
  const bgDark = setLightness(0.09, backgroundColor);
  const bgBorder = setLightness(0.32, backgroundColor);

  return (
    <div
      className={classNames(
        'box-border',
        'flex',
        'p-1',
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
        backgroundColor: isDark ? bgDark : backgroundColor,
        borderColor: isDark ? bgBorder : 'transparent',
      }}
    >
      {children}
    </div>
  );
};

Marker.defaultProps = {
  width: 'auto',
};
