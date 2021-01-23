import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { setLightness } from 'polished';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { usePopper } from 'react-popper';

import type { Event as EventType } from '../../../types';
import { useDelayedHover } from '../../hooks/useDelayedHover';
import { usePrefersColorScheme } from '../../hooks/usePrefersColorScheme';
import { Avatar } from '../../ui/Avatar';
import { Card } from '../../ui/Card';
import { Marker } from '../../ui/Marker';
import { Event } from '../Event';

const AVATAR_BG_BRIGHTNESS = 0.15;

export interface EventProps {
  readonly event: EventType;
}

export const EventMarker = (props: EventProps): JSX.Element => {
  const { event } = props;

  const isDark = usePrefersColorScheme();
  const { hover, handleFocus, handleBlur } = useDelayedHover();
  const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
  const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null);

  const { styles, attributes } = usePopper(wrapperRef, cardRef, {
    placement: 'bottom',
    modifiers: [{ name: 'flip', enabled: true }],
  });

  const handleClick = (): void => {
    gtag('event', 'click_event_marker', {
      event_label: event.name,
    });
  };

  useEffect(() => {
    if (!hover) return;
    gtag('event', 'open_event_card', {
      event_label: event.name,
    });
  }, [hover, event.name]);

  return (
    <div className={classNames('box-border', 'px-1.5')} ref={setWrapperRef}>
      <a
        href={event.url}
        rel="noreferrer"
        target="_blank"
        title={event.name}
        className={classNames(
          'block',
          'focus:outline-none',
          'focus:ring',
          'ring-primary-500',
          'dark:ring-primary-400',
        )}
        onClick={handleClick}
        onMouseOver={() => void handleFocus()}
        onMouseLeave={() => void handleBlur()}
        onFocus={() => void handleFocus(true)}
        onBlur={() => void handleBlur()}
      >
        <Marker
          backgroundColor={event.livers[0].color}
          appearance={isDark ? 'dark' : 'light'}
        >
          <div className="flex-shrink-0 mr-1">
            <Avatar
              loading="lazy"
              variant="minimal"
              src={event.livers.map((liver) => liver.avatar)}
              alt={event.livers.map((liver) => liver.name).join(', ')}
              style={{
                backgroundColor: isDark
                  ? setLightness(AVATAR_BG_BRIGHTNESS, event.livers[0].color)
                  : '#ffffff',
              }}
            />
          </div>

          <div className="flex flex-col min-w-0 justify-center">
            <h4
              className={classNames(
                'w-full',
                'overflow-ellipsis',
                'whitespace-nowrap',
                'overflow-hidden',
                'leading-relaxed',
              )}
            >
              {event.name}
            </h4>

            {/* for display users the start and end dates are obvious */}
            <dl className="sr-only">
              <dt>開始時刻</dt>
              <dd>{dayjs(event.start_date).format('LLL')}</dd>

              <dt>終了時刻</dt>
              <dd>{dayjs(event.start_date).format('LLL')}</dd>
            </dl>

            <div
              className={classNames(
                'w-full',
                'opacity-75',
                'text-xs',
                'overflow-ellipsis',
                'whitespace-nowrap',
                'overflow-hidden',
              )}
            >
              {event.livers.map((liver) => liver.name).join(', ')}
            </div>
          </div>
        </Marker>
      </a>

      {createPortal(
        <Transition
          show={hover}
          className="absolute z-20" // TODO: combine with popper
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div ref={setCardRef} style={styles.popper} {...attributes.popper}>
            <Card
              size="sm"
              className={classNames('box-border', 'w-72', 'my-2')}
            >
              <Event event={event} variant="flat" embedType="always" />
            </Card>
          </div>
        </Transition>,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById('app')!,
      )}
    </div>
  );
};
