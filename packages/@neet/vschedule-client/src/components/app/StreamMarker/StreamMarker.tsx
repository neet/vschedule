import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/future/image';
import { setLightness } from 'polished';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { H } from 'react-headings';
import { usePopper } from 'react-popper';

import type { Stream as StreamModel } from '../../../api/model/stream';
import { useDelayedHover } from '../../hooks/useDelayedHover';
import { usePrefersColorScheme } from '../../hooks/usePrefersColorScheme';
import { Card } from '../../ui/Card';
import { Marker } from '../../ui/Marker';
import { Stream } from '../Stream';

const AVATAR_BG_BRIGHTNESS = 0.15;

export interface StreamProps {
  readonly stream: StreamModel;
}

export const StreamMarker = (props: StreamProps): JSX.Element | null => {
  const { stream } = props;

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
      event_label: stream.title,
    });
  };

  useEffect(() => {
    if (!hover) return;
    gtag('event', 'open_event_card', {
      event_label: stream.title,
    });
  }, [hover, stream.title]);

  return (
    <div className={classNames('box-border', 'px-1.5')} ref={setWrapperRef}>
      <a
        href={stream.url}
        rel="noreferrer"
        target="_blank"
        title={stream.title}
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
          backgroundColor={stream.owner.color}
          appearance={isDark ? 'dark' : 'light'}
        >
          {stream.owner.avatar != null && (
            <div className="shrink-0 mr-1">
              <Image
                loading="lazy"
                className="h-10 w-10 rounded-full"
                width={stream.owner.avatar.width}
                height={stream.owner.avatar.height}
                src={stream.owner.avatar.url}
                placeholder="blur"
                blurDataURL={stream.owner.avatar.base64}
                alt={stream.owner.name}
                style={{
                  backgroundColor: isDark
                    ? setLightness(AVATAR_BG_BRIGHTNESS, stream.owner.color)
                    : '#ffffff',
                }}
              />
            </div>
          )}

          <div className="flex flex-col min-w-0 justify-center">
            <H
              className={classNames(
                'w-full',
                'text-ellipsis',
                'whitespace-nowrap',
                'overflow-hidden',
                'leading-relaxed',
              )}
            >
              {stream.title}
            </H>

            {/* for display users the start and end dates are obvious */}
            <dl className="sr-only">
              <dt>開始時刻</dt>
              <dd>{dayjs(stream.startedAt).format('LLL')}</dd>

              <dt>終了時刻</dt>
              <dd>{dayjs(stream.endedAt).format('LLL')}</dd>
            </dl>

            <div
              className={classNames(
                'w-full',
                'opacity-75',
                'text-xs',
                'text-ellipsis',
                'whitespace-nowrap',
                'overflow-hidden',
              )}
            >
              {stream.owner.name}
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
              <Stream stream={stream} variant="flat" embedType="always" />
            </Card>
          </div>
        </Transition>,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        document.getElementById('app')!,
      )}
    </div>
  );
};
