import classNames from 'classnames';
import { meetsContrastGuidelines, setLightness } from 'polished';
import type { ReactNode } from 'react';

export interface MakerProps {
  readonly backgroundColor: string;
  readonly width: number;
  readonly appearance: 'dark' | 'light';
  readonly children: ReactNode;
}

const BG_BRIGHTNESS = 0.09;
const BORDER_BRIGHTNESS = 0.35;

export const Marker = (props: MakerProps): JSX.Element => {
  const { backgroundColor, appearance, width, children } = props;

  const fgLight = meetsContrastGuidelines(backgroundColor, '#ffffff').AALarge
    ? '#ffffff'
    : '#000000';

  const isDark = appearance === 'dark';
  const bgDark = setLightness(BG_BRIGHTNESS, backgroundColor);
  const bgBorder = setLightness(BORDER_BRIGHTNESS, backgroundColor);

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
  appearance: 'light',
};
